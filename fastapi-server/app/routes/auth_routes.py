from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserRegister, UserLogin

from app.crud.user_crud import create_user

from app.database import get_db

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
    user: UserLogin
):
    print("user:",user)
    return {
        "message": "User logged in successfully",
        "user": user
    }



