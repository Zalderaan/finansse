import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './routes/routes'
import cookieParser from 'cookie-parser';

const app: Express = express()
const port = process.env.PORT || 3001; // PORT will be assigned by render.com
const routes = router;
const environment = process.env.NODE_ENV || 'development';
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];

// console.log(process.env.DATABASE_URL);

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
    if (environment === 'production') {
        console.log(`Server running in production on port ${port}`);
    } else {
        console.log(`Server running at http://localhost:${port}`);
    }
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

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
