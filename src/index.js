import app from "./app.js";
import {connectDB} from './db.js';

await connectDB();
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
