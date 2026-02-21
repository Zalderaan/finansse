import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes'
import cookieParser from 'cookie-parser';

const app: Express = express()
const port = 3001;
const routes = router;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

// middleware
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/finansse-backend', routes);

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
