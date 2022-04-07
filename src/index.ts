import './style/index.css';
import App from './components/app';

import ClientDebugger from './utilities/ClientDebugger';
const debug = new ClientDebugger();

interface ClientWindow extends Window {
    debug: ClientDebugger;
}

declare const window: ClientWindow;

Object.defineProperty(window, 'debug', {
    value: debug,
    writable: false,
    configurable: false
});

export default App;
