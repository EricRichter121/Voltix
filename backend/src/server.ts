import { app } from './app.js'
import { config } from './env.js';

export function startServer(): void {
    app.listen(config.port, () => {
        console.log(`Server is running on port ${config.port} in ${config.env} mode`);
    });
}