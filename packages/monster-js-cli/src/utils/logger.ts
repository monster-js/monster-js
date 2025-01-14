import chalk from 'chalk';

export function logger(type: 'success' | 'error' | 'info' | 'failed', message: string) {
    switch(type) {
        case 'success':
            console.log(`[${chalk.green('SUCCESS')}]: ${message}`);
            return;
        case 'error':
            console.log(`[${chalk.red('ERROR')}]: ${message}`);
            return;
        case 'failed':
            console.log(`[${chalk.red('FAILED')}]: ${message}`);
            return;
        case 'info':
            console.log(`[${chalk.blue('INFO')}]: ${message}`);
            return;
    }
}

export function success(message: string) {
    logger('success', message);
}

export function error(message: string) {
    logger('error', message);
}

export function failed(message: string) {
    logger('error', message);
}

export function info(message: string) {
    logger('info', message);
}