"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SHA1_js_1 = require("./SHA1.js");
const connectLib_1 = require("./connectLib");
const utils_1 = require("./utils");
/*  .send(your_data) wraps request to server with {id: `hash`, data: `actually your data`},
    returns a Promise, that will be rejected after a timeout or
    resolved if server returns the same signature: {id: `same_hash`, data: `response data`}
*/
const sett = (a, b) => setTimeout(b, a);
const default_config = {
    data_type: 'json',
    // Debug features.
    log: ((event = '', time = 0, message = '') => null),
    timer: false,
    // Set up.
    url: 'localhost',
    timeout: 1400,
    reconnect: 2,
    lazy: false,
    socket: null,
    adapter: ((host, protocols) => new WebSocket(host, protocols)),
    protocols: [],
    server: {
        id_key: 'id',
        data_key: 'data'
    }
};
class WebSocketClient {
    constructor(user_config = {}) {
        this.open = null;
        this.ws = null;
        this.forcibly_closed = false;
        this.reconnect_timeout = null;
        this.queue = {};
        this.messages = [];
        this.onReadyQueue = [];
        this.onCloseQueue = [];
        this.config = {};
        // Config.
        const config = {};
        Object.assign(config, default_config);
        Object.assign(config, user_config);
        this.config = config;
        // Init.
        this.init_flush();
        // Flags.
        this.open = false;
        this.reconnect_timeout = null;
        this.forcibly_closed = false;
        if (!config.lazy) {
            this.connect();
        }
    }
    init_flush() {
        this.queue = {}; // data queuse
        this.messages = []; // send() queue
    }
    log(event, message = null, time = null) {
        const config = this.config;
        event = `WSP: ${event}`;
        if (time !== null) {
            config.log(event, time, message);
        }
        else {
            if (config.timer) {
                config.log(event, null, message);
            }
            else {
                config.log(event, message);
            }
        }
    }
    async connect() {
        return new Promise((ff, rj) => {
            connectLib_1.default.call(this, ff);
        });
    }
    get socket() {
        return this.ws;
    }
    async ready() {
        return new Promise((ff, rj) => {
            if (this.open) {
                return true;
            }
            else {
                this.onReadyQueue.push(ff);
            }
        });
    }
    on(event_name, handler, predicate) {
        return utils_1.add_event(this.ws, event_name, event => {
            if (!predicate || predicate(event)) {
                handler(event);
            }
        });
    }
    async close() {
        return new Promise((ff, rj) => {
            if (this.ws === null) {
                rj('WSP: closing a non-inited socket!');
            }
            else {
                this.open = null;
                this.onCloseQueue.push(() => {
                    this.init_flush();
                    this.ws = null;
                    this.forcibly_closed = true;
                    ff();
                });
                this.ws.close();
            }
        });
    }
    async send(user_message, opts = {}) {
        this.log('Send.', user_message);
        const config = this.config;
        const message = {};
        const id_key = config.server.id_key;
        const data_key = config.server.data_key;
        const first_time_lazy = config.lazy && !this.open;
        // const data_type  = opts.data_type || config.data_type
        message[data_key] = user_message; // is_json ? JSON.stringify(user_message
        message[id_key] = SHA1_js_1.default('' + ((Math.random() * 1e5) | 0)).slice(0, 20);
        if (typeof opts.top === 'object') {
            if (opts.top[data_key]) {
                throw new Error('Attempting to set data key/token via send() options!');
            }
            Object.assign(message, opts.top);
        }
        if (this.open === true) {
            this.ws.send(JSON.stringify(message));
        }
        else if (this.open === false || first_time_lazy) {
            this.messages.push({ send: () => this.ws.send(JSON.stringify(message)) });
            if (first_time_lazy) {
                this.connect();
            }
        }
        else if (this.open === null) {
            throw new Error('Attempting to send via closed WebSocket connection!');
        }
        return new Promise((ff, rj) => {
            this.queue[message[id_key]] = {
                ff,
                data_type: config.data_type,
                sent_time: config.timer ? Date.now() : null,
                timeout: sett(config.timeout, () => {
                    if (this.queue[message[id_key]]) {
                        rj({
                            'Websocket timeout expired: ': config.timeout,
                            'for the message': message
                        });
                        delete this.queue[message[id_key]];
                    }
                })
            };
        });
    }
}
exports.default = WebSocketClient;
