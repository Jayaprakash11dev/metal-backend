import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import purityRoutes from './routes/purity.routes.js';
import rateRoutes from './routes/rate.routes.js';

dotenv.config();
const app = express();
const corsOptions = {
  origin: [
    'https://metal-management-frontend.vercel.app',
    'http://localhost:5173',

  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'auth'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error', err));

app.use('/api/auth', authRoutes);
app.use('/api/purities', purityRoutes);
app.use('/api/rates', rateRoutes);

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
