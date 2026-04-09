from app.core.database import db
from app.core.security import hash_password, verify_password, create_access_token

async def register_user(user):
    existing_user = await db.users.find_one({"email": user.email})
    
    if existing_user:
        return {"error": "Email already registered"}

    hashed_password = hash_password(user.password)

    user_dict = {
        "email": user.email,
        "password": hashed_password,
        "role": getattr(user, "role", "user")  # ✅ save role from signup form
    }

    await db.users.insert_one(user_dict)
    return {"message": "User registered successfully"}


async def login_user(user):
    existing_user = await db.users.find_one({"email": user.email})

    if not existing_user:
        return {"error": "User not found"}

    if not verify_password(user.password, existing_user["password"]):
        return {"error": "Wrong password"}

    token = create_access_token({"sub": existing_user["email"]})

    return {
        "access_token": token,
        "token_type": "bearer",
        "email": existing_user["email"],         # ✅ return email
        "role": existing_user.get("role", "user") # ✅ return role
    }