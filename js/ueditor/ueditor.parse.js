(function(){(function(){UE=window.UE||{};var f=!!window.ActiveXObject,h={removeLastbs:function(a){return a.replace(/\/$/,"")},extend:function(a,c){for(var b=arguments,d=this.isBoolean(b[b.length-1])?b[b.length-1]:!1,e=this.isBoolean(b[b.length-1])?b.length-1:b.length,k=1;k<e;k++){var f=b[k],l;for(l in f)d&&a.hasOwnProperty(l)||(a[l]=f[l])}return a},isIE:f,cssRule:f?function(a,c,b){var d;b=b||document;d=b.indexList?b.indexList:b.indexList={};var e;if(d[a])e=b.styleSheets[d[a]];else{if(void 0===c)return"";
e=b.createStyleSheet("",b=b.styleSheets.length);d[a]=b}if(void 0===c)return e.cssText;e.cssText=e.cssText+"\n"+(c||"")}:function(a,c,b){b=b||document;var d=b.getElementsByTagName("head")[0],e;if(!(e=b.getElementById(a))){if(void 0===c)return"";e=b.createElement("style");e.id=a;d.appendChild(e)}if(void 0===c)return e.innerHTML;""!==c?e.innerHTML=e.innerHTML+"\n"+c:d.removeChild(e)},domReady:function(a){var c=window.document;"complete"===c.readyState?a():f?(function(){if(!c.isReady){try{c.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,
0);return}a()}}(),window.attachEvent("onload",function(){a()})):(c.addEventListener("DOMContentLoaded",function(){c.removeEventListener("DOMContentLoaded",arguments.callee,!1);a()},!1),window.addEventListener("load",function(){a()},!1))},each:function(a,c,b){if(null!=a)if(a.length===+a.length)for(var d=0,e=a.length;d<e;d++){if(!1===c.call(b,a[d],d,a))return!1}else for(d in a)if(a.hasOwnProperty(d)&&!1===c.call(b,a[d],d,a))return!1},inArray:function(a,c){var b=-1;this.each(a,function(a,e){if(a===c)return b=
e,!1});return b},pushItem:function(a,c){-1==this.inArray(a,c)&&a.push(c)},trim:function(a){return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")},indexOf:function(a,c,b){var d=-1;b=this.isNumber(b)?b:0;this.each(a,function(a,k){if(k>=b&&a===c)return d=k,!1});return d},hasClass:function(a,c){c=c.replace(/(^[ ]+)|([ ]+$)/g,"").replace(/[ ]{2,}/g," ").split(" ");for(var b=0,d,e=a.className;d=c[b++];)if(!RegExp("\\b"+d+"\\b","i").test(e))return!1;return b-1==c.length},addClass:function(a,c){if(a){c=this.trim(c).replace(/[ ]{2,}/g,
" ").split(" ");for(var b=0,d,e=a.className;d=c[b++];)RegExp("\\b"+d+"\\b").test(e)||(e+=" "+d);a.className=h.trim(e)}},removeClass:function(a,c){c=this.isArray(c)?c:this.trim(c).replace(/[ ]{2,}/g," ").split(" ");for(var b=0,d,e=a.className;d=c[b++];)e=e.replace(RegExp("\\b"+d+"\\b"),"");e=this.trim(e).replace(/[ ]{2,}/g," ");a.className=e;!e&&a.removeAttribute("className")},on:function(a,c,b){var d=this.isArray(c)?c:c.split(/\s+/),e=d.length;if(e)for(;e--;)if(c=d[e],a.addEventListener)a.addEventListener(c,
b,!1);else{b._d||(b._d={els:[]});var k=c+b.toString(),f=h.indexOf(b._d.els,a);b._d[k]&&-1!=f||(-1==f&&b._d.els.push(a),b._d[k]||(b._d[k]=function(a){return b.call(a.srcElement,a||window.event)}),a.attachEvent("on"+c,b._d[k]))}a=null},off:function(a,c,b){var d=this.isArray(c)?c:c.split(/\s+/),e=d.length;if(e)for(;e--;)if(c=d[e],a.removeEventListener)a.removeEventListener(c,b,!1);else{var k=c+b.toString();try{a.detachEvent("on"+c,b._d?b._d[k]:b)}catch(f){}b._d&&b._d[k]&&(c=h.indexOf(b._d.els,a),-1!=
c&&b._d.els.splice(c,1),0==b._d.els.length&&delete b._d[k])}},loadFile:function(){function a(a,d){try{for(var e=0,k;k=c[e++];)if(k.doc===a&&k.url==(d.src||d.href))return k}catch(f){return null}}var c=[];return function(b,d,e){var k=a(b,d);if(k)k.ready?e&&e():k.funs.push(e);else if(c.push({doc:b,url:d.src||d.href,funs:[e]}),!b.body){e=[];for(var f in d)"tag"!=f&&e.push(f+'="'+d[f]+'"');b.write("<"+d.tag+" "+e.join(" ")+" ></"+d.tag+">")}else if(!d.id||!b.getElementById(d.id)){var l=b.createElement(d.tag);
delete d.tag;for(f in d)l.setAttribute(f,d[f]);l.onload=l.onreadystatechange=function(){if(!this.readyState||/loaded|complete/.test(this.readyState)){k=a(b,d);if(0<k.funs.length){k.ready=1;for(var c;c=k.funs.pop();)c()}l.onload=l.onreadystatechange=null}};l.onerror=function(){throw Error("The load "+(d.href||d.src)+" fails,check the url");};b.getElementsByTagName("head")[0].appendChild(l)}}}()};h.each("String Function Array Number RegExp Object Boolean".split(" "),function(a){h["is"+a]=function(c){return Object.prototype.toString.apply(c)==
"[object "+a+"]"}});var g={};UE.parse={register:function(a,c){g[a]=c},load:function(a){h.each(g,function(c){c.call(a,h)})}};uParse=function(a,c){h.domReady(function(){var b;document.querySelectorAll?b=document.querySelectorAll(a):/^#/.test(a)?b=[document.getElementById(a.replace(/^#/,""))]:/^\./.test(a)?(b=[],h.each(document.getElementsByTagName("*"),function(c){c.className&&RegExp("\\b"+a.replace(/^\./,"")+"\\b","i").test(c.className)&&b.push(c)})):b=document.getElementsByTagName(a);h.each(b,function(b){UE.parse.load(h.extend({root:b,
selector:a},c))})})}})();UE.parse.register("insertcode",function(f){var h=this.root.getElementsByTagName("pre");if(h.length)if("undefined"==typeof XRegExp){var g,a;void 0!==this.rootPath?(g=f.removeLastbs(this.rootPath)+"/third-party/SyntaxHighlighter/shCore.js",a=f.removeLastbs(this.rootPath)+"/third-party/SyntaxHighlighter/shCoreDefault.css"):(g=this.highlightJsUrl,a=this.highlightCssUrl);f.loadFile(document,{id:"syntaxhighlighter_css",tag:"link",rel:"stylesheet",type:"text/css",href:a});f.loadFile(document,
{id:"syntaxhighlighter_js",src:g,tag:"script",type:"text/javascript",defer:"defer"},function(){f.each(h,function(a){a&&/brush/i.test(a.className)&&SyntaxHighlighter.highlight(a)})})}else f.each(h,function(a){a&&/brush/i.test(a.className)&&SyntaxHighlighter.highlight(a)})});UE.parse.register("table",function(f){var h=this,g=this.root,a=g.getElementsByTagName("table");if(a.length){a=this.selector;f.cssRule("table",a+" table.noBorderTable td,"+a+" table.noBorderTable th,"+a+" table.noBorderTable caption{border:1px dashed #ddd !important}"+
a+" table.sortEnabled tr.firstRow th,"+a+" table.sortEnabled tr.firstRow td{padding-right:20px; background-repeat: no-repeat;background-position: center right; background-image:url("+this.rootPath+"themes/default/images/sortable.png);}"+a+" table.sortEnabled tr.firstRow th:hover,"+a+" table.sortEnabled tr.firstRow td:hover{background-color: #EEE;}"+a+" table{margin-bottom:10px;border-collapse:collapse;display:table;}"+a+" td,"+a+" th{ background:white; padding: 5px 10px;border: 1px solid #DDD;}"+
a+" caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}"+a+" th{border-top:1px solid #BBB;background:#F7F7F7;}"+a+" table tr.firstRow th{border-top:2px solid #BBB;background:#F7F7F7;}"+a+" tr.ue-table-interlace-color-single td{ background: #fcfcfc; }"+a+" tr.ue-table-interlace-color-double td{ background: #f7faff; }"+a+" td p{margin:0;padding:0;}",document);f.each(["td","th","caption"],function(a){a=g.getElementsByTagName(a);a.length&&f.each(a,function(a){a.firstChild||
(a.innerHTML="&nbsp;")})});a=g.getElementsByTagName("table");f.each(a,function(a){if(/\bsortEnabled\b/.test(a.className))f.on(a,"click",function(a){a=a.target||a.srcElement;var d=c(a,["td","th"]);a=c(a,"table");var d=f.indexOf(a.rows[0].cells,d),e=a.getAttribute("data-sort-type");if(-1!=d&&(b(a,d,h.tableSortCompareFn||e),!f.hasClass(a.rows[0],"firstRow"))){for(d=1;d<a.rows.length;d++)f.removeClass(a.rows[d],"firstRow");f.addClass(a.rows[0],"firstRow")}})});var c=function(a,c){var d,b=a;for(c=f.isArray(c)?
c:[c];b;){for(d=0;d<c.length;d++)if(b.tagName==c[d].toUpperCase())return b;b=b.parentNode}return null},b=function(a,c,b){for(var l=a.rows,g=[],h="TH"===l[0].cells[0].tagName,m=0,p=l.length;m<p;m++)g[m]=l[m];var n={reversecurrent:function(a,b){return 1},orderbyasc:function(a,b){return(a.innerText||a.textContent).localeCompare(b.innerText||b.textContent)},reversebyasc:function(a,b){return b.innerHTML.localeCompare(a.innerHTML)},orderbynum:function(a,b){var c=a[f.isIE?"innerText":"textContent"].match(/\d+/),
d=b[f.isIE?"innerText":"textContent"].match(/\d+/);c&&(c=+c[0]);d&&(d=+d[0]);return(c||0)-(d||0)},reversebynum:function(a,b){var c=a[f.isIE?"innerText":"textContent"].match(/\d+/),d=b[f.isIE?"innerText":"textContent"].match(/\d+/);c&&(c=+c[0]);d&&(d=+d[0]);return(d||0)-(c||0)}};a.setAttribute("data-sort-type",b&&"string"===typeof b&&n[b]?b:"");h&&g.splice(0,1);g=d(g,function(a,d){return b&&"function"===typeof b?b.call(this,a.cells[c],d.cells[c]):b&&"number"===typeof b?1:b&&"string"===typeof b&&n[b]?
n[b].call(this,a.cells[c],d.cells[c]):n.orderbyasc.call(this,a.cells[c],d.cells[c])});l=a.ownerDocument.createDocumentFragment();h=0;for(p=g.length;h<p;h++)l.appendChild(g[h]);a.getElementsByTagName("tbody")[0].appendChild(l)},d=function(a,b){b=b||function(a,b){return a.localeCompare(b)};for(var c=0,d=a.length;c<d;c++)for(var f=c,g=a.length;f<g;f++)if(0<b(a[c],a[f])){var h=a[c];a[c]=a[f];a[f]=h}return a}}});UE.parse.register("background",function(f){for(var h=this.root.getElementsByTagName("p"),g,
a=0,c;c=h[a++];)(g=c.getAttribute("data-background"))&&c.parentNode.removeChild(c);g&&f.cssRule("ueditor_background",this.selector+"{"+g+"}",document)});UE.parse.register("list",function(f){function h(b){var c=this;f.each(b,function(b){if(b.className&&/custom_/i.test(b.className)){var e=b.className.match(/custom_(\w+)/)[1];if("dash"==e||"dot"==e)f.pushItem(g,d+" li.list-"+a[e]+"{background-image:url("+c.liiconpath+a[e]+".gif)}"),f.pushItem(g,d+" ul.custom_"+e+"{list-style:none;} "+d+" ul.custom_"+
e+" li{background-position:0 3px;background-repeat:no-repeat}");else{var h=1;f.each(b.childNodes,function(b){"LI"==b.tagName&&(f.pushItem(g,d+" li.list-"+a[e]+h+"{background-image:url("+c.liiconpath+"list-"+a[e]+h+".gif)}"),h++)});f.pushItem(g,d+" ol.custom_"+e+"{list-style:none;}"+d+" ol.custom_"+e+" li{background-position:0 3px;background-repeat:no-repeat}")}switch(e){case "cn":f.pushItem(g,d+" li.list-"+e+"-paddingleft-1{padding-left:25px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-2{padding-left:40px}");
f.pushItem(g,d+" li.list-"+e+"-paddingleft-3{padding-left:55px}");break;case "cn1":f.pushItem(g,d+" li.list-"+e+"-paddingleft-1{padding-left:30px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-2{padding-left:40px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-3{padding-left:55px}");break;case "cn2":f.pushItem(g,d+" li.list-"+e+"-paddingleft-1{padding-left:40px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-2{padding-left:55px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-3{padding-left:68px}");break;
case "num":case "num1":f.pushItem(g,d+" li.list-"+e+"-paddingleft-1{padding-left:25px}");break;case "num2":f.pushItem(g,d+" li.list-"+e+"-paddingleft-1{padding-left:35px}");f.pushItem(g,d+" li.list-"+e+"-paddingleft-2{padding-left:40px}");break;case "dash":f.pushItem(g,d+" li.list-"+e+"-paddingleft{padding-left:35px}");break;case "dot":f.pushItem(g,d+" li.list-"+e+"-paddingleft{padding-left:20px}")}}})}var g=[],a={cn:"cn-1-",cn1:"cn-2-",cn2:"cn-3-",num:"num-1-",num1:"num-2-",num2:"num-3-",dash:"dash",
dot:"dot"};f.extend(this,{liiconpath:"http://bs.baidu.com/listicon/",listDefaultPaddingLeft:"20"});var c=this.root,b=c.getElementsByTagName("ol"),c=c.getElementsByTagName("ul"),d=this.selector;b.length&&h.call(this,b);c.length&&h.call(this,c);if(b.length||c.length)g.push(d+" .list-paddingleft-1{padding-left:0}"),g.push(d+" .list-paddingleft-2{padding-left:"+this.listDefaultPaddingLeft+"px}"),g.push(d+" .list-paddingleft-3{padding-left:"+2*this.listDefaultPaddingLeft+"px}"),f.cssRule("list",d+" ol,"+
d+" ul{margin:0;padding:0;}li{clear:both;}"+g.join("\n"),document)});UE.parse.register("vedio",function(f){var h=this.root.getElementsByTagName("video"),g=this.root.getElementsByTagName("audio");document.createElement("video");document.createElement("audio");if(h.length||g.length){var h=f.removeLastbs(this.rootPath),g=h+"/third-party/video-js/video.js",a=h+"/third-party/video-js/video-js.min.css",c=h+"/third-party/video-js/video-js.swf";window.videojs?videojs.autoSetup():(f.loadFile(document,{id:"video_css",
tag:"link",rel:"stylesheet",type:"text/css",href:a}),f.loadFile(document,{id:"video_js",src:g,tag:"script",type:"text/javascript"},function(){videojs.options.flash.swf=c;videojs.autoSetup()}))}})})();