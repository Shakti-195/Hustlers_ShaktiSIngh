from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    name: Optional[str] = None
    email: EmailStr
    password: str
    role: Optional[str] = "user"  # ✅ accept role from signup

class UserLogin(BaseModel):
    email: EmailStr
    password: str