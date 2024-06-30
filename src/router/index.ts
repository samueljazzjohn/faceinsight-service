import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/welcome', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the API!' });
});


export default router;