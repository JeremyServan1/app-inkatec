import { Router } from "express";
import * as ccatalogo from "../controllers/catalogo_controller.js";
import { verificarToken } from "../libs/jwt.js";

const router = Router();

router.get('/producto/', verificarToken, ccatalogo.getAll);
router.get('/producto/:id', verificarToken, ccatalogo.getById);
router.post('/producto/', verificarToken, ccatalogo.create);
router.put('/producto/:id', verificarToken, ccatalogo.update);
router.delete('/producto/:id', verificarToken, ccatalogo.deletes);

export default router;