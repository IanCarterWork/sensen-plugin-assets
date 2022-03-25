export default class SensenPluginAssets {
    static async Script(url, lazy) {
        return new Promise((resolved, rejected) => {
            let get = document.querySelector(`script[src='${url}']`);
            if (get) {
                get.parentNode?.removeChild(get);
            }
            const e = (document.createElement('script'));
            e.setAttribute('type', 'text/javascript');
            if (lazy) {
                e.setAttribute('defer', '');
                e.setAttribute('async', '');
            }
            requestAnimationFrame(() => {
                e.onload = () => { resolved(e); };
                e.onerror = (err) => { rejected(err); };
                e.setAttribute('src', url);
                document.head.appendChild(e);
            });
        });
    }
    static async CSS(url, lazy) {
        return new Promise((resolved, rejected) => {
            let get = document.querySelector(`style[href='${url}']`);
            if (get) {
                get.parentNode?.removeChild(get);
            }
            const e = (document.createElement('style'));
            e.setAttribute('type', 'text/css');
            e.setAttribute('rel', 'StyleSheet');
            if (lazy) {
                e.setAttribute('defer', '');
                e.setAttribute('async', '');
            }
            requestAnimationFrame(() => {
                e.onload = () => { resolved(e); };
                e.onerror = (err) => { rejected(err); };
                e.setAttribute('href', url);
                document.head.appendChild(e);
            });
        });
    }
    static async Image(url, lazy) {
        return new Promise((resolved, rejected) => {
            let get = document.querySelector(`img[src='${url}']`);
            if (get instanceof HTMLImageElement) {
                get.style.opacity = '0';
                get.parentNode?.removeChild(get);
            }
            const e = (document.createElement('img'));
            e.style.opacity = '0';
            if (lazy) {
                e.setAttribute('defer', '');
                e.setAttribute('async', '');
            }
            requestAnimationFrame(() => {
                e.onload = () => {
                    e.style.opacity = '1';
                    resolved(e);
                };
                e.onerror = (err) => {
                    e.style.opacity = '.333';
                    rejected(err);
                };
                e.setAttribute('src', url);
            });
        });
    }
}
