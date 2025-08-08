import * as spedido from "../services/pedido_service.js";

export const getAll = async function(req, res) {
    try {
        const pedidos = await spedido.getAll();
        res.json(pedidos || []);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo registros de pedidos." });
    }
};

export const getById = async function(req, res) {
    try {
        const pedido = await spedido.getById(req.params.id);
        res.json(pedido || {});
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo pedido." });
    }
};

export const create = async function(req, res) {
    try {
        const ObjPedido = req.body;
        const idPedido = await spedido.create(
            ObjPedido.id_cliente,
            ObjPedido.id_vendedor,
            ObjPedido.id_tipo_documento,
            ObjPedido.serie_documento,
            ObjPedido.nro_documento,
            ObjPedido.fecha_venta,
            ObjPedido.id_estado_documento,
            ObjPedido.detalle
        );
        res.json({ idPedido });
    } catch (err) {
        res.status(500).json({ error: "Error ingresando pedido." });
    }
};

export const update = async function(req, res) {
    try {
        const ObjPedido = req.body;
        const countRegistro = await spedido.update(req.params.id, ObjPedido);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error actualizando pedido." });
    }
};

export const deletes = async function(req, res) {
    try {
        const countRegistro = await spedido.deletes(req.params.id);
        res.json({ countRegistro });
    } catch (err) {
        res.status(500).json({ error: "Error eliminando pedido." });
    }
};