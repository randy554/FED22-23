var Pastease=function(){var a,n,k,s=document.location.protocol+"//deploy.mopinion.com",o=!1,E=["passive","proactive","exit"],v=!1,r=!1,_="1.3",O="survey.min",I=!1,t=!1,g=!1,T=!1,C={},A={},S=[],N=null;function M(e,t,n){return String(t).replace(/\["|\['|\[/g,".").replace(/"]|']|]/g,"").split(".").reduce(function(e,t){try{var o=t.replace(/[()]/g,"");e="function"==typeof e[o]?e[o]():e[o]}catch(e){return n}return e},e)}return{load:function(e){Pastease.debug(),k?Pastease.log("Already initialized id "+e):(k=e,Pastease.log("loading Pastea.se "+e),v&&Pastease.jquery(),Pastease.config(e))},config:function(e){var t="/config/"+e,o={},e=Pastease.parse;v||r?Pastease.send(t,o,e,"get"):Pastease.sendXML(t,o,e,"get")},parse:function(o,e,t){try{o=JSON.parse(o)}catch(e){Pastease.log(e)}if(!o.OK)return Pastease.log("Status not OK!"),!1;if(o.code&&o.global&&(Pastease.log("Global settings:"),Pastease.log("service: "+o.global.service),Pastease.log("version: "+o.global.version),"mopinion"==o.global.service&&o.global.version&&(_=o.global.version)),!("code"in o&&200==o.code&&"deployment"in o&&"rules"in o.deployment)){Pastease.log("code: "+o.code),Pastease.log(JSON.stringify(o)),k="";n=[];return!1}var n=o.deployment.rules;if(void 0===o||null==o||"published"in o.deployment&&!o.deployment.published)return Pastease.log("Not published!"),!1;if("version"in o.deployment&&(_=o.deployment.version,Pastease.log("MOPINION VERSION customized to "+_)),"file"in o.deployment&&(O=o.deployment.file,Pastease.log("MOPINION FILE customized to "+O)),"local_file"in o.deployment&&(N=o.deployment.local_file,Pastease.log("MOPINION FILE local: "+N)),"use_collect"in o.deployment&&(I=o.deployment.use_collect,Pastease.log("Use collect as survey host "+I)),0==n.length)return!1;for(var a,i,s=0;s<n.length;s++){if(Pastease.log("============================"),Pastease.log("---RULE "+s),Pastease.log(JSON.stringify(n[s])),!("if"in n[s]&&"then"in n[s]))return!1;"id"in n[s]&&null!=n[s].id&&(a=n[s].id),Pastease.log("RULE ID: "+a),i="show_form"in n[s]?n[s].show_form:null,"debug"in n[s]&&n[s].debug&&(T=!0);for(var r=n[s].if,l=n[s].then,c=0;c<r.length;c++){Pastease.log("-----------------------"),Pastease.log("if rule "+c);var u=r[c];Pastease.log("condition: "+JSON.stringify(u));var d=!1,g=null;if("session"in u)try{g=Number(u.session)}catch(e){}Pastease.log("Condition session "+g+" days"),Pastease.testCondition(u,c,a,t,l).condition&&(d=!0);for(var v=[],m=0;m<l.length;m++){var f=l[m];if(!("service"in f&&"args"in f))return!1;-1==S.indexOf(f.service)&&d?(S.push(f.service),v.push(Pastease.services(f))):-1<S.indexOf(f.service)&&d&&"mopinion"===f.service&&v.push(Pastease.services(f,!0))}if(d)e&&A.hasOwnProperty(a)?Pastease.log("Just updating... Rule id: "+a+" still ok."):(A.hasOwnProperty(a)||(A[a]={}),A[a]["rule_"+c]={rules:n[s]},Pastease.log("All OK!"),p=function(){for(var e=0;e<v.length;e++)v[e](),Pastease.log("basic code: "+v[e]);var t=Pastease.triggers(f,f.args,r[c].trigger,r[c].percentage,r[c].time,g,i,r[c].time_in_session,!1,a,r[c],o,"rule_"+c);t(),Pastease.log("trigger code: "+t),Pastease.log("triggered!")});else{var p=function(){};Pastease.log("not all OK..."),Pastease.log("Rule id: "+a+" not ok");if(A.hasOwnProperty(a)&&A[a]["rule_"+c]&&(A[a]["rule_"+c].hasOwnProperty("timeout")&&clearTimeout(A[a]["rule_"+c].timeout),A[a]["rule_"+c].hasOwnProperty("scroll")&&"function"==typeof A[a]["rule_"+c].scroll&&Pastease.listeners().removeListener(window,"scroll",A[a]["rule_"+c].scroll),A[a]["rule_"+c].hasOwnProperty("exit")&&"function"==typeof A[a]["rule_"+c].exit&&Pastease.listeners().removeListener(document.getElementsByTagName("html")[0],"mouseleave",A[a]["rule_"+c].exit),(!A[a]["rule_"+c].triggered||t||function(){try{var e=f.args[0],e=M(srv,"manager."+e+".state",{});return!e.formOpen||"embed"===e.formType}catch(e){}return!1}())&&(delete A[a]["rule_"+c],!Object.keys(A[a]).length))){var P,h=!0;for(P in A){var y,w=A[P];for(y in w){var b=w[y];if(y!==a&&b.initialized&&!t){var x="";try{x=b.rules.then[0].args[0]}catch(e){}x==f.args[0]&&(h=!1)}}}h&&Pastease.clearService(f.service,f.args),delete A[a]}}d&&Pastease.run(p,!0,!1)}}C.set||Pastease.reparse(o)},reparse:function(t){C.set=!0;var e=Pastease.debounce(function(e){Pastease.parse(t,!0,e)},500);C.forceReparse=function(){e()},C.mopinionShown=Pastease.listeners().addListener(document,"mopinion_shown",function(){e()}),C.mopinionHidden=Pastease.listeners().addListener(document,"mopinion_hidden",function(){e()}),C.mopinionLoaded=Pastease.listeners().addListener(document,"mopinion_loaded",function(){e()}),n=n||document.location.href;var o=setInterval(function(){document.location.href!==n&&(n=document.location.href,e(!0))},500);C.pollURL=o},forceParse:function(){if(C&&"function"==typeof C.forceReparse)return C.forceReparse()},testCondition:function(e,t,o,n,a){if(Pastease.log("-----------------------"),"trigger"in e&&!(E.indexOf(e.trigger)<0)||Pastease.log("WARNING: no trigger!"),"pause"in e&&e.pause)return Pastease.log("Condition paused"),!1;function i(e){var t=!1;try{document.querySelector(e)&&(t=!0)}catch(e){}return t}var s,r,l=!0;a&&a instanceof Array&&"object"==typeof a[0]&&a[0].disableMakeDiv&&a[0].args&&a[0].args[2]&&(_=Pastease.getSelector(a[0].args[2]),(l=i(_))||C[o]||(s=0,r=_,C[o]=setInterval(function(){i(r)&&(clearInterval(C[o]),Pastease.log(r+" found, rechecking rules"),Pastease.forceParse()),120===s&&clearInterval(C[o]),s+=1},500))),Pastease.log("Render div: "+l);function c(e,t){if(t=t||"location","string"==typeof e&&(e={value:e}),"object"==typeof e&&"value"in e){var o;o="operator"in e&&-1<["exists","does not exist"].indexOf(e.operator)?e.operator:"exists";var n="boolean"!=typeof e.regex||e.regex;return Pastease.searchLocation(e.value,!1,o,n,t)}return!0}var u=!0;"location"in e&&0<e.location.length&&(O=e.location.every(function(e){return e instanceof Array?e.every(function(e){return"does not exist"===e.operator}):"object"==typeof e?"does not exist"===e.operator:void 0})?"every":"some",u=e.location[O](function(e){if(e instanceof Array){var t=e.filter(function(e){return Boolean(e.value)});return 0===t.length?!1:t.every(function(e){return c(e,"location")})}return Boolean(e.value)&&c(e,"location")})),Pastease.log("location: "+u);var d=!0;if("referrer"in e&&0<e.referrer.length){d=!1,0==e.referrer.length&&(d=!0);for(var g=0;g<e.referrer.length;g++)if("object"==typeof e.referrer[g]){if(c(e.referrer[g],"referrer")){d=!0;break}}else if(Pastease.referrer(e.referrer[g],!1)){d=!0;break}}Pastease.log("referrer: "+d);function v(e){var t;return!("name"in e&&("value"in e||"operator"in e))||(null==(t="operator"in e&&-1<["exists","does not exist","contains","matches exactly","does not contain"].indexOf(e.operator)?e.operator:null)?Pastease.getCookie(e.name,!0)==e.value:"exists"==t?""!=Pastease.getCookie(e.name,!0):"does not exist"==t?""==Pastease.getCookie(e.name,!0):"matches exactly"==t?Pastease.getCookie(e.name,!0)==e.value:"contains"==t?null!=Pastease.getCookie(e.name,!0).match(e.value):"does not contain"==t?null==Pastease.getCookie(e.name,!0).match(e.value):void 0)}var m=!0;"cookie"in e&&0<e.cookie.length&&(m=e.cookie.some(function(e){return e instanceof Array?e.every(v):v(e)})),Pastease.log("cookie: "+m);function f(e){var t;return!("name"in e&&("value"in e||"operator"in e))||(t="operator"in e&&-1<["exists","does not exist","contains","matches exactly","does not contain","is boolean"].indexOf(e.operator)?e.operator:null,Pastease.jsVar(e.name,e.value,t))}var p=!0;"js"in e&&0<e.js.length&&(p=e.js.some(function(e){return e instanceof Array?e.every(f):f(e)})),Pastease.log("js: "+p);function P(e){var t;return!("name"in e&&("value"in e||"operator"in e))||(t="operator"in e&&-1<["exists","does not exist","contains","matches exactly","does not contain"].indexOf(e.operator)?e.operator:null,Pastease.cssSelector(e.name,e.value,t))}var h=!0;"css_selector"in e&&0<e.css_selector.length&&(h=e.css_selector.some(function(e){return e instanceof Array?e.every(P):P(e)})),Pastease.log("css_selector: "+h);var y=!0,y=!("number_of_pages"in e&&"check"in e.number_of_pages&&"amount"in e.number_of_pages)||Pastease.numberOfPages(e.number_of_pages.check,e.number_of_pages.amount,!1,o,"rule_"+t);Pastease.log("nr of pages: "+y+" for iteration "+t);var w=!0;if("devices"in e&&0<e.devices.length){for(var b=!1,x=Pastease.testDevice(),k=0;k<e.devices.length;k++)(!("desktop"!=e.devices[k]||x.phone||x.seven_inch||x.tablet)||"tablet"==e.devices[k]&&(!0===x.tablet||!0===x.seven_inch)||"mobile"==e.devices[k]&&!0===x.phone)&&(b=!0);w=b}Pastease.log("device: "+w);a=!0,a=!("type"in e&&-1<["new","returning"].indexOf(e.type))||Pastease.type(e.type,!1,o,"rule_"+t,e.session);Pastease.log("new/returning visitor: "+a);var _=!0;"date"in e&&"object"==typeof e.date&&(e.date.date&&-1<["earlier","exactly","later"].indexOf(e.date.operator)?_=Pastease.datetime("date",e.date.date,e.date.operator):e.date.date&&e.date.date2&&-1<["between"].indexOf(e.date.operator)&&(_=Pastease.datetime("date",e.date.date,e.date.operator,e.date.date2))),Pastease.log("Date: "+_);var O=!0;"clock"in e&&"object"==typeof e.clock&&(e.clock.time&&-1<["earlier","exactly","later"].indexOf(e.clock.operator)?O=Pastease.datetime("time",e.clock.time,e.clock.operator):e.clock.time&&e.clock.time2&&-1<["between"].indexOf(e.clock.operator)&&(O=Pastease.datetime("time",e.clock.time,e.clock.operator,e.clock.time2))),Pastease.log("Clock: "+O),t="scrollpos"in e&&"from"in e.scrollpos&&"px"in e.scrollpos;y=l&&u&&d&&m&&p&&y&&w&&a&&h&&_&&O,w=!0;return y&&"percentage"in e&&(a=e.session,h=isNaN(parseFloat(e.percentage,10))?100:parseFloat(e.percentage,10).toFixed(1),_="proactive"===e.trigger?"pro_active":e.trigger,(Pastease.getCookie("Pastease."+_+".chance",!1,o)&&-1===Pastease.getCookie("Pastease."+_+".chance",!1,o).indexOf("chance")&&1!=Pastease.getCookie("Pastease."+_+".activated",!1,o)||!Pastease.getCookie("Pastease."+_+".chance",!1,o))&&(O=Pastease.rnd(),Pastease.setCookie("Pastease."+_+".chance","chance"+O,a,"/",void 0,o),Pastease.setCookie("Pastease."+_+".activated",0,a,"/",void 0,o),Pastease.log(_+" condition set, random nr: "+O)),(Number(Pastease.getCookie("Pastease."+_+".chance",!1,o).replace("chance",""))>h||1==Pastease.getCookie("Pastease."+_+".activated",!1,o))&&(w=!1)),Pastease.log("Percentage: "+w),{condition:y&&w,scroll:t}},run:function(e,t){if(T)Pastease.log("DEBUG MODE, code will not be executed");else if(t=void 0!==t&&t)try{e()}catch(e){Pastease.log(e)}else e()},searchLocation:function(e,t,o,n,a){if(t=void 0===t||t)return'(document.location.host+document.location.pathname+location.search+location.hash).match("'+e+'") != null';t={location:document.location.host+document.location.pathname+location.search+location.hash,referrer:document.referrer.replace(/^(?:https?:\/\/)?(?:www\.)?/i,"")};if(n){n=e.replace(/\\/g,"").split("/");return"i"===n[n.length-1]&&(n=(""===n[0]?n.slice(1,-1):n.slice(0,-1)).join("/"),e=new RegExp(n,"i")),"exists"==o?null!=t[a].match(e):null==t[a].match(e)}return"exists"==o?-1<t[a].indexOf(e):t[a].indexOf(e)<0},referrer:function(e,t){return(t=void 0===t||t)?'(document.referrer).match("'+e+'") != null':null!=document.referrer.match(e)},jsVar:function(a,e,t){if(-1<a.indexOf("[*]")&&null!=t){var o=a.split("[*]"),i=o[0],s=o[1],o=M(window,i);if(!(o instanceof Array))return!1;o.some(function(e,t){var o,n=i+"["+t+"]"+s;try{o=M(window,n)}catch(e){}return void 0!==o&&(a=n),void 0!==o})}var n;try{n=M(window,a)}catch(e){}if(null==t)return void 0!==n&&n==e;switch(t){case"exists":return void 0!==n;case"does not exist":return void 0===n;case"matches exactly":return void 0!==n&&n==e;case"contains":return void 0!==n&&null!=String(n).match(e);case"does not contain":return void 0!==n&&null==String(n).match(e);case"is boolean":return"boolean"==typeof n&&String(n)===e}},cssSelector:function(e,t,o){if(!o)return!1;var n;try{n=document.querySelectorAll(e)}catch(e){}if("exists"===o){if(void 0!==n)return 0<n.length}else if("does not exist"===o){if(void 0!==n)return 0===n.length}else if("contains"===o){if(void 0!==n&&0<n.length)return t=t||"",((n=n[0]).textContent||n.innerText).match(new RegExp(t,"gi"))}else if("matches exactly"===o){if(void 0!==n&&0<n.length)return t==((n=n[0]).textContent||n.innerText).replace(/^\s+|\s+$/g,"")}else if("does not contain"===o)if(void 0!==n&&0<n.length)return t=t||"",!((n=n[0]).textContent||n.innerText).match(new RegExp(t,"gi"))},numberOfPages:function(e,t,o,n,a){return n=void 0===n?null:n,t=Number(t),e="min"==e?">":"max"==e?"<":null,count=""!=Pastease.getCookie("page_count",!1,n+a)?Number(Pastease.getCookie("page_count",!1,n+a)):0,(""==Pastease.getCookie("last_page",!1,n+a)||""!=Pastease.getCookie("last_page",!1,n+a)&&Pastease.getCookie("last_page",!1,n+a)!=document.location.pathname)&&(count+=1),Pastease.setCookie("last_page",document.location.pathname+document.location.hash,0,"/",void 0,n+a),Pastease.setCookie("page_count",count,0,"/",void 0,n+a),null==e||(">"==e?count>=t:"<"==e?count<=t:void 0)},type:function(e,t,o,n,a){t=void 0===t||t,o=void 0===o?null:o;function i(e){return Math.floor(e/1e3)}function s(e){Pastease.setCookie("Pastease.session",e,a,"/",void 0)}function r(){return i((new Date).getTime())-Number(Pastease.getCookie("Pastease.session"))<60}t=function(){return Pastease.getCookie("Pastease.session")||s(i((new Date).getTime())),1!=Pastease.getCookie("Pastease.returning")&&1!=Pastease.getCookie("Pastease.returning",!1,o+n)&&(r()?!!r()||void 0:(Pastease.setCookie("Pastease.returning",1),!1))};return C.sessionPoll||(C.sessionPoll=setInterval(function(){s(i((new Date).getTime()))},1e4)),"new"===e?t():!t()},datetime:function(e,t,o,n){if(e&&t&&o){function a(e,t){var o;return t&&(t=(o=e.split("/"))[0],o[0]=o[1],o[1]=t,e=o.join("-")),e=e?new Date(e):new Date,new Date(e.setHours(0,0,0,0)).getTime()}var i={earlier:function(e,t){return t<e},exactly:function(e,t){return e==t},later:function(e,t){return e<t},between:function(e,t,o){return i.later(e,o)&&i.earlier(t,o)}};if("date"==e)return"between"===o?i[o](a(t,!0),a(n,!0),a()):i[o](a(t,!0),a());if("time"==e){e=("0"+(e=new Date).getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2);return"between"===o?i[o](t,n,e):i[o](t,e)}}},scroll:function(t,o,n,a,i){t="undefined"!==t?t:"top";var s=isNaN(o);s&&(o=o.replace("%","")),o=parseInt(o);var r=!1,l=v?$(document).height():document.body.scrollHeight,c=v?$(window).height():window.innerHeight;return v?$(window).scroll(function(){r=Pastease.onScroll(event,t,o,n,s,r,l,c,a)}):(A[a][i].scroll=Pastease.debounce(function(e){Pastease.onScroll(e,t,o,n,s,r,l,c,a,i)},200),Pastease.listeners().addListener(window,"scroll",A[a][i].scroll)),"true"},onScroll:function(e,t,o,n,a,i,s,r,l,c){var u=v?$(window).scrollTop():(window.pageYOffset||document.scrollTop)-(document.clientTop||0),d=(u+r)/s*100,g=s-(u+r),s=100-d,r=Pastease.listeners();return Pastease.log("top: "+u),Pastease.log("top: "+d+" %"),Pastease.log("bottom: "+g),Pastease.log("bottom: "+s+" %"),Pastease.log("code loaded: "+i),"top"==t?!i&&(!a&&o<=u||a&&o<=d)&&(Pastease.run(n,!1),i=!0,r.removeListener(window,"scroll",A[l][c].scroll)):"bottom"==t&&!i&&(!a&&g<=o||a&&s<=o)&&(Pastease.run(n,!1),i=!0,r.removeListener(window,"scroll",A[l][c].scroll)),i},exit:function(e,n,t,o,a,i,s,r){t=void 0!==t&&null!=t?t:365,o=void 0!==o&&null!=o?o:"once",e=void 0!==e&&null!=e?e:0,a=void 0!==a?a:null,Pastease.log("Exit activated!");var l,c,u,d;v||(o=Pastease.listeners(),c=o.addListener,u=o.removeListener),v?$(document).mousemove(function(e){e=e||window.event,IE=!!document.all,mouseY=(IE,e.clientY),l=mouseY}):(d=function(e){e=e||window.event,IE=!!document.all,mouseY=(IE,e.clientY),Pastease.log("mouseY: "+mouseY),l=mouseY},c(document,"mousemove",d)),e=Pastease.outAtime(e,a,"Pastease.exit.timestamp",s,t),Pastease.log("trigger time: "+e);e=setTimeout(function(){var o;Pastease.log("waiting for exit..."),v?$(document).mouseleave(function(e){var t;l<=100&&Pastease.getExit()&&!g&&(t=l,setTimeout(function(){l===t?(g=!0,n(),Pastease.log("Oh no, left page...exit!")):Pastease.log("Re-entered window, dont exit yet..")},200))}):(o=document.getElementsByTagName("html")[0],A[s][r].exit=function(e){var t;Pastease.log("y : "+l),Pastease.log("y_min : 100"),Pastease.log("EXIT_ACTIVATED : "+g),l<=100&&Pastease.getExit()&&!g&&(t=l,setTimeout(function(){l===t?(g=!0,Pastease.log("exit code:"),Pastease.log(n),n(),Pastease.log("Oh no, left page...exit!"),u(o,"mousemove",A[s][r].exit),u(document,"mousemove",d)):Pastease.log("Re-entered window, dont exit yet..")},200))},c(o,"mouseleave",A[s][r].exit));try{A[s][r].initialized=!0}catch(e){}},e);return A[s][r].timeout=e,i?"Pastease.setExit();":Pastease.setExit},listeners:function(){var e,t=document.addEventListener?(e=function(e,t,o){return e.addEventListener(t,o,!1)},function(e,t,o){return e.removeEventListener(t,o,!1)}):(e=function(e,t,o){return e.attachEvent("on"+t,o)},function(e,t,o){return e.detachEvent("on"+t,o)});return{addListener:e,removeListener:t}},setExit:function(e){void 0===e&&(e=!0),t=!!e},getExit:function(){return t},passive:function(t,o,e,n,a,i,s,r){e=void 0!==e&&null!=e?e:365,t=void 0!==t?t:null,a=void 0!==a?a:null,s=void 0===s?null:s;n=void 0!==n&&null!=n?n:"once";return t=Pastease.outAtime(t,a,"Pastease.passive.timestamp",s,e),i=i?"var INIT_TIMER = setTimeout(function() { "+o+" }, "+t+"); ACTIVE_RULES[rule_id].timeout = INIT_TIMER;":function(){var e=setTimeout(function(){o();try{A[s][r].initialized=!0}catch(e){}},t);A[s][r].timeout=e},Pastease.log("service starting in "+t/1e3+" seconds..."),i},proActive:function(t,o,e,n,a,i,s,r){e=void 0!==e&&null!=e?e:365,t=void 0!==t?t:null,a=void 0!==a?a:null,s=void 0===s?null:s;n=void 0!==n&&null!=n?n:"once";return t=Pastease.outAtime(t,a,"Pastease.pro_active.timestamp",s,e),e=i?"var INIT_TIMER = setTimeout(function() { "+o+' Pastease.setCookie( "Pastease.pro_active.activated", 1, '+e+', "/", undefined, false ); }, '+t+"); ACTIVE_RULES[rule_id].timeout = INIT_TIMER;":function(){var e=setTimeout(function(){o();try{A[s][r].initialized=!0}catch(e){}},t);A[s][r].timeout=e},Pastease.log("service starting in "+t/1e3+" seconds..."),e},clearService:function(e,t){if("mopinion"==e){Pastease.log("Clearing form key "+t[0]+" from service Mopinion.");try{srv.clearForm(t[0])}catch(e){}}},getActive:function(){return A},getConfigID:function(){return k},outAtime:function(e,t,o,n,a){var i;return n=void 0===n?null:n,null!=t&&0!=t&&(i=Number(Pastease.getCookie(o,!1,n)),e=e&&t-i<e?e:t-i,Pastease.log("time_passed: "+i),Pastease.log("time: "+e),C["timePoll"+n]||0===e||(C["timePoll"+n]=setInterval(function(){var e=Number(Pastease.getCookie(o,!1,n))+1;Pastease.setCookie(o,e,a,"/",void 0,n)},1e3))),1e3*e},timestamp:function(){return Date.now||(Date.now=function(){return(new Date).getTime()}),Math.floor(Date.now()/1e3)},rnd:function(){return(100*Math.random()).toFixed(1).toString()},observer:function(){MutationObserver=window.MutationObserver||window.WebKitMutationObserver,new MutationObserver(function(e,t){Pastease.log(e,t),Pastease.stream("dom",{html:document.documentElement.innerHTML})}).observe(document,{subtree:!0,attributes:!0,characterData:!0,attributeOldValue:!0,characterDataOldValue:!0,attributeFilter:!0})},streamInfo:function(){$(document).mousemove(function(e){e=e||window.event,IE=!!document.all,mouseY=IE?(mouseX=event.clientX,event.clientY+document.body.scrollTop):(mouseX=e.pageX,e.pageY),Pastease.stream("mouse",{x:mouseX,y:mouseY})}),Pastease.observer(),Pastease.stream("dom",{html:document.documentElement.innerHTML})},stream:function(e,t){try{var o=a,n={id:Pastease.getId(),type:e,vars:t,agent:navigator.userAgent,host:document.location.host,protocol:document.location.protocol,resolution:{width:screen.width,height:screen.height},viewport:{width:Math.max(document.documentElement.clientWidth,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight,window.innerHeight||0)}};o.emit("json",n)}catch(e){Pastease.log("stream ERROR: "+e)}Pastease.log("stream: "+JSON.stringify(n))},getId:function(){var e=Pastease.getCookie("stream_id");if(e&&""!=e)return e;e=Pastease.randomString(30);return Pastease.setCookie("stream_id",e),e},debounce:function(n,a,i){var s,r=null;return function(){var e=this,t=arguments,o=i&&!r;return clearTimeout(r),r=setTimeout(function(){r=null,i||(s=n.apply(e,t))},a),o&&(s=n.apply(e,t)),s}},randomString:function(e){return Math.round(Math.pow(36,e+1)-Math.random()*Math.pow(36,e)).toString(36).slice(1)},getCookie:function(e,t,o){o=void 0===o?null:o,void 0===t&&(t=!1);var n=document.cookie.split(";"),a="",s="",r=!1;for(null==o||t||(e+="."+o),i=0;i<n.length;i++){if((a=n[i].split("="))[0].replace(/^\s+|\s+$/g,"")==e)return r=!0,1<a.length&&(s=unescape(a[1].replace(/^\s+|\s+$/g,""))),s;a=null}if(!r)return""},setCookie:function(e,t,o,n,a,i){i=void 0===i?null:i;var s=new Date;s.setTime(s.getTime()),o=o&&1e3*o*60*60*24,null!=i&&(e+="."+i);i=new Date(s.getTime()+o),s="https:"===window.location.protocol;document.cookie=e+"="+escape(t)+(o?";expires="+i.toGMTString():"")+(n?";path="+n:"")+(a?";domain="+a:"")+(s?";secure":"")},makeDiv:function(e){var t;document.getElementById(e)?Pastease.log("Div: "+e+" found, nothing inserted"):((t=document.createElement("div")).setAttribute("id",e),document.getElementsByTagName("body")[0].appendChild(t),Pastease.log("inserted div: "+e))},triggers:function(e,t,o,n,a,i,s,r,l,c,u,d,g){var v=e.service,m=e.useQuerySelectorAll;l=void 0===l||l,c=void 0===c?null:c,a=null==a?0:a,r=null==r?0:r;function f(o,n,a,i,e,t,s,r,l){function c(){var t;1==Pastease.getCookie("Pastease."+n+".activated",!1,i)&&!e||(t=setInterval(function(){var e={key:o,trigger_method:n.replace("_",""),cookie_expire:a,domain:r,divName:l,use_collect:I,useQuerySelectorAll:m};"passive"===n&&(e.showButton=!0),"exit"!==n&&"proactive"!==n||(e.openForm=!0);try{srv.open(e),"passive"!==n&&0!==a&&Pastease.setCookie("Pastease."+n+".activated",1,a,"/",void 0,i),clearInterval(t),A[i][g].triggered=!0,C["timePoll"+i]&&clearInterval(C["timePoll"+i])}catch(e){Pastease.log(e)}},150))}t?Pastease.scroll(t.from,t.px,c,i,g):c()}var e="",p="object"==typeof u&&"from"in u.scrollpos&&"px"in u.scrollpos&&u.scrollpos;if("mopinion"==v)return"passive"!=o?"proactive"!=o?"exit"==o?(Pastease.log("trigger: exit"),e=l?"var try_code = setInterval(function() { try { "+(e='srv.open({key:"'+t[0]+'", trigger_method:"exit",cookie_expire:'+i+"});")+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);":function(){f(t[0],"exit",i,c,s,p,0,t[1],t[2])},Pastease.exit(a,e,i,s,r,l,c,g)):"test"==o?(Pastease.log("test trigger"),l?"":function(){}):void 0:(Pastease.log("trigger: proactive"),e=l?"var try_code; try_code = setInterval(function() { try { "+(e='srv.open({key:"'+t[0]+'", trigger_method:"proactive",cookie_expire:'+i+"});")+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);":function(){f(t[0],"pro_active",i,c,s,p,0,t[1],t[2])},Pastease.proActive(a,e,i,s,r,l,c,g)):(Pastease.log("trigger: passive"),e=l?"var try_code; try_code = setInterval(function() { try { "+(e='srv.open({key:"'+t[0]+'",trigger_method:"passive", cookie_expire:'+i+"});")+" clearInterval(try_code); } catch(e) { Pastease.log(e); }; }, 100);":function(){f(t[0],"passive",i,c,s,p,0,t[1],t[2])},-1<[null,0].indexOf(a)&&-1<[null,0].indexOf(r)?(Pastease.log("plain passive code"),e):(Pastease.log("passive code with timeout or %..."),Pastease.passive(a,e,i,s,r,l,c,g)))},testDevice:function(){function o(e,t){return e.test(t)}var n=/iPhone/i,a=/iPod/i,i=/iPad/i,s=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,r=/Android/i,l=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,c=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,u=/Windows Phone/i,d=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,g=/BlackBerry/i,v=/BB10/i,m=/Opera Mini/i,f=/(CriOS|Chrome)(?=.*\bMobile\b)/i,p=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,P=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i");return new function(e){var t=e||navigator.userAgent,e=t.split("[FBAN");if(void 0!==e[1]&&(t=e[0]),void 0!==(e=t.split("Twitter"))[1]&&(t=e[0]),this.apple={phone:o(n,t),ipod:o(a,t),tablet:!o(n,t)&&o(i,t),device:o(n,t)||o(a,t)||o(i,t)},this.amazon={phone:o(l,t),tablet:!o(l,t)&&o(c,t),device:o(l,t)||o(c,t)},this.android={phone:o(l,t)||o(s,t),tablet:!o(l,t)&&!o(s,t)&&(o(c,t)||o(r,t)),device:o(l,t)||o(c,t)||o(s,t)||o(r,t)},this.windows={phone:o(u,t),tablet:o(d,t),device:o(u,t)||o(d,t)},this.other={blackberry:o(g,t),blackberry10:o(v,t),opera:o(m,t),firefox:o(p,t),chrome:o(f,t),device:o(g,t)||o(v,t)||o(m,t)||o(p,t)||o(f,t)},this.seven_inch=o(P,t),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window)return this}},services:function(e,t){var o=(e=e||{}).service||"",n=e.args||[],e=e.disableMakeDiv||!1;if("mopinion"!=o)return"CFMS"==o?function(){Mgo.loadMopinion("mopinion",n[0],"none",n[1])}:function(){};if(3<=n.length&&!e&&Pastease.makeDiv(n[2]),t)return function(){};var a=null!=N&&void 0!==N&&null!=N?N:"https://collect.mopinion.com/assets/surveys/"+_+"/js/"+O+".js?d=30032020";return function(){var e=document.createElement("script");e.async="async",e.id="mopinionFeedbackScript",e.src=a,document.head.appendChild(e)}},getSelector:function(e){var t=(e=e||"").charAt(0),o=e.split(" ");return t.match(/\#|\.|\*|\[|\:/g)||1<o.length||1<o.length?e:"#"+e},jquery:function(){var e,t=document.location.protocol+"//code.jquery.com/jquery-1.9.1.js";!1===Pastease.fileExists(t)&&((e=document.createElement("script")).type="text/javascript",e.src=t,document.getElementsByTagName("head")[0].appendChild(e));var o=function(){window.jQuery?Pastease.log("jQuery loaded!"):window.setTimeout(function(){o()},200)};o()},socketio:function(){var e,t=document.location.protocol+"//cdn.socket.io/socket.io-1.4.5.js";!1===Pastease.fileExists(t)&&((e=document.createElement("script")).type="text/javascript",e.src=t,document.getElementsByTagName("head")[0].appendChild(e));var o=function(){window.io?Pastease.log("Socket.io loaded!"):window.setTimeout(function(){o()},200)};o()},fileExists:function(e){for(var t=document.getElementsByTagName("script"),o=0;o<t.length;o++)if(Pastease.log("looking for: "+e),Pastease.log("found: "+t[o].src),t[o].src==e)return!0;return!1},socket:function(){var e="pastea.se"==document.location.host?"socket.pastea.se":"localhost:8585";return io.connect(document.location.protocol+"//"+e)},sendXML:function(e,t,o,n){var e=s+e,a=new XMLHttpRequest;a.onreadystatechange=function(){var e;a.readyState!=XMLHttpRequest.DONE&&4!=a.readyState||(200==a.status?(e=a.responseText,o(e,!1,!0)):Pastease.log("Ajax ERROR "+a.status))},a.open(n,e,!0),a.send()},send:function(e,t,o,n){var a=s+e,t={url:a,type:n,data:t,dataType:"json",success:function(e){o(e)},error:function(e){Pastease.log("AJAX ERROR: "+JSON.stringify(e)),Pastease.log("url: "+a),Pastease.log(e,!0)}};$.ajax(t)},use$:function(e){void 0===e&&(e=!1),v=e},ajax$:function(e){void 0===e&&(e=!1),r=e},debug:function(e){void 0===e&&(e=!1),o="true"==Pastease.getCookie("LOG")||e},log:function(e,t){if(void 0===t&&(t=!1),o)try{t?console.log(e):console.log("P> "+e)}catch(e){}}}}();