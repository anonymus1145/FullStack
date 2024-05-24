export const request = async (options) => {
    const _identifier = crypto.randomUUID();
    let fn;
    return new Promise(resolve => {
        fn = event => {
            if (event.data._identifier === _identifier) {
                window.removeEventListener('message', fn);
                resolve(event.data.data);
            }
        };
        window.addEventListener('message', fn);
        window.parent.postMessage({ type: 'request', ...options, _identifier }, document.location.ancestorOrigins[0]);
    });
};
