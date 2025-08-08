import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "fallback_secret_inseguro";

export function generarToken(usuario) {
    return jwt.sign(
        {
            id: usuario.id_usuario,
            email: usuario.email,
            rol: usuario.rol
        },
        SECRET,
        { expiresIn: "1h" }
    );
}

export function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }

        req.usuario = usuario;
        next();
    });
}
