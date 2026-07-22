import fs from "fs"
import path from "path";
import morgan from "morgan";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename);

const logDir = path.join(process.cwd(), "logs");

const accessLogStream = fs.createWriteStream(path.join(logDir ,'request_logs.txt'), { flags: 'a' })

export const logger = morgan('combined', { stream: accessLogStream })