import express from 'express';
import mongoose from 'mongoose';
import userRouter from './src/routes/userRouter.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cartRouter from './src/routes/cartRouter.js';
import connectDB from './src/config/db.js';
import logger from './src/utils/logger.js';

dotenv.config();

const app = express();

mongoose.set('strictQuery', false);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecomerc';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});