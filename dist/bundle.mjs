const e=Symbol("Placeholder"),t=t=>{let n=0;for(const s of t)s!==e&&n++;return n},n=(t,n)=>{const s=t.length,o=t.slice(),r=n.length;let i=r,c=0;for(;i&&c<s;c++)o[c]===e&&(o[c]=n[r-i],i--);for(c=s;i;c++,i--)o[c]=n[r-i];return o},s=(e,o,r)=>{const i=e.length-o.length-t(r);if(i<1)return e(...n(o,r));{const t=(...t)=>s(e,n(o,r),t);return t.$args_left=i,t}},o=e=>(...n)=>e.length>t(n)?s(e,[],n):e(...n),r=t=>function(n){return n===e?t:t(n)};function i(t){return function(n,s){const o=n===e,i=arguments.length;if(1===i&&o)throw new Error("Senseless placeholder usage.");return arguments.length>1?o?r((e=>t(e,s))):t(n,s):e=>t(n,e)}}function c(e){return o(e)}const l=void 0,u=1/0,a=e=>typeof e,h=e=>null===e,f={u:"U",b:"B",n:"N",s:"S",f:"F"},d=e=>{const t=a(e);return"object"===t?h(e)?"Null":e.constructor.name:f[t[0]]+t.slice(1)},g=i(((e,t)=>(t.push(e),t))),p=c(((e,t,n)=>n.reduce(e,t))),m=c(((e,t,n)=>{for(let s in n)switch(d(n[s])){case"Array":if(e>1&&"Array"===d(t[s]))switch(e){case 2:const o=t[s],r=n[s];for(const t in r)o[t]?m(e,o[t],r[t]):o[t]=r[t];break;case 3:t[s].push(...n[s])}else t[s]=n[s];break;case"Object":if("Object"===d(t[s])){m(e,t[s],n[s]);break}default:t[s]=n[s]}return t}));m(1),m(2),m(3);const y=i(((e,t)=>{const n=d(e);if(n===d(t)&&("Object"===n||"Array"==n)){if(h(e)||h(t))return e===t;if(e===t)return!0;for(const n of[e,t])for(const s in n)if(!(n===t&&s in e||n===e&&s in t&&y(e[s],t[s])))return!1;return!0}return e===t})),w=o(((e,t,n,s)=>e(s)?t(s):n(s))),b=(...t)=>(...n)=>{let s,o=!0;for(let r=j(t)-1;r>-1;r--)o?(o=!1,s=t[r](...n)):s=s===e?t[r]():t[r](s);return s},_=i(((e,t)=>t[e])),k=i(((e,t)=>{if((e=>"string"===a(e))(t))return t.includes(e);for(const n of t)if(y(n,e))return!0;return!1})),S=c(((e,t,n)=>n.slice(e,(e=>"number"==a(e))(t)?t:u))),v=_(0);S(1,u);const E=e=>h(e)||(e=>e===l)(e),j=e=>e.length,N=e=>()=>e,O=i(((e,t)=>t.split(e))),A=e=>p(((e,t)=>k(t,e)?e:g(t,e)),[],e),P=c(((e,t,n)=>({...n,[e]:t}))),q=i(((e,t)=>t[e])),Q=c(((e,t,n)=>w(j,(()=>E(n)?e:b(w(E,N(e),(n=>Q(e,S(1,u,t),n))),(e=>i(((t,n)=>e(n,t))))(q)(n),v)(t)),N(n),t)));Q(l);const $=/^(.*?)(8|16|32|64)(Clamped)?Array$/,W=(e,t=!1)=>{const n=d(e);switch(n){case"Null":case"String":case"Number":case"Boolean":case"Symbol":return e;case"Array":return t?[...e]:R(b(W,((...e)=>e[0])),e);case"Object":if(t)return{...e};const s={};for(let t in e)s[t]=W(e[t]);return s;default:return $.test(n)?e.constructor.from(e):e}},C=c(((e,t,n)=>p(e,W(t),n))),R=i(((e,t)=>t.map(e))),{floor:z}=Math;let B,D;const I=b((e=>C(((e,t)=>P(...t,e)),{},e)),R(((e,t)=>[e,t])),O(""));(e=>{if(!(e=>b(y(j(e)),j,A,O(""))(e))(e))throw new Error("Not all chars are unique!");B=e,D=B.length,I(B)})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");const T=(e,t,n)=>e.addEventListener(t,n),U=e=>{let t=!1,n=null;return(...s)=>t?n:(t=!0,n=e(...s))},x=(e,t)=>setTimeout(t,e),F=function(e){const t=this.config;this.open=!0,this.onReadyQueue.forEach((e=>e())),this.onReadyQueue.splice(0);const{id_key:n,data_key:s}=t.server;if(this.handlers.open.forEach((e=>e())),this.messages.forEach((e=>e.send())),null!==this.reconnect_timeout&&(clearInterval(this.reconnect_timeout),this.reconnect_timeout=null),t.ping){const e=setInterval((()=>{this.open&&this.send(t.ping.content),this.forcibly_closed&&clearInterval(e)}),1e3*t.ping.interval)}T(e,"close",(async()=>{this.log("close"),this.open=!1,this.onCloseQueue.forEach((e=>e())),this.onCloseQueue=[];const e=t.reconnect;if("number"!=typeof e||isNaN(e)||this.forcibly_closed)this.ws=null,this.open=null;else{const t=async()=>{this.log("reconnect"),null!==this.ws&&(this.ws.close(),this.ws=null);null!==await this.connect()&&(this.reconnect_timeout=setTimeout(t,1e3*e))};t()}this.forcibly_closed=!1})),T(e,"message",(e=>{try{const o=t.decode(e.data);if(this.handlers.message.forEach((t=>t({...e,data:o}))),o[n]){const e=this.queue[o[n]];if(e){const t=e.sent_time?Date.now()-e.sent_time:null;this.log("message",o[s],t),e.ff(o[s]),clearTimeout(e.timeout),delete this.queue[o[n]]}}}catch(t){console.error(t,`WSP: Decode error. Got: ${e.data}`)}}))};var J=function(e){if(!0===this.open)return e(null);const t=this.config,n=t.socket||t.adapter(t.url,t.protocols);if(this.ws=n,!n||n.readyState>1)return this.ws=null,this.log("error","ready() on closing or closed state! status 2."),e(2);T(n,"error",U((t=>(this.log("error","status 3."),this.handlers.error.forEach((e=>e(t))),this.ws=null,e(3))))),n.readyState?(F.call(this,n),e(null)):T(n,"open",U((()=>(this.log("open"),F.call(this,n),e(null)))))};const L={data_type:"json",log:()=>null,timer:!1,url:"localhost",timeout:1400,reconnect:2,lazy:!1,socket:null,adapter:(e,t)=>new WebSocket(e,t),encode:(e,t,{server:n})=>JSON.stringify({[n.id_key]:e,[n.data_key]:t}),decode:e=>JSON.parse(e),protocols:[],pipes:[],server:{id_key:"id",data_key:"data"},ping:{interval:55,content:{}}},M=Symbol("Placeholder"),G=e=>{let t=0;for(const n of e)n!==M&&t++;return t},H=(e,t)=>{const n=e.length,s=e.slice(),o=t.length;let r=o,i=0;for(;r&&i<n;i++)s[i]===M&&(s[i]=t[o-r],r--);for(i=n;r;i++,r--)s[i]=t[o-r];return s},K=(e,t,n)=>{const s=e.length-t.length-G(n);if(s<1)return e(...H(t,n));{const o=(...s)=>K(e,H(t,n),s);return o.$args_left=s,o}},V=e=>(...t)=>e.length>G(t)?K(e,[],t):e(...t),X=e=>function(t){return t===M?e:e(t)};function Y(e){return function(t,n){const s=t===M,o=arguments.length;if(1===o&&s)throw new Error("Senseless placeholder usage.");return arguments.length>1?s?X((t=>e(t,n))):e(t,n):n=>e(t,n)}}function Z(e){return V(e)}const ee=void 0,te=1/0,ne=e=>typeof e,se=e=>null===e,oe={u:"U",b:"B",n:"N",s:"S",f:"F"},re=e=>{const t=ne(e);return"object"===t?se(e)?"Null":e.constructor.name:oe[t[0]]+t.slice(1)},ie=Z(((e,t,n)=>{for(let s in n)switch(re(n[s])){case"Array":if(e>1&&"Array"===re(t[s]))switch(e){case 2:const o=t[s],r=n[s];for(const t in r)o[t]?ie(e,o[t],r[t]):o[t]=r[t];break;case 3:t[s].push(...n[s])}else t[s]=n[s];break;case"Object":if("Object"===re(t[s])){ie(e,t[s],n[s]);break}default:t[s]=n[s]}return t}));ie(1),ie(2),ie(3);const ce=V(((e,t,n,s)=>e(s)?t(s):n(s))),le=(...e)=>(...t)=>{let n,s=!0;for(let o=de(e)-1;o>-1;o--)s?(s=!1,n=e[o](...t)):n=n===M?e[o]():e[o](n);return n},ue=Y(((e,t)=>t[e])),ae=Z(((e,t,n)=>n.slice(e,(e=>"number"==ne(e))(t)?t:te))),he=ue(0);ae(1,te);const fe=e=>se(e)||(e=>e===ee)(e),de=e=>e.length,ge=e=>()=>e,pe=ge(!0),me=Y(((e,t)=>t[e])),ye=Z(((e,t,n)=>ce(de,(()=>fe(n)?e:le(ce(fe,ge(e),(n=>ye(e,ae(1,te,t),n))),(e=>Y(((t,n)=>e(n,t))))(me)(n),he)(t)),ge(n),t)));ye(ee);class we{open=!1;ws=null;forcibly_closed=!1;reconnect_timeout=null;queue={};messages=[];onReadyQueue=[];onCloseQueue=[];handlers={open:[],message:[],close:[],error:[]};config={};init_flush(){this.queue={},this.messages=[]}log(e,t=null,n=null){const s=this.config;null!==n?s.log(e,n,t):s.timer?s.log(e,null,t):s.log(e,t)}async connect(){return new Promise((e=>{J.call(this,e)}))}get socket(){return this.ws}async ready(){return new Promise((e=>{this.open?e():this.onReadyQueue.push(e)}))}on(e,t,n=pe,s=!1){const o=e=>n(e)&&t(e);return s?T(this.ws,e,o):this.handlers[e].push(o)}async close(){return new Promise(((e,t)=>{null===this.ws?t("WSP: closing a non-inited socket!"):(this.open=!1,this.onCloseQueue.push((()=>{this.init_flush(),this.ws=null,this.forcibly_closed=!0,e(null)})),this.ws.close())}))}async send(e,t={}){this.log("send",e);const n=this.config,s={},o=n.server.data_key,r=n.lazy&&!this.open,i=(e=>{let t="";for(;e>0;)t=B[e%D]+t,e=z(e/D);return t||"0"})(2147483637*Math.random()|0);if("object"==typeof t.top){if(t.top[o])throw new Error("Attempting to set data key/token via send() options!");Object.assign(s,t.top)}if(n.pipes.forEach((t=>e=t(e))),!0===this.open)this.ws.send(n.encode(i,e,n));else if(!1===this.open||r)this.messages.push({send:()=>this.ws.send(n.encode(i,e,n))}),r&&this.connect();else if(null===this.open)throw new Error("Attempting to send via closed WebSocket connection!");return new Promise(((t,s)=>{this.queue[i]={ff:t,data_type:n.data_type,sent_time:n.timer?Date.now():null,timeout:x(n.timeout,(()=>{this.queue[i]&&(s({"Websocket timeout expired: ":n.timeout,"for the message ":e}),delete this.queue[i])}))}}))}constructor(e={}){this.config=(e=>{const t=Object.assign({},L,e),n=t.url;if("/"==n[0])try{const e=location.protocol.includes("s:")?"wss":"ws";t.url=`${e}://${location.hostname}:${location.port}${n}`}catch(e){throw new Error("WSP: URL starting with / in non-browser environment!")}return t})(e),this.init_flush(),this.open=!1,this.reconnect_timeout=null,this.forcibly_closed=!1,this.config.lazy||this.connect()}}export{we as default};
