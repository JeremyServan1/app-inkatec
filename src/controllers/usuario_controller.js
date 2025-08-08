import * as susuario from "../services/usuario_service.js";

export const getAll = async function(req, res) {
    try {
        const usuarios = await susuario.getAll();
        res.json(usuarios || []);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo registros de usuarios." });
    }
};

export const getById = async function(req, res) {
    try {
        const usuario = await susuario.getById(req.params.id);
        res.json(usuario || {});
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo usuario." });
    }
};

export const create = async function(req, res) {
    try {
        const ObjUsuario = req.body;
        const idUsuario = await susuario.create(
            ObjUsuario.nombre,
            ObjUsuario.email,
            ObjUsuario.password,
            ObjUsuario.rol
        );
        res.json({ idUsuario });
    } catch (err) {
        res.status(500).json({ error: "Error ingresando usuario.". err });
    }
};

export const update = async function(req, res) {
    try {
        const ObjUsuario = req.body;
        const countRegistro = await susuario.update(req.params.id, ObjUsuario);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error actualizando usuario." });
    }
};

export const deletes = async function(req, res) {
    try {
        const countRegistro = await susuario.deletes(req.params.id);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando usuario." });
    }
};

export const me = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "No autorizado" });

    const usuario = await susuario.getById(userId);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    if ("password" in usuario) delete usuario.password;

    res.json(usuario);
  } catch {
    res.status(500).json({ error: "Error obteniendo perfil" });
  }
};