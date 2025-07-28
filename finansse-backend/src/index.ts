import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes'

const app: Express = express() 
const port = 3001;
const routes = router;

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/finansse-backend', routes)

// server
app.listen(port, () => {
    console.log(`Server running from http://localhost:${port}`);
})
