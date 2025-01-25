import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const SECRET_KEY = process.env.SECRET_KEY || 'MyS3cr3tK3y';
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || 'pk_test_51PoJsPB1zj1dfOtc7SVzxDLRXdXuk4v5zBnrVoKXamHlrCp2gq2audddnCeyebKHTVAy2SiDjkUuXSzmk6AvDTaU00y6xSrVil';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_51PoJsPB1zj1dfOtcA1Ftqq6nDvYZ9npgIPcjUALJ14sDKuClflWBnwhqXGue5jCpZVmxSu3F8YfewAicS3RP9AxQ00rbAVwJZe';