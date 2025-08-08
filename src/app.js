import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from "cors";
// Rutas
import authRoutes from "./routes/auth_routes.js";
import usuarioRoutes from "./routes/usuario_routes.js";
import pedidoRoutes from "./routes/pedido_routes.js";
import catalogoRoutes from "./routes/catalogo_routes.js";

const app = express();
// app.use(morgan('dev'));

app.use(cors({
  origin: [
    "http://3.23.119.71:5173",
    "https://3.23.119.71:4001"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api",authRoutes);
app.use("/api",usuarioRoutes);
app.use("/api",pedidoRoutes);
app.use("/api",catalogoRoutes);

export default app;