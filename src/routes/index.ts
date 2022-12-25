import { Request, Response, Router } from 'express';
import Logger from '../logger'
import page404 from './404';
import securedRoutes from './secured';

const router = Router();

router.get(`/health`, async (req: Request, res: Response) => {
  Logger.info("chekc health");
  res.customSuccess(200, 'Hello');
});

router.use(`/api`, securedRoutes);
router.use(page404);

export default router;
