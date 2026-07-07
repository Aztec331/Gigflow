from fastapi import FastAPI
from app.routes.auth_routes import router as auth_router
from app.routes.gig_routes import router as gig_router
from app.routes.bid_routes import router as bid_router
from app.database import engine, Base
from app.models.user_model import User
from app.models.gig_model import Gig
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

# ---------------- AUTH ROUTES ----------------
app.include_router(
    auth_router,
    prefix="/api/auth"
)

# ---------------- GIG ROUTES ----------------
app.include_router(
    gig_router,
    prefix="/api/gigs"
)

# ---------------- BID ROUTES ----------------
# Final endpoint:
# POST /api/gigs/{gig_id}/bids
app.include_router(
    bid_router,
    prefix="/api"
)

@app.get("/")
def home():

    return {
        "message": "GigFlow Backend Running"
    }

