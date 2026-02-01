import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success' }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    const colors = {
        success: 'bg-green-600',
        error: 'bg-red-500',
        alert: 'bg-yellow-500',
    };

    return (
        <div className={`fixed bottom-5 right-5 z-50 text-white px-4 py-3 rounded shadow ${colors[type]}`}>
            {message}
        </div>
    );
}
