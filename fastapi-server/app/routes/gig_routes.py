from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from typing import List

from app.database import get_db
from app.models.user_model import User
from app.schemas.gig_schema import GigCreate, GigResponse
from app.crud.gig_crud import create_gig, get_all_gigs
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


# gig_data: GigCreate- gig object with data
# db: Session = Depends(get_db)- db session object to talk to db
# current_user: User = Depends(get_current_user)- User object of currently logged in user
@router.post(
    "/",
    response_model=GigResponse
)
def post_gig(
    gig_data: GigCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return create_gig(
        db,
        gig_data,
        current_user.id
    )

@router.get(
    "/",
    response_model=List[GigResponse]
)
def get_gigs(
    db:Session = Depends(get_db)
):
    return get_all_gigs(db)