from pydantic import BaseModel
from datetime import datetime

# Request
class GigCreate(BaseModel):
    title: str
    description: str
    budget: int
    category: str
    level: str


# Response
class GigResponse(BaseModel):
    id: int
    title: str
    description: str
    budget: int
    category: str
    level: str
    owner_id: int
    created_at: datetime

    class Config:
        from_attributes = True