!function(t,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o(require("tiny-emitter"),require("virtual-scroll")):"function"==typeof define&&define.amd?define(["tiny-emitter","virtual-scroll"],o):(t||self).lenis=o(t.tinyEmitter,t.virtualScroll)}(this,function(t,o){function i(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=/*#__PURE__*/i(t),r=/*#__PURE__*/i(o);function l(t,o){return l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},l(t,o)}/*#__PURE__*/
return function(t){var o,i;function e(o){var i,e,l,n,s=void 0===o?{}:o,c=s.lerp,d=void 0===c?.1:c,h=s.smooth,a=void 0===h||h,u=s.direction,f=void 0===u?"vertical":u;(n=t.call(this)||this).onResize=function(t){var o=t[0];if(o){var i=o.contentRect;n.limit="horizontal"===n.direction?i.width-n.windowWidth:i.height-n.windowHeight}},n.onWindowResize=function(){n.windowHeight=window.innerHeight,n.windowWidth=window.innerWidth},n.onVirtualScroll=function(t){var o=t.deltaY,i=t.originalEvent;n.stopped?i.preventDefault():(n.smooth&&!i.ctrlKey&&i.preventDefault(),n.targetScroll-=o,n.targetScroll=Math.max(0,Math.min(n.targetScroll,n.limit)))},n.onScroll=function(t){if(!(n.stopped||n.scrolling&&n.smooth)){var o=n.scroll;n.targetScroll=n.scroll="horizontal"===n.direction?window.scrollX:window.scrollY,n.velocity=n.scroll-o,n.notify()}},n.lerp=d,n.smooth=a,n.direction=f,window.addEventListener("scroll",n.onScroll,!1),window.addEventListener("resize",n.onWindowResize,!1);var v=(null==(i=navigator)||null==(e=i.userAgentData)?void 0:e.platform)||(null==(l=navigator)?void 0:l.platform)||"unknown";return n.virtualScroll=new r.default({firefoxMultiplier:50,mouseMultiplier:v.indexOf("Win")>-1?1:.4,useKeyboard:!1,useTouch:!1,passive:!1}),n.virtualScroll.on(n.onVirtualScroll),n.onWindowResize(),n.limit="horizontal"===n.direction?document.body.offsetWidth-n.windowWidth:document.body.offsetHeight-n.windowHeight,n.resizeObserver=new ResizeObserver(n.onResize),n.resizeObserver.observe(document.body),n.targetScroll=n.scroll="horizontal"===n.direction?window.scrollX:window.scrollY,n.velocity=0,n}i=t,(o=e).prototype=Object.create(i.prototype),o.prototype.constructor=o,l(o,i);var n=e.prototype;return n.start=function(){this.stopped=!1},n.stop=function(){this.stopped=!0},n.destroy=function(){window.removeEventListener("scroll",this.onScroll,!1),window.removeEventListener("resize",this.onWindowResize,!1),this.virtualScroll.destroy(),this.resizeObserver.disconnect()},n.raf=function(){if(!this.stopped&&this.smooth){var t,o=this.scroll;this.scroll=(1-(t=this.lerp))*this.scroll+t*this.targetScroll,Math.round(this.scroll)===Math.round(this.targetScroll)&&(this.scroll=o=this.targetScroll),this.velocity=this.scroll-o,this.scrolling&&("horizontal"===this.direction?window.scrollTo(this.scroll,0):window.scrollTo(0,this.scroll),this.notify()),this.scrolling=this.scroll!==this.targetScroll}},n.notify=function(){this.emit("scroll",{scroll:this.scroll,limit:this.limit,velocity:this.velocity,direction:this.direction})},n.scrollTo=function(t,o){var i,e=(void 0===o?{}:o).offset,r=void 0===e?0:e;if("number"==typeof t)i=t;else if("top"===t)i=0;else if("bottom"===t)i=this.limit;else{var l;if("string"==typeof t)l=document.querySelector(t);else{if(null==t||!t.nodeType)return;l=t}if(!t)return;var n=l.getBoundingClientRect();i=("horizontal"===this.direction?n.left:n.top)+this.scroll}this.targetScroll=i+=r,this.scrolling=!0,this.smooth||(this.scroll=i,"horizontal"===this.direction?window.scrollTo(this.scroll,0):window.scrollTo(0,this.scroll))},e}(e.default)});
//# sourceMappingURL=lenis.umd.js.map
