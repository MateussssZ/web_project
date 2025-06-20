import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include isAuthenticated
declare global {
    namespace Express {
        interface Request {
            isAuthenticated?: () => boolean;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Check if the user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    // If not authenticated, redirect to login
    res.redirect('/login');
};