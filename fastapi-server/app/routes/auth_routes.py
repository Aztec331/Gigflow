from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.user_schema import UserRegister, UserLogin, UserRegisterResponse, UserLoginResponse
from app.crud.user_crud import create_user
from app.database import get_db
from app.models.user_model import User
from app.auth import create_access_token

router = APIRouter()

@router.post(
        "/register",
        response_model=UserRegisterResponse)
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    
    return create_user(db,user_data)

# `UserLogin` is the Pydantic model/class that defines the expected login data
# `user` is the object (instance of `UserLogin`) created from the incoming request body
@router.post(
        "/login",
        response_model=UserLoginResponse)
def login(
    user_data: UserLogin,
    db: Session = Depends(get_db)
):
    # 1. Find user by email
    db_user = db.query(User).filter(User.email == user_data.email).first()
    
    # 2. Check if user exists
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # 3. Verify password matches
    if db_user.password != user_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # 4. Generate JWT token
    access_token = create_access_token(
        data={"sub": str(db_user.id)}
    )
    
    # 5. Return success with user data
    return {
        "message": "User logged in successfully",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "name": db_user.name,
            "email": db_user.email
        }
    }



