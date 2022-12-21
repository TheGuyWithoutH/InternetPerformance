const testBackendConfig = {
    url: 'http://localhost',
    port: 3000
};

const clusterBackend = {
    url: 'https://' + process.env.REACT_APP_PROD_URL,
    port: 3000
};


const currentBackendConfig = process.env.NODE_ENV === 'production' ? clusterBackend : testBackendConfig;

export {currentBackendConfig as backendConfig};
