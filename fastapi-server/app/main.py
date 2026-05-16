from fastapi import FastAPI

from app.routes.auth_routes import router as auth_router

from app.database import engine, Base

from app.models.user_model import User


Base.metadata.create_all(bind=engine)


app = FastAPI()


app.include_router(
    auth_router,
    prefix="/api/auth"
)


@app.get("/")
def home():

    return {
        "message": "GigFlow Backend Running"
    }