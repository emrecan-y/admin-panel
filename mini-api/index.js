import express from 'express';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middleware.js';
import productRoutes from './routes/product-routes.js';
import cors from 'cors';


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(errorMiddleware);

// Produkt-Routen
app.use('/products', productRoutes);
app.use('/public', productRoutes);

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
