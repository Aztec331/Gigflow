from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from datetime import datetime
from app.database import Base

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)  
    gig_id = Column(Integer, ForeignKey("gigs.id"), nullable=False) 
    freelancer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    message = Column(Text, nullable=False)
    price = Column(Integer, nullable=False)
    status = Column(String, default="pending")  # pending, hired, rejected
    created_at = Column(DateTime, default=datetime.utcnow)
    