export default function parseErrors(error: number) {
    switch (error) {
        case 401:
            return 'Not Authorized';
        case 422:
            return 'Invalid date or out of range';
        case 404:
            return 'Event not found';
    }
}
