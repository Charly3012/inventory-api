import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import v1Routes from './routes/v1/index.routes';
import { sequelize } from './database/sequelize';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', v1Routes);

const main = async() => {
    try {
        await sequelize.sync({alter: true});
        console.log('Database connection successfully');

        app.listen(PORT, () => {
            console.log(`API is runing in the port: ${PORT}`);
        });
    } catch (error) {
        console.error('Start API error: ', error);
    }
}

main();
