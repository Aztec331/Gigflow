from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# here data means parameter name and dict means type hint , hence data parameter of type dictionary
# returns a jwt token like this - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
def create_access_token(data: dict):

    # Make a copy of the incoming dictionary
    # to_encode = {
    #     "sub": "5"
    # }
    to_encode = data.copy()

    #datetime.now is 10:00 AM + timedelta( minutes=ACCESS_TOKEN_EXPIRE_MINUTES) is 30
    # expire becomes 10:30 AM, Token should expire in 30 mins
    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    # updates our dictionary to something like:
    # {
    #     "sub": "5",
    #     "exp": datetime(2026, 6, 24, 10, 30, 0)
    # }
    to_encode.update(
        {"exp": expire}
    )

    #convert to_encode dictionary into JWT Token
    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt