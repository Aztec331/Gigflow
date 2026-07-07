from sqlalchemy.orm import Session

from app.models.bid_model import Bid
from app.models.user_model import User
from app.schemas.bid_schema import BidCreate

def create_bid(
        db: Session,
        gig_id: int,
        bid_data: BidCreate,
        freelancer_id:int ):

    new_bid = Bid(
        gid_id=gig_id,
        freelancer_id=freelancer_id,
        message=bid_data.message,
        price=bid_data.price
    )

    db.add(new_bid)
    db.commit()
    db.refresh(new_bid)

    freelancer = db.query(User).filter(
        User.id == freelancer_id
    ).first()

    return {
        "id": new_bid.id,
        "gig_id": new_bid.gig_id,
        "freelancer_id": new_bid.freelancer_id,
        "freelancer_name": freelancer.name if freelancer else "Unknown",
        "message": new_bid.message,
        "price": new_bid.price,
        "status": new_bid.status,
        "created_at": new_bid.created_at
    }


