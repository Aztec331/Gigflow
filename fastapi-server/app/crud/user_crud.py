from sqlalchemy.orm import Session
from app.models.user_model import User
from app.schemas.user_schema import UserRegister
from fastapi import HTTPException, status

def create_user(db: Session, user_data: UserRegister):
    
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists. Please try logging in instead."
        )
    
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=user_data.password
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }
