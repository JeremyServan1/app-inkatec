import { query } from "../db.js";

export const slogin = async function (email, password) {
    const result = await query(`SELECT * FROM usuario WHERE email = ?`, [email]);

    if (result.length === 0) {
        throw new Error("Usuario no registrado");
    }

    const user = result[0];
    const now = new Date();

    if (user.bloqueado_hasta && new Date(user.bloqueado_hasta) > now) {
        throw new Error("Usuario bloqueado temporalmente");
    }

    if (user.password !== password) {
        const nuevosIntentos = user.intentos_fallidos + 1;
        const bloquear = nuevosIntentos >= 3;
        const bloqueoSql = bloquear ? ', bloqueado_hasta = NOW() + INTERVAL 5 MINUTE' : '';

        await query(`
            UPDATE usuario 
            SET intentos_fallidos = ? ${bloqueoSql}
            WHERE id_usuario = ?
        `, [nuevosIntentos, user.id_usuario]);

        throw new Error(bloquear ? "Demasiados intentos. Intenta más tarde." : "Contraseña incorrecta");
    }

    await query(`
        UPDATE usuario 
        SET ultimo_login = NOW(), intentos_fallidos = 0, bloqueado_hasta = NULL 
        WHERE id_usuario = ?
    `, [user.id_usuario]);

    return user;
};