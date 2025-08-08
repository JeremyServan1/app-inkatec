import mysql from "mysql2/promise";

export let pool;

export const connectDB = async () => {
  try {
    pool = await mysql.createPool({
        host: 'localhost',
        user: 'inkatec_new_user',
        password: 'Ink@tecNEW2025!',
        database: 'inkatec_new',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Probar la conexión
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("Conexión Exitosa:", rows[0].now);

  } catch (error) {
    console.error("Error conexión:", error);
    process.exit(1);
  }
};

export const query = async (sql, params = []) => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};
