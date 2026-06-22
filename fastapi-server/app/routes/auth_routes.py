from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserRegister, UserLogin
from app.crud.user_crud import create_user
from app.database import get_db
from app.models.user_model import User

router = APIRouter()

@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    
    return create_user(db,user)

# `UserLogin` is the Pydantic model/class that defines the expected login data
# `user` is the object (instance of `UserLogin`) created from the incoming request body
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    # 1. Find user by email
    db_user = db.query(User).filter(User.email == user.email).first()
    
    # 2. Check if user exists
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # 3. Verify password matches
    if db_user.password != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # 4. Return success with user data
    return {
        "message": "User logged in successfully",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }



