import * as scatalogo from "../services/catalogo_service.js";

export const getAll = async function(req, res) {
    try {
        const productos = await scatalogo.getAll();
        res.json(productos || []);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo registros de productos." });
    }
};

export const getById = async function(req, res) {
    try {
        const producto = await scatalogo.getById(req.params.id);
        res.json(producto || {});
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo producto." });
    }
};

export const create = async function(req, res) {
    try {
        const ObjProducto = req.body;
        const idProducto = await scatalogo.create(
            ObjProducto.nombre,
            ObjProducto.descripcion,
            ObjProducto.precio,
            ObjProducto.stock
        );
        res.json({ idProducto });
    } catch (err) {
        res.status(500).json({ error: "Error ingresando productos."});
    }
};

export const update = async function(req, res) {
    try {
        const ObjProducto = req.body;
        const countRegistro = await scatalogo.update(req.params.id, ObjProducto);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error actualizando productos." });
    }
};

export const deletes = async function(req, res) {
    try {
        const countRegistro = await scatalogo.deletes(req.params.id);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando producto." });
    }
};
