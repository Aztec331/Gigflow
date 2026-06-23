from pydantic import BaseModel

# Requests

class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# Responses

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True


class UserRegisterResponse(BaseModel):
    message: str
    user: UserResponse


class UserLoginResponse(BaseModel):
    message: str
    user: UserResponse