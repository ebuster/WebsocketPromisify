function __awaiter(e,t,n,o){return new(n||(n=Promise))(function(s,i){function c(e){try{r(o.next(e))}catch(e){i(e)}}function l(e){try{r(o.throw(e))}catch(e){i(e)}}function r(e){e.done?s(e.value):new n(function(t){t(e.value)}).then(c,l)}r((o=o.apply(e,t||[])).next())})}var SHA1=e=>{for(var t,n,o,s,i,c,l,r=0,u=0,h=[],a=[t=1732584193,n=4023233417,~t,~n,3285377520],d=[],f=unescape(encodeURI(e)),_=f.length;u<=_;)d[u>>2]|=(f.charCodeAt(u)||128)<<8*(3-u++%4);for(d[l=_+8>>2|15]=_<<3;r<=l;r+=16){for(t=a,u=0;u<80;t=[0|[(c=((f=t[0])<<5|f>>>27)+t[4]+(h[u]=u<16?~~d[r+u]:c<<1|c>>>31)+1518500249)+((n=t[1])&(o=t[2])|~n&(s=t[3])),i=c+(n^o^s)+341275144,c+(n&o|n&s|o&s)+882459459,i+1535694389][0|u++/20],f,n<<30|n>>>2,o,s])c=h[u-3]^h[u-8]^h[u-14]^h[u-16];for(u=5;u;)a[--u]=a[u]+t[u]|0}for(e="";u<40;)e+=(a[u>>3]>>4*(7-u++%8)&15).toString(16);return e};const add_event=(e,t,n)=>e.addEventListener(t,n),once=e=>{let t=!1,n=null;return(...o)=>t?n:(t=!0,n=e(...o))},init=function(e){const t=this.config;this.open=!0,this.onReadyQueue.forEach(e=>e()),this.onReadyQueue=[];const{id_key:n,data_key:o}=t.server;this.messages.forEach(e=>e.send()),null!==this.reconnect_timeout&&(clearInterval(this.reconnect_timeout),this.reconnect_timeout=null),add_event(e,"close",e=>__awaiter(this,void 0,void 0,function*(){this.log("Closed."),this.open=!1,this.onCloseQueue.forEach(e=>e()),this.onCloseQueue=[];const e=t.reconnect;if("number"!=typeof e||isNaN(e)||this.forcibly_closed)this.ws=null,this.open=null;else{const t=()=>__awaiter(this,void 0,void 0,function*(){this.log("Trying to reconnect..."),null!==this.ws&&(this.ws.close(),this.ws=null),null!==(yield this.connect())&&(this.reconnect_timeout=setTimeout(t,1e3*e))});t()}this.forcibly_closed=!1})),add_event(e,"message",e=>{try{const s=t.decode(e.data);if(s[n]){const e=this.queue[s[n]];if(e){const t=e.sent_time?Date.now()-e.sent_time:null;this.log("Message.",s[o],t),e.ff(s[o]),clearTimeout(e.timeout),delete this.queue[s[n]]}}}catch(t){console.error(t,`Decode error. Got: ${e.data}`)}})},connectLib=function(e){if(!0===this.open)return e(1);const t=this.config,n=t.socket||t.adapter(`ws://${t.url}`,t.protocols);this.ws=n,add_event(n,"error",once(t=>(this.ws=null,this.log("Error status 3."),e(3)))),t.socket&&1===n.readyState?(init.call(this,n),e(null)):add_event(n,"open",once(t=>(this.log("Opened."),init.call(this,n),e(null))))},sett=(e,t)=>setTimeout(t,e),default_config={data_type:"json",log:(e="",t=0,n="")=>null,timer:!1,url:"localhost",timeout:1400,reconnect:2,lazy:!1,socket:null,adapter:(e,t)=>new WebSocket(e,t),encode:(e,t,{server:n})=>JSON.stringify({[n.id_key]:e,[n.data_key]:t}),decode:e=>JSON.parse(e),protocols:[],pipes:[],server:{id_key:"id",data_key:"data"}};class WebSocketClient{constructor(e={}){this.open=null,this.ws=null,this.forcibly_closed=!1,this.reconnect_timeout=null,this.queue={},this.messages=[],this.onReadyQueue=[],this.onCloseQueue=[],this.config={};const t={};Object.assign(t,default_config),Object.assign(t,e),this.config=t,this.init_flush(),this.open=!1,this.reconnect_timeout=null,this.forcibly_closed=!1,t.lazy||this.connect()}init_flush(){this.queue={},this.messages=[]}log(e,t=null,n=null){const o=this.config;e=`WSP: ${e}`,null!==n?o.log(e,n,t):o.timer?o.log(e,null,t):o.log(e,t)}connect(){return __awaiter(this,void 0,void 0,function*(){return new Promise((e,t)=>{connectLib.call(this,e)})})}get socket(){return this.ws}ready(){return __awaiter(this,void 0,void 0,function*(){return new Promise((e,t)=>{this.open?e():this.onReadyQueue.push(e)})})}on(e,t,n){return add_event(this.ws,e,e=>{n&&!n(e)||t(e)})}close(){return __awaiter(this,void 0,void 0,function*(){return new Promise((e,t)=>{null===this.ws?t("WSP: closing a non-inited socket!"):(this.open=null,this.onCloseQueue.push(()=>{this.init_flush(),this.ws=null,this.forcibly_closed=!0,e()}),this.ws.close())})})}send(e,t={}){return __awaiter(this,void 0,void 0,function*(){this.log("Send.",e);const n=this.config,o={},s=(n.server.id_key,n.server.data_key),i=n.lazy&&!this.open,c=SHA1(""+(1e5*Math.random()|0)).slice(0,20);if("object"==typeof t.top){if(t.top[s])throw new Error("Attempting to set data key/token via send() options!");Object.assign(o,t.top)}if(n.pipes.forEach(t=>e=t(e)),!0===this.open)this.ws.send(n.encode(c,e,n));else if(!1===this.open||i)this.messages.push({send:()=>this.ws.send(n.encode(c,e,n))}),i&&this.connect();else if(null===this.open)throw new Error("Attempting to send via closed WebSocket connection!");return new Promise((e,t)=>{this.queue[c]={ff:e,data_type:n.data_type,sent_time:n.timer?Date.now():null,timeout:sett(n.timeout,()=>{this.queue[c]&&(t({"Websocket timeout expired: ":n.timeout,"for the message":o}),delete this.queue[c])})}})})}}export default WebSocketClient;
//# sourceMappingURL=ws.esm.js.map
