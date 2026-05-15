from fastapi import APIRouter
from app.schemas.user_schema import UserRegister, UserLogin
from app.crud.user_crud import create_user

router = APIRouter()

