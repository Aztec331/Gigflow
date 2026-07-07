from pydantic import BaseModel, Field
from datetime import datetime

# Request
class BidCreate(BaseModel):
    message: str
    price: int


# Response
class BidResponse(BaseModel):
    id: int
    gig_id: int
    freelancer_id: int
    freelancer_name: str
    message: str
    price: int = Field(gt=0)
    status: str
    created_at: datetime

    class Config:
        from_attributes = True