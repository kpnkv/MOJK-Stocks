import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { promises as fsPromises, existsSync } from 'fs';
import path from 'path';

const logEvents = async (message, logName) => {
    // Ensure dateTime is assigned before logItem
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss'); // Correctly initialized before usage
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    const logsDir = path.join(process.cwd(), 'logs'); // process.cwd() ensures consistency in ESM

    try {
        if (!existsSync(logsDir)) {
            await fsPromises.mkdir(logsDir, { recursive: true });
        }

        await fsPromises.appendFile(path.join(logsDir, logName), logItem);
    } catch (err) {
        console.error('Error writing log:', err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin ?? 'unknown'}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
};

// Exporting as ES module
export { logger, logEvents };
