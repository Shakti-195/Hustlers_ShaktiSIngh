from fastapi import APIRouter, Depends
from app.dependencies import get_current_user

router = APIRouter()

@router.get("/me")
async def get_me(user = Depends(get_current_user)):
    return {
        "email": user["email"],
        "role": user.get("role", "user")   # ✅ return role
    }