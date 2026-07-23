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
        gig_id=gig_id,
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

def get_bids_by_gig(
        db:Session,
        gig_id: int
):
    
    #Only bids of a particular gig_id
    bids = db.query(Bid).filter(
        Bid.gig_id == gig_id
    ).all()

    result = []

    #for each bid
    for bid in bids:

        #to take out name of every bidder 
        freelancer = db.query(User).filter(
            User.id == bid.freelancer_id
        ).first()

        bid_dict = {
            "id": bid.id,
            "gig_id": bid.gig_id,
            "freelancer_id": bid.freelancer_id,
            "freelancer_name": freelancer.name if freelancer else "Unknown",
            "message": bid.message,
            "price": bid.price,
            "status": bid.status,
            "created_at": bid.created_at
        }

        result.append(bid_dict)

    return result

#hire one bid and reject all bids
def hire_bid(
        db:Session,
        gig_id:int,
        bid_id:int
):

    #Find the selected bid belonging to this gig or current bid
    #it'll store something like this 
    # Bid(
    # id=5,
    # gig_id=2,
    # freelancer_id=7,
    # message="I can do this",
    # price=300,
    # status="pending",
    # created_at=datetime(...)
    # )
    bid = db.query(Bid).filter(
        Bid.id == bid_id,
        Bid.gig_id == gig_id
    ).first()

    #If bid not found return None
    if bid is None:
        return None

    #HIRE ONE 
    #Currently selected bid is hired
    bid.status = "hired"

    #REJECT EVERYONE ELSE
    #Reject all other bids for the same gig
    db.query(Bid).filter(
        Bid.gig_id == gig_id,
        Bid.id != bid_id
    ).update(
        {
            "status": "rejected"
        }
    )

    db.commit()
    db.refresh(bid)


    freelancer = db.query(User).filter(
        User.id == bid.freelancer_id
    ).first()

    return {
        "id": bid.id,
        "gig_id": bid.gig_id,
        "freelancer_id": bid.freelancer_id,
        "freelancer_name": freelancer.name if freelancer else "Unknown",
        "message": bid.message,
        "price": bid.price,
        "status": bid.status,
        "created_at": bid.created_at
    }



    


