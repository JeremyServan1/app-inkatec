import { query } from "../db.js";

export const getAll = async function () {
    const result = await query(`
        SELECT 
            id_usuario,
            nombre,
            email,
            password,
            rol,
            activo,
            fecha_registro
        FROM usuario
        WHERE activo = 1;
    `);
    return result;
};

export const getById = async function (idUsuario) {
    const result = await query(`
        SELECT 
            id_usuario,
            nombre,
            email,
            password,
            rol,
            activo,
            fecha_registro
        FROM usuario
        WHERE activo = 1 AND id_usuario = ?
    `, [idUsuario]);
    return result[0];
};

export const create = async function (nombre, email, password, rol) {
    const result = await query("INSERT INTO usuario (nombre, email, password, rol) VALUES (?, ?, ?, ?)", [nombre, email, password, rol]);
    return result.insertId;
};

export const update = async function (idUsuario, ObjUsuario) {
    const result = await query(`
        UPDATE usuario 
        SET nombre = ?, email = ?, password = ?, rol = ?
        WHERE id_usuario = ?
    `, [
        ObjUsuario.nombre,
        ObjUsuario.email,
        ObjUsuario.password,
        ObjUsuario.rol,
        idUsuario
    ]);
    return result.affectedRows;
};

export const deletes = async function (idUsuario) {
    const result = await query(`
        UPDATE usuario 
        SET activo = 0
        WHERE id_usuario = ?
    `, [idUsuario]);
    return result.affectedRows;
};
