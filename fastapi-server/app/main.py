from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.database import engine, Base
from app.models.user_model import User
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/auth"
)

@app.get("/")
def home():

    return {
        "message": "GigFlow Backend Running"
    }

