import { User } from "orm/entities/users/User";
import * as jwt from 'jsonwebtoken';


export function getAccessToken(user: User) {
    return jwt.sign(
        {
            email: user.email,
            user_uuid: user.user_uuid
        },
        process.env.JWT_TOKEN_PRIVATE_KEY,
        { expiresIn: process.env.JWT_TOKEN_EXPIRED_IN }
    );
}

export function verifyAccessToken(token:string) {
    return jwt.verify(token,process.env.JWT_TOKEN_PRIVATE_KEY)
}