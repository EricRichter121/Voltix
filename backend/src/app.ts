import express from 'express'
import cors from 'cors'
import type { 
    Request,
    Response,
    Express
} from 'express'
import cookieParser from 'cookie-parser';

import router from './routes/index.route.js';

export const app: Express = express();

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api', router)

interface HealthResponse {
    status: 'ok',
    message: string,
    timestamp: string
}

app.get('/api/health', (req: Request, res: Response<HealthResponse>) => {
    res.json({
        status: 'ok',
        message:'My mental state is deteriorating.',
        timestamp: new Date().toISOString()
    })
})