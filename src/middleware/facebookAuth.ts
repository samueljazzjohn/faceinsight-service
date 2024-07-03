import { Request, Response, NextFunction } from 'express';

interface FacebookError {
    type: string;
    code: number;
}

interface ErrorResponse {
    error: {
        type: string;
        code: number;
    };
}

export const facebookErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.response && err.response.data && (err.response.data as ErrorResponse).error) {
        const { error } = err.response.data as ErrorResponse;
        if (error.type === 'OAuthException' && error.code === 190) {
            return res.status(401).json({ error: 'Unauthorized: Access token expired or invalid' });
        }
    }
    next(err);
};
