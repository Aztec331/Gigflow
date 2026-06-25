from sqlalchemy.orm import Session
from app.models.gig_model import Gig
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

    return new_gig