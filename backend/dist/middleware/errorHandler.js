import { StatusCodes, getReasonPhrase } from 'http-status-codes';
export function notFoundHandler(_req, res) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not found' });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err, _req, res, _next) {
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || getReasonPhrase(status);
    const details = err.details;
    return res.status(status).json({ message, details });
}
