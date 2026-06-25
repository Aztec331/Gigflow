from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

from app.database import get_db
from app.models.user_model import User
from app.schemas.gig_schema import GigCreate, GigResponse
from app.crud.gig_crud import create_gig
from app.auth import SECRET_KEY, ALGORITHM

router = APIRouter()

# Looks for:
# Authorization: Bearer <JWT_TOKEN>
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# Extract logged-in user from JWT
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
        user_id = payload.get("sub")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

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

    return db_user


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