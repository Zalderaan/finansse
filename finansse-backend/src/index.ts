import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Express = express() 
const port = 3001;

// middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TS + Express!')
})

// server
app.listen(port, () => {
    console.log(`Server running from http://localhost:${port}`);
})
