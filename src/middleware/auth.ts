import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface Authenticate extends Request {
  user?: JwtPayload;
}

const authenticateToken = (
  req: Authenticate,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(403).json({ error: 'Invalid token' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET as string
    ) as JwtPayload;
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp - now < 60) {
      const newToken = jwt.sign(
        { userId: decoded.userId },
        process.env.SECRET as string,
        { expiresIn: process.env.TOKEN_EXPIRE }
      );

      res.cookie('token', newToken, { httpOnly: true });
    }

    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; 
  }
};

export default authenticateToken;
