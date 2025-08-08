import { Router } from "express";
import * as cusuario from "../controllers/usuario_controller.js";
import { verificarToken } from "../libs/jwt.js";

const router = Router();

router.get('/usuario/', verificarToken, cusuario.getAll);
router.get('/usuario/:id', verificarToken, cusuario.getById);
router.post('/usuario/', cusuario.create);
router.put('/usuario/:id', verificarToken, cusuario.update);
router.delete('/usuario/:id', verificarToken, cusuario.deletes);
router.get('/me', verificarToken, cusuario.me);

export default router;

