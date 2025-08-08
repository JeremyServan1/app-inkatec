import { Router } from "express";
import * as cpedido from "../controllers/pedido_controller.js";
import { verificarToken } from "../libs/jwt.js";

const router = Router();

router.get('/pedido/', verificarToken, cpedido.getAll);
router.get('/pedido/:id', verificarToken, cpedido.getById);
router.post('/pedido/', verificarToken, cpedido.create);
router.put('/pedido/:id', verificarToken, cpedido.update);
router.delete('/pedido/:id', verificarToken, cpedido.deletes);

export default router;
