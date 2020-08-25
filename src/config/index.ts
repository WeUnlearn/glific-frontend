const envVariables = process.env;

export const URI = envVariables.REACT_APP_GLIFIC_API  ? envVariables.REACT_APP_GLIFIC_API : 'https://glificuat.coloredcow.com:8443/api' ;
export const SOCKET = envVariables && envVariables.REACT_APP_WEB_SOCKET ? envVariables.REACT_APP_WEB_SOCKET : 'ws://glificuat.coloredcow.com:4000/socket';
export const SENTRY_DSN = envVariables.SENTRY_DSN;
export const FLOW_EDITOR_API = envVariables && envVariables.REACT_APP_FLOW_EDITOR_API ? envVariables.REACT_APP_FLOW_EDITOR_API : 'https://glificuat.coloredcow.com:8443/flow-editor/';
