import { query } from "../db.js";

export const getAll = async function () {
    const result = await query(`
        SELECT 
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.stock,
            p.activo,
            ca.nombre_categoria as categoria,
            pro.nombre as proveedor
        FROM producto p
        LEFT JOIN categoria ca ON p.id_categoria = ca.id_categoria
        LEFT JOIN proveedor pro ON p.id_proveedor = pro.id_proveedor
        WHERE p.activo = 1
    `);
    return result;
};

export const getById = async function (idProducto) {
    const result = await query(`
        SELECT 
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.stock,
            p.activo,
            ca.nombre_categoria as categoria,
            pro.nombre as proveedor
        FROM producto p
        LEFT JOIN categoria ca ON p.id_categoria = ca.id_categoria
        LEFT JOIN proveedor pro ON p.id_proveedor = pro.id_proveedor
        WHERE p.activo = 1 AND p.id_producto = ?
    `, [idProducto]);
    return result[0];
};

export const create = async function (nombre, descripcion, precio, stock) {
    const result = await query("INSERT INTO producto (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)", [nombre, descripcion, precio, stock]);

    return result.insertId;
};

export const update = async function (idProducto, ObjProducto) {
    const result = await query(`
        UPDATE producto 
        SET nombre = ?, descripcion = ?, precio = ?, stock = ?
        WHERE id_producto = ?
    `, [
        ObjProducto.nombre,
        ObjProducto.descripcion,
        ObjProducto.precio,
        ObjProducto.stock,
        idProducto
    ]);
    return result.affectedRows;
};

export const deletes = async function (idProducto) {
    const result = await query(`
        UPDATE producto 
        SET activo = 0
        WHERE id_producto = ?
    `, [idProducto]);
    return result.affectedRows;
};
