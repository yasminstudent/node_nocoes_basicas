import { Router, Request, Response } from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send('Olá Mundo!')
});

router.get('/eng', (req: Request, res: Response) => {
    res.send('Hello World!')
});

export default router