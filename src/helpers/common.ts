import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/variables'


export const verifyToken = async (token: string)=>{
    try {
        const decode = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        return {success: true, payload: decode, message: 'verify success'};
    } catch (error) {
        return {success: false, payload: null, message: 'Invalid token'};
    }

}