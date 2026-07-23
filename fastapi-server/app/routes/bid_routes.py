#Import useful functions and required files
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from typing import List

#Import local files
from app.database import get_db
from app.models.user_model import User
from app.models.gig_model import Gig
from app.models.bid_model import Bid
from app.schemas.bid_schema import BidCreate, BidResponse
from app.crud.bid_crud import create_bid, get_bids_by_gig, hire_bid
from app.auth import SECRET_KEY, ALGORITHM

router = APIRouter()

# Looks for:
# Authorization: Bearer <JWT_TOKEN>
# oauth2_scheme contains OAuth2PasswordBearer object
# and not a token like eyJhbGciOiJIUzI1NiIs...
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)

# Extract logged-in user from JWT
# token variable here in parameter finally contains
# something like this - "eyJhbGc123..."
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:
        # Decode JWT
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        # Read "sub"
        # "sub" means subject (the user's ID)
        # Example:
        # {"sub": "5"} -> user_id = "5"
        user_id = payload.get("sub")

        # If the decoded JWT doesn't contain a user ID ("sub"),
        # we don't know which user is making the request,
        # so reject the request.
        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    # If jwt.decode() fails, it means the JWT could not be
    # verified using our SECRET_KEY and algorithm.
    # This can happen if someone sends:
    # - a fake token
    # - a tampered/modified token
    # - a malformed token
    # - an expired token
    # In all these cases, reject the request.
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    # Find user in database
    db_user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if db_user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    # db_user holds a User object
    # User(
    # id=1,
    # name="Aztec",
    # email="aztec@gmail.com",
    # password="123456"
    # )
    return db_user

@router.post(
    "/gigs/{gig_id}/bids",
    response_model=BidResponse
)
def post_bid(
    gig_id: int,
    bid_data: BidCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) ):

    #Price should be positive
    if bid_data.price <=0:
        raise HTTPException(
            status_code=400,
            detail="Price must be greater than 0"
        )
    
    #Message should not be empty
    if not bid_data.message.strip():
        raise HTTPException(
            status_code=400,
            detail= "Message cannot be empty"
        )

    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    if gig is None:
        raise HTTPException(
            status_code=404,
            detail="Gig not found"
        )
    
    # if the owner ID of this gig is the same as the current user's ID
    if gig.owner_id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="You cannot bid on your own gig."
        )

    #if a freelancer or user bids on the same gig again instead of editing the gig
    # raise error you cannot bid multiple times on the same gig  
    # Equivalent to command Select * from Bid where gig_id =5 and freelancer_id =2  
    existing_bid = db.query(Bid).filter(
        Bid.gig_id == gig_id,
        Bid.freelancer_id == current_user.id        
    ).first()

    if existing_bid:
        raise HTTPException(
            status_code=400,
            detail="You have already placed a bid on this gig"
        )

    return create_bid(
        db,
        gig_id,
        bid_data,
        current_user.id
    )

#takes curent user so that
#only that gig owner can view bids
@router.get(
    "/gigs/{gig_id}/bids",
    response_model=List[BidResponse]
)
def get_bids(
    gig_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    #This contains the current gig object
    #Check if gig exists
    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    #If gig if not found
    if gig is None:
        raise HTTPException(
            status_code=404,
            detail="Gig not found"
        )
    
    #Only the owner can view bids
    if gig.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You are not allowed to view these bids."
        )
    
    return get_bids_by_gig(
        db,
        gig_id
    )
    
#hiring logic , hire 1 reject everyone else if one is hired
@router.patch(
    "/gigs/{gig_id}/bids/{bid_id}/hire",
    response_model=BidResponse
)
def patch_bid(
        gig_id:int,
        bid_id:int,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):

    #Check if gig exists
    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    #If gig not found
    if gig is None:
        raise HTTPException(
                    status_code=404,
                    detail="Gig not found"
        )

    # Only the gig owner may hire a bidder; reject all other authenticated users.
    if gig.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You are not allowed to hire for this gig."
        )

    hired_bid = hire_bid(
        db,
        gig_id,
        bid_id
    )

    #if someone runs this -PATCH /api/gigs/1/bids/999/hire
    #it'll return None cause bid 999 doesnt exist
    if hired_bid is None:
        raise HTTPException(
            status_code=404,
            detail="Bid not found"
        )

    return hired_bid

    
