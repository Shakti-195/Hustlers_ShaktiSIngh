from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from app.core.security import SECRET_KEY, ALGORITHM
from app.core.database import db

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = await db.users.find_one({"email": email})

        if user is None:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except:
        raise HTTPException(status_code=401, detail="Invalid token")