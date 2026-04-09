from fastapi import APIRouter
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate):
    return await register_user(user)

@router.post("/login")
async def login(user: UserLogin):
    return await login_user(user)