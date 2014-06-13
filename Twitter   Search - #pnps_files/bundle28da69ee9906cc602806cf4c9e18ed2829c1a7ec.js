/**
 * almond 0.2.5 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/*! matches.js v1.0.3 - Nicolas Gallagher - MIT license */

/*! delegate.js v1.0.2 - Nicolas Gallagher - MIT license */

/*!
 * xdm.js – Nicolas Gallagher – MIT License
 * easyXDM – Copyright(c) 2009-2011, Øyvind Sean Kinsey, oyvind@kinsey.no – MIT License
 */

!function(){var e,t,n;!function(o){function r(e,t){return b.call(e,t)}function i(e,t){var n,o,r,i,a,c,s,u,l,d,f=t&&t.split("/"),p=v.map,m=p&&p["*"]||{};if(e&&"."===e.charAt(0))if(t){for(f=f.slice(0,f.length-1),e=f.concat(e.split("/")),u=0;u<e.length;u+=1)if(d=e[u],"."===d)e.splice(u,1),u-=1;else if(".."===d){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((f||m)&&p){for(n=e.split("/"),u=n.length;u>0;u-=1){if(o=n.slice(0,u).join("/"),f)for(l=f.length;l>0;l-=1)if(r=p[f.slice(0,l).join("/")],r&&(r=r[o])){i=r,a=u;break}if(i)break;!c&&m&&m[o]&&(c=m[o],s=u)}!i&&c&&(i=c,a=s),i&&(n.splice(0,a,i),e=n.join("/"))}return e}function a(e,t){return function(){return p.apply(o,x.call(arguments,0).concat([e,t]))}}function c(e){return function(t){return i(t,e)}}function s(e){return function(t){g[e]=t}}function u(e){if(r(y,e)){var t=y[e];delete y[e],w[e]=!0,f.apply(o,t)}if(!r(g,e)&&!r(w,e))throw new Error("No "+e);return g[e]}function l(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function d(e){return function(){return v&&v.config&&v.config[e]||{}}}var f,p,m,h,g={},y={},v={},w={},b=Object.prototype.hasOwnProperty,x=[].slice;m=function(e,t){var n,o=l(e),r=o[0];return e=o[1],r&&(r=i(r,t),n=u(r)),r?e=n&&n.normalize?n.normalize(e,c(t)):i(e,t):(e=i(e,t),o=l(e),r=o[0],e=o[1],r&&(n=u(r))),{f:r?r+"!"+e:e,n:e,pr:r,p:n}},h={require:function(e){return a(e)},exports:function(e){var t=g[e];return"undefined"!=typeof t?t:g[e]={}},module:function(e){return{id:e,uri:"",exports:g[e],config:d(e)}}},f=function(e,t,n,i){var c,l,d,f,p,v,b=[];if(i=i||e,"function"==typeof n){for(t=!t.length&&n.length?["require","exports","module"]:t,p=0;p<t.length;p+=1)if(f=m(t[p],i),l=f.f,"require"===l)b[p]=h.require(e);else if("exports"===l)b[p]=h.exports(e),v=!0;else if("module"===l)c=b[p]=h.module(e);else if(r(g,l)||r(y,l)||r(w,l))b[p]=u(l);else{if(!f.p)throw new Error(e+" missing "+l);f.p.load(f.n,a(i,!0),s(l),{}),b[p]=g[l]}d=n.apply(g[e],b),e&&(c&&c.exports!==o&&c.exports!==g[e]?g[e]=c.exports:d===o&&v||(g[e]=d))}else e&&(g[e]=n)},e=t=p=function(e,t,n,r,i){return"string"==typeof e?h[e]?h[e](t):u(m(e,t).f):(e.splice||(v=e,t.splice?(e=t,t=n,n=null):e=o),t=t||function(){},"function"==typeof n&&(n=r,r=i),r?f(o,e,t,n):setTimeout(function(){f(o,e,t,n)},4),p)},p.config=function(e){return v=e,v.deps&&p(v.deps,v.callback),p},n=function(e,t,n){t.splice||(n=t,t=[]),r(g,e)||r(y,e)||(y[e]=[e,t,n])},n.amd={jQuery:!0}}(),n("almondLib",function(){}),function(e){function t(e,t){var n,o,a=e.parentNode;if(a||i||(a=document.createDocumentFragment(),a.appendChild(e)),r)return r.call(e,t);for(n=a.querySelectorAll(t),o=n.length;o--;)if(n[o]===e)return!0;return!1}var o=Element.prototype,r=o.matches||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector,i=function(){return r?r.call(document.createElement("a"),"a"):!1}();"object"==typeof exports?module.exports=t:"function"==typeof n&&n.amd?n("matches",[],function(){return t}):e.matches=t}(this),function(e){function o(e){function t(e){if(!o(e))throw new Error("delegate(): The argument must be an Element or Document Node");return r=e,t}function n(t,n,o){for(;n&&n!==t;){if(e(n,o))return n;n=n.parentElement}return null}function o(e){return e&&e.nodeName&&(3===e.nodeType||9===e.nodeType)?!0:!1}var r;return t.on=function(e,o,i,a,c){function s(a){(a.delegateTarget=n(r,a.target,o))&&(c===!0&&t(r).off(e,s),i.call(r,a))}return i._delegateWrapper=s,r.addEventListener(e,s,a||!1),i},t.once=function(e,n,o,r){t.on(e,n,o,r,!0)},t.off=function(e,t,n){t._delegateWrapper&&(t=t._delegateWrapper),r.removeEventListener(e,t,n||!1)},t}"object"==typeof exports?module.exports=o(t("matches")):"function"==typeof n&&n.amd?n("delegate",["matches"],o):e.delegate=o(e.matches)}(this),n("common/throttle",["require","exports","module"],function(e,t,n){n.exports=function(e,t){var n,o,r,i,a=0,c=function(){a=new Date,r=null,i=e.apply(n,o)};return function(){var s=new Date,u=t-(s-a);return n=this,o=arguments,0>=u?(clearTimeout(r),r=null,a=s,i=e.apply(n,o)):r||(r=setTimeout(c,u)),i}}}),function(e){function t(e){return"[object Array]"===Object.prototype.toString.call(e)}function o(e){return"undefined"==typeof e}function r(t){return e.xdm=E,b=t,b&&(k="xdm_"+b.replace(".","_")+"_"),x}function i(e){if(!e)throw new Error("url is undefined or empty");if(/^file/.test(e))throw new Error("The file:// protocol is not supported");var t=e.toLowerCase().match(y);if(t){var n=t[2],o=t[3],r=t[4]||"";return("http:"===n&&":80"===r||"https:"===n&&":443"===r)&&(r=""),n+"//"+o+r}return e}function a(e){if(!e)throw new Error("url is undefined or empty");if(e=e.replace(w,"$1/"),!e.match(/^(http||https):\/\//)){var t="/"===e.substring(0,1)?"":location.pathname;"/"!==t.substring(t.length-1)&&(t=t.substring(0,t.lastIndexOf("/")+1)),e=location.protocol+"//"+location.host+t+e}for(;v.test(e);)e=e.replace(v,"");return e}function c(e,t){if(!t)throw new Error("parameters is undefined or null");var n=e.indexOf("#"),o=[];for(var r in t)t.hasOwnProperty(r)&&o.push(r+"="+encodeURIComponent(t[r]));return e+(-1===n?"#":"&")+o.join("&")}function s(e,t,n){var o;for(var r in t)t.hasOwnProperty(r)&&(r in e?(o=t[r],"object"==typeof o?s(e[r],o,n):n||(e[r]=t[r])):e[r]=t[r]);return e}function u(e){var t=m.cloneNode(!1);if(s(e.props,{frameBorder:0,allowTRansparency:!0,scrolling:"no",width:"100%",src:c(e.remote,{xdm_e:i(location.href),xdm_c:e.channel,xdm_p:1}),name:k+e.channel+"_provider",style:{margin:0,padding:0,border:0}}),t.id=e.props.name,delete e.props.name,!e.container)throw new Error('xdm.Rpc() configuration object missing a DOM "container" property');return s(t,e.props),e.container.appendChild(t),e.onLoad&&T(t,"load",e.onLoad),e.html&&(t.contentWindow.document.open(),t.contentWindow.document.write(e.html),t.contentWindow.document.close()),e.iframe=t,t}function l(e,t){"string"==typeof e&&(e=[e]);for(var n,o=e.length;o--;)if(n=e[o],n=new RegExp("^"===n.substr(0,1)?n:"^"+n.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"),n.test(t))return!0;return!1}function d(e){var t;if(e.isHost=e.isHost||o(M.xdm_p),e.props=e.props||{},e.isHost)e.remote=a(e.remote),e.channel=e.channel||"default"+h++;else if(e.channel=M.xdm_c.replace(/["'<>\\]/g,""),e.remote=M.xdm_e.replace(/["'<>\\]/g,""),e.acl&&!l(e.acl,e.remote))throw new Error("Access denied for "+e.remote);return t=[new x.stack.PostMessageTransport(e)],t.push(new x.stack.QueueBehavior(!0)),t}function f(e){var t,n,o=e.length,r={incoming:function(e,t){this.up.incoming(e,t)},outgoing:function(e,t){this.down.outgoing(e,t)},callback:function(e){this.up.callback(e)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}};for(n=0;o>n;n++)t=e[n],s(t,r,!0),0!==n&&(t.down=e[n-1]),n!==o-1&&(t.up=e[n+1]);return t}function p(e){e.up.down=e.down,e.down.up=e.up,e.up=e.down=null}var m=document.createElement("IFRAME"),h=Math.floor(1e4*Math.random()),g=Function.prototype,y=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,v=/[\-\w]+\/\.\.\//,w=/([^:])\/\//g,b="",x={},E=e.xdm,k="xdm_",M=function(e){e=e.substring(1,e.length).split("&");for(var t,n={},o=e.length;o--;)t=e[o].split("="),n[t[0]]=decodeURIComponent(t[1]);return n}(location.hash),T=function(){return e.addEventListener?function(e,t,n){e.addEventListener(t,n,!1)}:function(e,t,n){e.attachEvent("on"+t,n)}}(),C=function(){return e.removeEventListener?function(e,t,n){e.removeEventListener(t,n,!1)}:function(e,t,n){e.detachEvent("on"+t,n)}}();s(x,{version:"1.0.0",query:M,stack:{},noConflict:r}),x.Rpc=function(e,t){var n;if(t.local)for(var o in t.local)t.local.hasOwnProperty(o)&&(n=t.local[o],"function"==typeof n&&(t.local[o]={method:n}));var r=f(d(e).concat([new x.stack.RpcBehavior(this,t),{callback:function(t){e.onReady&&e.onReady(t)}}]));this.origin=i(e.remote),this.destroy=function(){r.destroy()},r.init(),this.iframe=e.iframe},x.stack.PostMessageTransport=function(t){function n(e){var n=i(e.origin),r="string"==typeof e.data;n===c&&r&&e.data.substring(0,t.channel.length+1)===t.channel+" "&&o.up.incoming(e.data.substring(t.channel.length+1),n)}var o,r,a,c;return o={outgoing:function(e,n,o){a.postMessage(t.channel+" "+e,n||c),o&&o()},destroy:function(){C(e,"message",n),r&&(a=null,r.parentNode.removeChild(r),r=null)},init:function(){if(c=i(t.remote),t.isHost){var s=function(i){i.data===t.channel+"-ready"&&(a="postMessage"in r.contentWindow?r.contentWindow:r.contentWindow.document,C(e,"message",s),T(e,"message",n),setTimeout(function(){o.up.callback(!0)},0))};T(e,"message",s),r=u(t)}else T(e,"message",n),a="postMessage"in e.parent?e.parent:e.parent.document,a.postMessage(t.channel+"-ready",c),setTimeout(function(){o.up.callback(!0)},0)}}},x.stack.QueueBehavior=function(e){function t(){var a;return e===!0&&0===r.length?(p(n),void 0):(i||0===r.length||o||(i=!0,a=r.shift(),n.down.outgoing(a.data,a.origin,function(e){i=!1,a.callback&&setTimeout(function(){a.callback(e)},0),t()})),void 0)}var n,o,r=[],i=!0;return n={init:function(){n.down.init()},callback:function(e){i=!1;var o=n.up;t(),o.callback(e)},incoming:function(e,t){n.up.incoming(e,t)},outgoing:function(e,n,o){r.push({data:e,origin:n,callback:o}),t()},destroy:function(){o=!0,n.down.destroy()}}},x.stack.RpcBehavior=function(e,n){function r(e){e.jsonrpc="2.0",c.down.outgoing(JSON.stringify(e))}function i(e,t){var n=Array.prototype.slice;return function(){var o,i=arguments.length,a={method:t};i>0&&"function"==typeof arguments[i-1]?(i>1&&"function"==typeof arguments[i-2]?(o={success:arguments[i-2],error:arguments[i-1]},a.params=n.call(arguments,0,i-2)):(o={success:arguments[i-1]},a.params=n.call(arguments,0,i-1)),u[""+ ++s]=o,a.id=s):a.params=n.call(arguments,0),e.namedParams&&1===a.params.length&&(a.params=a.params[0]),r(a)}}function a(e,n,i,a){if(!i)return n&&r({id:n,error:{code:-32601,message:"Procedure not found."}}),void 0;var c,s;n?(c=function(e){c=g,r({id:n,result:e})},s=function(e,t){s=g;var o={id:n,error:{code:-32099,message:e}};t&&(o.error.data=t),r(o)}):c=s=g,t(a)||(a=[a]);try{var u=i.method.apply(i.scope,a.concat([c,s]));o(u)||c(u)}catch(l){s(l.message)}}var c,s=0,u={};return c={incoming:function(e){var t,o=JSON.parse(e);o.method?n.handle?n.handle(o,r):a(o.method,o.id,n.local[o.method],o.params):(t=u[o.id],o.error&&t.error?t.error(o.error):t.success&&t.success(o.result),delete u[o.id])},init:function(){if(n.remote)for(var t in n.remote)n.remote.hasOwnProperty(t)&&(e[t]=i(n.remote[t],t));c.down.init()},destroy:function(){for(var t in n.remote)n.remote.hasOwnProperty(t)&&e.hasOwnProperty(t)&&delete e[t];c.down.destroy()}}},"object"==typeof exports?module.exports=x:"function"==typeof provide?provide(x):"function"==typeof n&&n.amd?n("xdm",[],function(){return x}):e.xdm=x}(window),n("classic/interface",["require","exports","module","delegate","common/throttle","xdm"],function(e,t,n){function o(e){var t=this;t.hostMethods=null;var n=document.getElementById("config");if(n)try{u=window.CONFIG=JSON.parse(n.textContent||n.innerHTML)}catch(o){u.scribeData="error"}this.throttleHandleResize=a(this.handleResize,75),s=e||new c.Rpc({onReady:function(){s.localMethodNames(function(e){t.hostMethods=e,t.handleOnReady(t.hostMethods)})}},{local:{localMethodNames:function(){return{callVideoPlayerMethod:!0}},callVideoPlayerMethod:this.callVideoPlayerMethod.bind(this)},remote:{callMethodByName:{},followAdvertiser:{},localMethodNames:{},openLink:{},openPhoto:{},openProfile:{},resizeCard:{},statusComposeTweet:{},unfollowAdvertiser:{}}})}function r(e){return!(e.shiftKey||e.ctrlKey||e.metaKey||e.altKey||e.which>1)}var i=e("delegate"),a=e("common/throttle"),c=e("xdm");n.exports=o;var s,u={};o.prototype.teardown=function(){window.removeEventListener("load",this.handleResize,!1),window.removeEventListener("resize",this.throttleHandleResize,!1),i(document).off("click",this.handleStatusComposeTweet),i(document).off("click",this.handleOpenLink),i(document).off("click",this.handleOpenPhoto),i(document).off("click",this.handleOpenProfile),s.destroy&&s.destroy()},o.prototype.handleOnReady=function(e){e&&(e.statusComposeTweet&&i(document).on("click",".js-statusComposeTweet",this.handleStatusComposeTweet),e.openLink&&i(document).on("click",".js-openLink",this.handleOpenLink),e.openPhoto&&i(document).on("click",".js-openPhoto",this.handleOpenPhoto),e.openProfile&&i(document).on("click",".js-openProfile",this.handleOpenProfile),e.resizeCard&&(this.handleResize(),window.addEventListener("load",this.handleResize,!1),window.addEventListener("resize",this.throttleHandleResize,!1)))},o.prototype.handleStatusComposeTweet=function(e){var t=e.delegateTarget.getAttribute("data-tweet-text");r(e)&&(s.statusComposeTweet({tweetText:t,scribeData:u.scribeData}),e.preventDefault())},o.prototype.handleOpenLink=function(e){var t=e.delegateTarget.getAttribute("href");s.openLink({url:t,scribeData:u.scribeData})},o.prototype.handleOpenPhoto=function(e){var t,n,o,i=document.querySelector(".js-openGallery"),a={photos:[]};if(i){t=document.querySelectorAll(".js-openPhoto"),o=t.length;for(var c=0;o>c;c++)n=t[c],a.photos[c]={imageUrl:n.getAttribute("href"),wasClicked:n===e.delegateTarget}}else a.photos.push({imageUrl:e.delegateTarget.getAttribute("href"),wasClicked:!0});a.scribeData=u.scribeData,r(e)&&(s.openPhoto(a),e.preventDefault())},o.prototype.handleOpenProfile=function(e){var t=e.delegateTarget.getAttribute("data-user-id"),n=e.delegateTarget.getAttribute("data-screen-name");r(e)&&(s.openProfile({userId:t,userScreenName:n,scribeData:u.scribeData}),e.preventDefault())},o.prototype.handleResize=function(){var e=e||0,t=t||0,n=document.documentElement,o=document.getElementById("Container"),r=o.offsetHeight,i=o.offsetWidth,a=560;r!==e&&(s.resizeCard({height:r+"px"}),e=r),i!==t&&(320>i&&""!==n.className?n.className="":i>=320&&a>i?n.className="mq-medium":i>=a&&(n.className="mq-medium mq-wide"),t=i)},o.prototype.attachVideoInterface=function(e){this.videoInterface=e},o.prototype.callVideoPlayerMethod=function(){return this.videoInterface?this.videoInterface.callMethodByName.apply(this.videoInterface,arguments):void 0},o.prototype.callVideoHostMethod=function(){return this.hostMethods&&this.hostMethods.callMethodByName?s.callMethodByName.apply(s,arguments):void 0}}),n("unification/logger",["require","exports","module"],function(e,t,n){function o(e){return function(){if(window.DEBUG){var t=Array.prototype.slice.apply(arguments);t.unshift(e),console.log.apply(console,t)}}}n.exports=o}),n("common/utils",["require","exports","module","unification/logger"],function(e,t,n){var o=e("unification/logger")("[UTILS]"),r={getConfigFromJsonIn:function(e){var t,n=document.getElementById(e),r=null;if(!n)return console.warn(["Element with id",e,"not found"].join(" ")),r;t=n.innerHTML;try{r=JSON.parse(t)}catch(i){o(["Error while parsing json in element",e].join(" "),i)}return r},isEmpty:function(e){return!r.isDefined(e)||"string"==typeof e&&0===e.length},isDefined:function(e){return"undefined"!=typeof e&&null!==e},isObject:function(e){return r.isDefined(e)&&"object"==typeof e},toArray:function(e){return Array.prototype.slice.call(e,0)},escapeHtml:function(e){var t=document.createElement("div");return t.appendChild(document.createTextNode(e)),t.innerHTML},decodeHtml:function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0].nodeValue},trigger:function(e,t){var n=new Event(t);e.dispatchEvent(n)},getFollowElements:function(e){for(var t,n=e&&e.target;!n.dataset.userId;)n=n.parentElement;return t=n.dataset.userId,r.fetchTargetElement("data-user-id",t)},fetchTargetElement:function(e,t){var n="*["+e+'="'+t+'"]';return r.toArray(document.querySelectorAll(n))},createUrl:function(e,t){var n=e;n+=-1!==n.indexOf("?")?"&":"?";for(var o in t)n=n+encodeURIComponent(o)+"="+encodeURIComponent(t[o])+"&";return n.substr(0,n.length-1)}};n.exports=r}),n("common/video-interface-manager",["require","exports","module","delegate","xdm","common/utils"],function(e,t,n){function o(){var e=l.getConfigFromJsonIn("video-config"),t="";return"undefined"!=typeof e&&null!==e&&(t=l.createUrl(e.video_player_url,e.params)),t}function r(){return document.getElementsByClassName("VideoContainer")}function i(){var e=document.getElementById("ExternalIframeContainer");return e&&e.className.match(/\bAmplifyContainer\b/)?e:void 0}function a(e,t,n){return new u.Rpc({remote:t,container:e,isHost:!0},{local:{callVideoHostMethod:n.callVideoHostMethod.bind(n)}})}function c(e){for(var t,n,i,c,s=r(),u=0;u<s.length;u++)t=s[u],n={vmap_url:t.getAttribute("data-src"),image_src:t.getAttribute("data-thumbnail"),content_id:t.getAttribute("data-content-id"),type:t.getAttribute("data-type")},c=l.createUrl(o(),n),i=a(t,c,e),e.attachVideoInterface(i)}function s(e){var t,n,o=i();o&&(t=o.getAttribute("data-player-url"),n=a(o,t,e),e.attachVideoInterface(n))}e("delegate");var u=e("xdm"),l=e("common/utils"),d={init:function(e){c(e),s(e)},isSupported:function(){var e=r(),t=i();return e.length>0||"undefined"!=typeof t}};n.exports=d}),n("classic/flex-embed",["require","exports","module"],function(e,t,n){n.exports=function(){var e,t,n=document.getElementById("ExternalIframeContainer");n&&(e=n.getAttribute("data-iframe-height"),t=n.getAttribute("data-iframe-width"),n.style.paddingBottom=100*e/t+"%")}}),e.config({baseUrl:"/lib/js",paths:{delegate:"../bower_components/delegate.js/delegate",matches:"../bower_components/matches.js/matches",xdm:"../bower_components/xdm.js/xdm"}}),t(["classic/interface","common/video-interface-manager","classic/flex-embed"],function(e,t,n){var o=new e;t.isSupported()&&t.init(o),n()}),n("main",function(){})}();