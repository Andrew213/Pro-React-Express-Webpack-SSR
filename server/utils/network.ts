import { networkInterfaces } from 'os';

export function findIP(): string | null {
    const nets = networkInterfaces();
    let result: string | null = null;

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]!) {
            if (
                net.family === 'IPv4' &&
                !net.internal &&
                net.address.startsWith('192')
            ) {
                result = net.address;
                break;
            }
        }
    }

    return result;
}
