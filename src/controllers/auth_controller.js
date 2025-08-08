import {slogin} from "../services/auth_service.js";
import { generarToken } from "../libs/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await slogin(email, password);

    const token = generarToken(user);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict", 
    //   maxAge: 24 * 60 * 60 * 1000
    // });

    res.json({
      mensaje: "Login exitoso",
      token,
      user: { id_usuario: user.id_usuario, email: user.email, rol: user.rol }
    });

  } catch (err) {
    res.status(401).json({ error: err.message || "Error ingresando credenciales." });
  }
};