import pino from "pino";
import chalk from "chalk";

import { config } from "../../config.js";

export function getTime() {
	const now = new Date();
	const options = { hour: "numeric", minute: "numeric", hour12: true };
	return now.toLocaleTimeString("id-ID", options);
}

export const createLogger = (options = {}) => {
	return pino({
		level: config.logger.level,
		transport: {
			target: "pino-pretty",
			options: {
				colorize: true,
				timestamp: `,"time":"${getTime()}"`,
				messageFormat: (log) => {
					const levelColors = {
						info: chalk.blue,
						warn: chalk.yellow,
						error: chalk.red,
						debug: chalk.green
					};
					const color = levelColors[log.levelLabel] || chalk.white;

					return `${color(log.levelLabel.toUpperCase())}: ${log.msg}`;
				},
				ignore: "pid,hostname",
				...options
			}
		}
	});
};

export const logger = createLogger();
