var __assign=function(){return __assign=Object.assign||function __assign(t){for(var e,i=1,o=arguments.length;i<o;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},__assign.apply(this,arguments)};"function"==typeof SuppressedError&&SuppressedError;function clamp(t,e,i){return Math.max(t,Math.min(e,i))}class Animate{advance(t){if(!this.isRunning)return;let e=!1;if(this.lerp)this.value=function damp(t,e,i,o){return function lerp(t,e,i){return(1-i)*t+i*e}(t,e,1-Math.exp(-i*o))}(this.value,this.to,60*this.lerp,t),Math.round(this.value)===this.to&&(this.value=this.to,e=!0);else{this.currentTime+=t;const i=clamp(0,this.currentTime/this.duration,1);e=i>=1;const o=e?1:this.easing(i);this.value=this.from+(this.to-this.from)*o}this.onUpdate?.(this.value,e),e&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i=.1,duration:o=1,easing:s=(t=>t),onStart:n,onUpdate:r}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=o,this.easing=s,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=r}}class Dimensions{constructor({wrapper:t,content:e,autoResize:i=!0,debounce:o=250}={}){this.wrapper=t,this.content=e,i&&(this.debouncedResize=function debounce(t,e){let i;return function(){let o=arguments,s=this;clearTimeout(i),i=setTimeout((function(){t.apply(s,o)}),e)}}(this.resize,o),this.wrapper===window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),window.removeEventListener("resize",this.debouncedResize,!1)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper===window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class Emitter{constructor(){this.events={}}emit(t,...e){let i=this.events[t]||[];for(let t=0,o=i.length;t<o;t++)i[t](...e)}on(t,e){return this.events[t]?.push(e)||(this.events[t]=[e]),()=>{this.events[t]=this.events[t]?.filter((t=>e!==t))}}off(t,e){this.events[t]=this.events[t]?.filter((t=>e!==t))}destroy(){this.events={}}}const t=100/6;class VirtualScroll{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=1}){this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.touchStart={x:null,y:null},this.emitter=new Emitter,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}onTouchStart=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})};onTouchMove=t=>{const{clientX:e,clientY:i}=t.targetTouches?t.targetTouches[0]:t,o=-(e-this.touchStart.x)*this.touchMultiplier,s=-(i-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=e,this.touchStart.y=i,this.lastDelta={x:o,y:s},this.emitter.emit("scroll",{deltaX:o,deltaY:s,event:t})};onTouchEnd=t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})};onWheel=e=>{let{deltaX:i,deltaY:o,deltaMode:s}=e;i*=1===s?t:2===s?this.windowWidth:1,o*=1===s?t:2===s?this.windowHeight:1,i*=this.wheelMultiplier,o*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:o,event:e})};onWindowResize=()=>{this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight}}var e=function(){function Lenis(t){var e=void 0===t?{}:t,i=e.wrapper,o=void 0===i?window:i,s=e.content,n=void 0===s?document.documentElement:s,r=e.wheelEventsTarget,l=void 0===r?o:r,h=e.eventsTarget,a=void 0===h?l:h,c=e.smoothWheel,p=void 0===c||c,u=e.syncTouch,d=void 0!==u&&u,m=e.syncTouchLerp,v=void 0===m?.075:m,g=e.touchInertiaMultiplier,f=void 0===g?35:g,S=e.duration,w=e.easing,y=void 0===w?function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}:w,b=e.lerp,L=void 0===b?!S&&.1:b,_=e.infinite,z=void 0!==_&&_,E=e.orientation,T=void 0===E?"vertical":E,M=e.gestureOrientation,R=void 0===M?"vertical":M,O=e.touchMultiplier,W=void 0===O?1:O,x=e.wheelMultiplier,H=void 0===x?1:x,N=e.autoResize,k=void 0===N||N,C=e.__experimental__naiveDimensions,j=void 0!==C&&C,P=this;this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=function(t){var e=t.deltaX,i=t.deltaY,o=t.event;if(!o.ctrlKey){var s=o.type.includes("touch"),n=o.type.includes("wheel");if(P.options.syncTouch&&s&&"touchstart"===o.type&&!P.isStopped&&!P.isLocked)P.reset();else{var r=0===e&&0===i,l="vertical"===P.options.gestureOrientation&&0===i||"horizontal"===P.options.gestureOrientation&&0===e;if(!r&&!l){var h=o.composedPath();if(!(h=h.slice(0,h.indexOf(P.rootElement))).find((function(t){var e,i,o,r,l;return(null===(e=t.hasAttribute)||void 0===e?void 0:e.call(t,"data-lenis-prevent"))||s&&(null===(i=t.hasAttribute)||void 0===i?void 0:i.call(t,"data-lenis-prevent-touch"))||n&&(null===(o=t.hasAttribute)||void 0===o?void 0:o.call(t,"data-lenis-prevent-wheel"))||(null===(r=t.classList)||void 0===r?void 0:r.contains("lenis"))&&!(null===(l=t.classList)||void 0===l?void 0:l.contains("lenis-stopped"))})))if(P.isStopped||P.isLocked)o.preventDefault();else{if(P.isSmooth=P.options.syncTouch&&s||P.options.smoothWheel&&n,!P.isSmooth)return P.isScrolling=!1,void P.animate.stop();o.preventDefault();var a=i;"both"===P.options.gestureOrientation?a=Math.abs(i)>Math.abs(e)?i:e:"horizontal"===P.options.gestureOrientation&&(a=e);var c=s&&P.options.syncTouch,p=s&&"touchend"===o.type&&Math.abs(a)>5;p&&(a=P.velocity*P.options.touchInertiaMultiplier),P.scrollTo(P.targetScroll+a,__assign({programmatic:!1},c?{lerp:p?P.options.syncTouchLerp:1}:{lerp:P.options.lerp,duration:P.options.duration,easing:P.options.easing}))}}}}},this.onNativeScroll=function(){if(!P.__preventNextScrollEvent&&!P.isScrolling){var t=P.animatedScroll;P.animatedScroll=P.targetScroll=P.actualScroll,P.velocity=0,P.direction=Math.sign(P.animatedScroll-t),P.emit()}},window.lenisVersion="1.0.45-dev.1",o!==document.documentElement&&o!==document.body||(o=window),this.options={wrapper:o,content:n,wheelEventsTarget:l,eventsTarget:a,smoothWheel:p,syncTouch:d,syncTouchLerp:v,touchInertiaMultiplier:f,duration:S,easing:y,lerp:L,infinite:z,gestureOrientation:R,orientation:T,touchMultiplier:W,wheelMultiplier:H,autoResize:k,__experimental__naiveDimensions:j},this.animate=new Animate,this.emitter=new Emitter,this.dimensions=new Dimensions({wrapper:o,content:n,autoResize:k}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=d||p,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll=new VirtualScroll(a,{touchMultiplier:W,wheelMultiplier:H}),this.virtualScroll.on("scroll",this.onVirtualScroll)}return Lenis.prototype.destroy=function(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)},Lenis.prototype.on=function(t,e){return this.emitter.on(t,e)},Lenis.prototype.off=function(t,e){return this.emitter.off(t,e)},Lenis.prototype.setScroll=function(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t},Lenis.prototype.resize=function(){this.dimensions.resize()},Lenis.prototype.emit=function(){this.emitter.emit("scroll",this)},Lenis.prototype.reset=function(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()},Lenis.prototype.start=function(){this.isStopped&&(this.isStopped=!1,this.reset())},Lenis.prototype.stop=function(){this.isStopped||(this.isStopped=!0,this.animate.stop(),this.reset())},Lenis.prototype.raf=function(t){var e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)},Lenis.prototype.scrollTo=function(t,e){var i=this,o=void 0===e?{}:e,s=o.offset,n=void 0===s?0:s,r=o.immediate,l=void 0!==r&&r,h=o.lock,a=void 0!==h&&h,c=o.duration,p=void 0===c?this.options.duration:c,u=o.easing,d=void 0===u?this.options.easing:u,m=o.lerp,v=void 0===m?!p&&this.options.lerp:m,g=o.onComplete,f=o.force,S=void 0!==f&&f,w=o.programmatic,y=void 0===w||w;if(!this.isStopped&&!this.isLocked||S){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var b=void 0;if("string"==typeof t?b=document.querySelector(t):(null==t?void 0:t.nodeType)&&(b=t),b){if(this.options.wrapper!==window){var L=this.options.wrapper.getBoundingClientRect();n-=this.isHorizontal?L.left:L.top}var _=b.getBoundingClientRect();t=(this.isHorizontal?_.left:_.top)+this.animatedScroll}}if("number"==typeof t){if(t+=n,t=Math.round(t),this.options.infinite?y&&(this.targetScroll=this.animatedScroll=this.scroll):t=clamp(0,t,this.limit),l)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(null==g||g(this));if(!y){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:p,easing:d,lerp:v,onStart:function(){a&&(i.isLocked=!0),i.isScrolling=!0},onUpdate:function(t,e){i.isScrolling=!0,i.velocity=t-i.animatedScroll,i.direction=Math.sign(i.velocity),i.animatedScroll=t,i.setScroll(i.scroll),y&&(i.targetScroll=t),e||i.emit(),e&&(i.reset(),i.emit(),null==g||g(i),i.__preventNextScrollEvent=!0,requestAnimationFrame((function(){delete i.__preventNextScrollEvent})))}})}}},Object.defineProperty(Lenis.prototype,"rootElement",{get:function(){return this.options.wrapper===window?document.documentElement:this.options.wrapper},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"limit",{get:function(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"isHorizontal",{get:function(){return"horizontal"===this.options.orientation},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"actualScroll",{get:function(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"scroll",{get:function(){return this.options.infinite?function modulo(t,e){return(t%e+e)%e}(this.animatedScroll,this.limit):this.animatedScroll},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"progress",{get:function(){return 0===this.limit?1:this.scroll/this.limit},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"isSmooth",{get:function(){return this.__isSmooth},set:function(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"isScrolling",{get:function(){return this.__isScrolling},set:function(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"isStopped",{get:function(){return this.__isStopped},set:function(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"isLocked",{get:function(){return this.__isLocked},set:function(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))},enumerable:!1,configurable:!0}),Object.defineProperty(Lenis.prototype,"className",{get:function(){var t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t},enumerable:!1,configurable:!0}),Lenis.prototype.toggleClassName=function(t,e){this.rootElement.classList.toggle(t,e),this.emitter.emit("className change",this)},Lenis}();export{e as default};
//# sourceMappingURL=lenis.mjs.map