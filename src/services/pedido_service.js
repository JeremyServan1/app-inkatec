import { query } from "../db.js";

export const getAll = async function () {
    const result = await query(`
        SELECT 
            v.id_venta,
            cl.nombre_cliente AS cliente,
            ve.descripcion AS estado_venta,
            vend.nombre_vendedor AS vendedor,
            td.descripcion AS tipo_documento,
            v.serie_documento,
            v.nro_documento,
            v.fecha_venta,
            p.nombre AS producto,
            dv.cantidad,
            dv.precio_unitario,
            dv.descuento,
            dv.subtotal_con_descuento,
            dv.monto_igv,
            dv.total
        FROM ventas v
        INNER JOIN cliente cl ON v.id_cliente = cl.id_cliente
        INNER JOIN vendedor vend ON v.id_vendedor = vend.id_vendedor
        INNER JOIN tipo_documento td ON v.id_tipo_documento = td.id_tipo_documento
        INNER JOIN ventas_estado_documento ve ON v.id_estado_documento = ve.id_estado_documento
        INNER JOIN detalleventas dv ON v.id_venta = dv.id_venta
        INNER JOIN producto p ON dv.id_producto = p.id_producto
        ORDER BY v.id_venta, dv.id_detalle;
    `);
    return result;
};

export const getById = async function (idPedido) {
    const result = await query(`
        SELECT 
            v.id_venta,
            cl.nombre_cliente AS cliente,
            ve.descripcion AS estado_venta,
            vend.nombre_vendedor AS vendedor,
            td.descripcion AS tipo_documento,
            v.serie_documento,
            v.nro_documento,
            v.fecha_venta,
            p.nombre AS producto,
            dv.cantidad,
            dv.precio_unitario,
            dv.descuento,
            dv.subtotal_con_descuento,
            dv.monto_igv,
            dv.total
        FROM ventas v
        INNER JOIN cliente cl ON v.id_cliente = cl.id_cliente
        INNER JOIN vendedor vend ON v.id_vendedor = vend.id_vendedor
        INNER JOIN tipo_documento td ON v.id_tipo_documento = td.id_tipo_documento
        INNER JOIN ventas_estado_documento ve ON v.id_estado_documento = ve.id_estado_documento
        INNER JOIN detalleventas dv ON v.id_venta = dv.id_venta
        INNER JOIN producto p ON dv.id_producto = p.id_producto
        WHERE v.id_venta = ?
    `, [idPedido]);
    return result[0];
};

export const create = async function (id_cliente, id_vendedor, id_tipo_documento, serie_documento, nro_documento, fecha_venta, id_estado_documento, detalle) {
    const result = await query(`
        INSERT INTO ventas (id_cliente, id_vendedor, id_tipo_documento, serie_documento, nro_documento, fecha_venta, id_estado_documento)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [id_cliente, id_vendedor, id_tipo_documento, serie_documento, nro_documento, fecha_venta, id_estado_documento]);

    const idVentaNueva = result.insertId;

    const inserts = detalle.map(item => [
        idVentaNueva,
        item.id_producto,
        item.cantidad,
        item.flg_esbonificado,
        item.precio_unitario,
        item.precio_unitario_sin_igv,
        item.descuento,
        item.subtotal_con_descuento,
        item.monto_igv,
        item.total
    ]);

    await query(`
        INSERT INTO detalleventas 
        (id_venta, id_producto, cantidad, flg_esbonificado, precio_unitario, precio_unitario_sin_igv, descuento, subtotal_con_descuento, monto_igv, total)
        VALUES ?
    `, [inserts]);

    return idVentaNueva;
};

export const update = async function (idPedido, ObjPedido) {
    const {
        id_cliente,
        id_vendedor,
        id_tipo_documento,
        serie_documento,
        nro_documento,
        fecha_venta,
        id_estado_documento,
        detalle
    } = ObjPedido;

    const result = await query(`
        UPDATE ventas 
        SET id_cliente = ?, 
            id_vendedor = ?, 
            id_tipo_documento = ?, 
            serie_documento = ?, 
            nro_documento = ?, 
            fecha_venta = ?, 
            id_estado_documento = ?,
            fecha_actualizacion = NOW()
        WHERE id_venta = ?
    `, [
        id_cliente,
        id_vendedor,
        id_tipo_documento,
        serie_documento,
        nro_documento,
        fecha_venta,
        id_estado_documento,
        idPedido
    ]);

    for (const item of detalle) {
        await query(`
            UPDATE detalleventas
            SET id_producto = ?, 
                cantidad = ?, 
                flg_esbonificado = ?, 
                precio_unitario = ?, 
                precio_unitario_sin_igv = ?, 
                descuento = ?, 
                subtotal_con_descuento = ?, 
                monto_igv = ?, 
                total = ?
            WHERE id_detalle = ?
        `, [
            item.id_producto,
            item.cantidad,
            item.flg_esbonificado,
            item.precio_unitario,
            item.precio_unitario_sin_igv,
            item.descuento,
            item.subtotal_con_descuento,
            item.monto_igv,
            item.total,
            item.id_detalle
        ]);
    }

    return result.affectedRows;
};

export const deletes = async function (idPedido) {
    await query(`DELETE FROM detalleventas WHERE id_venta = ?`, [idPedido]);
    const result = await query(`DELETE FROM ventas WHERE id_venta = ?`, [idPedido]);
    return result.affectedRows;
};