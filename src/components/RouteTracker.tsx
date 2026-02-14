'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface PlausibleWindow extends Window {
    plausible?: (...args: unknown[]) => void;
}

const RouteTracker = () => {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const win = window as unknown as PlausibleWindow;
            win.plausible = win.plausible || function(...args: unknown[]) {
                // @ts-expect-error - plausible.q might not exist yet
                (win.plausible!.q = win.plausible!.q || []).push(args);
            };
            initialized.current = true;
        }
    }, []);

    useEffect(() => {
        const win = window as unknown as PlausibleWindow;
        if (initialized.current && win.plausible) {
            win.plausible('pageview', {
                url: window.location.href
            });
        }
    }, [pathname]);

    return null;
};

export default RouteTracker;
