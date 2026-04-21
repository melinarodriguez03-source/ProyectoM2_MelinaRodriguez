
import 'dotenv/config';
import { loadEnvFile } from 'node:process';
loadEnvFile('.env');
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});