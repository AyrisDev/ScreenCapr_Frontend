'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const RouteTracker = () => {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            // @ts-ignore
            window.plausible = window.plausible || function(...args: any[]) {
                // @ts-ignore
                (window.plausible.q = window.plausible.q || []).push(args);
            };
            initialized.current = true;
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        if (initialized.current && window.plausible) {
            // @ts-ignore
            window.plausible('pageview', {
                url: window.location.href
            });
        }
    }, [pathname]);

    return null;
};

export default RouteTracker;
