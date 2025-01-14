"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
exports.success = success;
exports.error = error;
exports.failed = failed;
exports.info = info;
const chalk_1 = __importDefault(require("chalk"));
function logger(type, message) {
    switch (type) {
        case 'success':
            console.log(`[${chalk_1.default.green('SUCCESS')}]: ${message}`);
            return;
        case 'error':
            console.log(`[${chalk_1.default.red('ERROR')}]: ${message}`);
            return;
        case 'failed':
            console.log(`[${chalk_1.default.red('FAILED')}]: ${message}`);
            return;
        case 'info':
            console.log(`[${chalk_1.default.blue('INFO')}]: ${message}`);
            return;
    }
}
function success(message) {
    logger('success', message);
}
function error(message) {
    logger('error', message);
}
function failed(message) {
    logger('error', message);
}
function info(message) {
    logger('info', message);
}
//# sourceMappingURL=logger.js.map