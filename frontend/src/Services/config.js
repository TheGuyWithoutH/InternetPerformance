/**
 * @file Configuration file for the backend connection
 * @author Ugo Balducci
 * @version 1.0.0
 */

// This is the configuration for the backend connection in development
const testBackendConfig = {
    url: 'http://localhost',
    port: 3000
};

// This is the configuration for the backend connection in production
const clusterBackend = {
    url: 'https://' + process.env.REACT_APP_PROD_URL,
    port: 3000
};


const currentBackendConfig = process.env.NODE_ENV === 'production' ? clusterBackend : testBackendConfig;

export {currentBackendConfig as backendConfig};
