from pydantic import BaseModel

class BookingCreate(BaseModel):
    event_id: str