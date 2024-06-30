declare global {
    namespace Express {
        export interface Request {
            user?: any;
            query?:any;
        }
    }
}

export {}; 