from sqlalchemy.orm import Session
from app.models.gig_model import Gig
from app.models.user_model import User
from app.schemas.gig_schema import GigCreate

def create_gig(
    db: Session,
    gig_data: GigCreate,
    owner_id: int
):

    new_gig = Gig(
        title=gig_data.title,
        description=gig_data.description,
        budget=gig_data.budget,
        category=gig_data.category,
        level=gig_data.level,
        owner_id=owner_id
    )

    db.add(new_gig)
    db.commit()
    db.refresh(new_gig)

    owner = db.query(User).filter(
        User.id == new_gig.owner_id
    ).first()

    return {
        "id": new_gig.id,
        "title": new_gig.title,
        "description": new_gig.description,
        "budget": new_gig.budget,
        "category": new_gig.category,
        "level": new_gig.level,
        "owner_id": new_gig.owner_id,
        "owner_name": owner.name if owner else "Unknown",
        "created_at": new_gig.created_at
    }

#Old getall_gigs function
# def get_all_gigs(
#     db: Session
# ):
#     return db.query(Gig).all()

def get_all_gigs(
    db: Session
):

    gigs = db.query(Gig).all()

    result = []

    for gig in gigs:

        owner = db.query(User).filter(
            User.id == gig.owner_id
        ).first()

        gig_dict = {
            "id": gig.id,
            "title": gig.title,
            "description": gig.description,
            "budget": gig.budget,
            "category": gig.category,
            "level": gig.level,
            "owner_id": gig.owner_id,
            "owner_name": owner.name if owner else "Unknown",
            "created_at": gig.created_at
        }

        result.append(gig_dict)

    return result



def get_gig_by_id(
    db: Session,
    gig_id: int
):
    gig = db.query(Gig).filter(
        Gig.id == gig_id
    ).first()

    if gig is None:
        return None
    
    owner = db.query(User).filter(
        User.id == gig.owner_id
    ).first()

    return {
        "id": gig.id,
        "title": gig.title,
        "description": gig.description,
        "budget": gig.budget,
        "category": gig.category,
        "level": gig.level,
        "owner_id": gig.owner_id,
        "owner_name": owner.name if owner else "Unknown",
        "created_at": gig.created_at
    }
