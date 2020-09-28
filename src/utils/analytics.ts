import * as React from 'react';

const isProd = process.env.NODE_ENV === 'production';
const url = `${process.env.FRONTEND_URL!.replace(/\/$/, "")}/ma/`;
const siteId = Number(process.env.SITE_ID);

declare global {
    interface Window { _paq: any; }
}

class Analytics {
    _id: number;

    constructor(id: number) {
        this._id = id;
        this._init();
    }

    track(...e: string[]) {
        if (!isProd) {
            console.log('track: ', ...e);
            return;
        }
        window._paq.push(['trackEvent', ...e]);
    }

    private _init() {
        if (!isProd) return;
        if (typeof(window) === 'undefined') return;

        const _paq = window._paq ?? [];
        _paq.push(['setRequestMethod', 'POST']);
        _paq.push(['disableCookies']);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function(id) {
            var u=url;
            _paq.push(['setTrackerUrl', u+'m.php']);
            _paq.push(['setSiteId', id]);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'m.js'; s.parentNode?.insertBefore(g,s);
        })(this._id);
        window._paq = _paq;
    }
}

export function useAnalytics(): Analytics {
    return React.useContext(AnalyticsContext)!;
}

export const AnalyticsContext = React.createContext<Analytics | null>(null);
export const analytics = new Analytics(siteId);