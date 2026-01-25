import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes'
import cookieParser from 'cookie-parser';

const app: Express = express()
const port = 3001;
const routes = router;

// middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/finansse-backend', routes)

// server
const server = app.listen(port, () => {
    console.log(`Server running from http://localhost:${port}`);
})

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })
})

process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close();
    process.exit(0);
});
