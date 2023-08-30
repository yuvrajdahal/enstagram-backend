import path from "path";
import { createLogger, transports, format } from "winston";
import "winston-daily-rotate-file";

const logFilePath = path.join(__dirname, "../configs/logs/error.log");

const { combine, label, prettyPrint } = format;
const fileRotateTransport = new transports.DailyRotateFile({
  filename: logFilePath,
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  level: "error",
});

export const logger = createLogger({
  level: "error",
  handleExceptions: true,
  format: combine(
    format.timestamp(),
    format.json(),
    label({ label: "Error" }),
    prettyPrint()
  ),

  transports: [fileRotateTransport],
});
