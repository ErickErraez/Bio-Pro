import {Router, Request, Response} from "express";

const useRoute = Router();

useRoute.get('/prueba', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'funcionando'
    })
});
export default useRoute;