OpenLayers.Control.WMSGetFeatureInfo=OpenLayers.Class(OpenLayers.Control,{hover:false,drillDown:false,maxFeatures:10,clickCallback:"click",output:"features",layers:null,queryVisible:false,url:null,layerUrls:null,infoFormat:"text/html",vendorParams:{},format:null,formatOptions:null,handler:null,hoverRequest:null,initialize:function(a){a=a||{};a.handlerOptions=a.handlerOptions||{};OpenLayers.Control.prototype.initialize.apply(this,[a]);if(!this.format){this.format=new OpenLayers.Format.WMSGetFeatureInfo(a.formatOptions)}if(this.drillDown===true){this.hover=false}if(this.hover){this.handler=new OpenLayers.Handler.Hover(this,{move:this.cancelHover,pause:this.getInfoForHover},OpenLayers.Util.extend(this.handlerOptions.hover||{},{delay:250}))}else{var b={};b[this.clickCallback]=this.getInfoForClick;this.handler=new OpenLayers.Handler.Click(this,b,this.handlerOptions.click||{})}},getInfoForClick:function(a){this.events.triggerEvent("beforegetfeatureinfo",{xy:a.xy});OpenLayers.Element.addClass(this.map.viewPortDiv,"olCursorWait");this.request(a.xy,{})},getInfoForHover:function(a){this.events.triggerEvent("beforegetfeatureinfo",{xy:a.xy});this.request(a.xy,{hover:true})},cancelHover:function(){if(this.hoverRequest){this.hoverRequest.abort();this.hoverRequest=null}},findLayers:function(){var d=this.layers||this.map.layers;var e=[];var c,a;for(var b=d.length-1;b>=0;--b){c=d[b];if(c instanceof OpenLayers.Layer.WMS&&(!this.queryVisible||c.getVisibility())){a=OpenLayers.Util.isArray(c.url)?c.url[0]:c.url;if(this.drillDown===false&&!this.url){this.url=a}if(this.drillDown===true||this.urlMatches(a)){e.push(c)}}}return e},urlMatches:function(b){var d=OpenLayers.Util.isEquivalentUrl(this.url,b);if(!d&&this.layerUrls){for(var c=0,a=this.layerUrls.length;c<a;++c){if(OpenLayers.Util.isEquivalentUrl(this.layerUrls[c],b)){d=true;break}}}return d},buildWMSOptions:function(b,e,c,l){var j=[],m=[];for(var f=0,h=e.length;f<h;f++){if(e[f].params.LAYERS!=null){j=j.concat(e[f].params.LAYERS);m=m.concat(this.getStyleNames(e[f]))}}var a=e[0];var g=this.map.getProjection();var k=a.projection;if(k&&k.equals(this.map.getProjectionObject())){g=k.getCode()}var d=OpenLayers.Util.extend({service:"WMS",version:a.params.VERSION,request:"GetFeatureInfo",exceptions:a.params.EXCEPTIONS,bbox:this.map.getExtent().toBBOX(null,a.reverseAxisOrder()),feature_count:this.maxFeatures,height:this.map.getSize().h,width:this.map.getSize().w,format:l,info_format:a.params.INFO_FORMAT||this.infoFormat},(parseFloat(a.params.VERSION)>=1.3)?{crs:g,i:parseInt(c.x),j:parseInt(c.y)}:{srs:g,x:parseInt(c.x),y:parseInt(c.y)});if(j.length!=0){d=OpenLayers.Util.extend({layers:j,query_layers:j,styles:m},d)}OpenLayers.Util.applyDefaults(d,this.vendorParams);return{url:b,params:OpenLayers.Util.upperCaseObject(d),callback:function(i){this.handleResponse(c,i,b)},scope:this}},getStyleNames:function(b){var a;if(b.params.STYLES){a=b.params.STYLES}else{if(OpenLayers.Util.isArray(b.params.LAYERS)){a=new Array(b.params.LAYERS.length)}else{a=b.params.LAYERS.replace(/[^,]/g,"")}}return a},request:function(b,m){var d=this.findLayers();if(d.length==0){this.events.triggerEvent("nogetfeatureinfo");OpenLayers.Element.removeClass(this.map.viewPortDiv,"olCursorWait");return}m=m||{};if(this.drillDown===false){var k=this.buildWMSOptions(this.url,d,b,d[0].params.FORMAT);var c=OpenLayers.Request.GET(k);if(m.hover===true){this.hoverRequest=c}}else{this._requestCount=0;this._numRequests=0;this.features=[];var j={},a;for(var e=0,h=d.length;e<h;e++){var f=d[e];var g,l=false;a=OpenLayers.Util.isArray(f.url)?f.url[0]:f.url;if(a in j){j[a].push(f)}else{this._numRequests++;j[a]=[f]}}var d;for(var a in j){d=j[a];var k=this.buildWMSOptions(a,d,b,d[0].params.FORMAT);OpenLayers.Request.GET(k)}}},triggerGetFeatureInfo:function(b,c,a){this.events.triggerEvent("getfeatureinfo",{text:b.responseText,features:a,request:b,xy:c});OpenLayers.Element.removeClass(this.map.viewPortDiv,"olCursorWait")},handleResponse:function(e,c,a){var d=c.responseXML;if(!d||!d.documentElement){d=c.responseText}var b=this.format.read(d);if(this.drillDown===false){this.triggerGetFeatureInfo(c,e,b)}else{this._requestCount++;if(this.output==="object"){this._features=(this._features||[]).concat({url:a,features:b})}else{this._features=(this._features||[]).concat(b)}if(this._requestCount===this._numRequests){this.triggerGetFeatureInfo(c,e,this._features.concat());delete this._features;delete this._requestCount;delete this._numRequests}}},CLASS_NAME:"OpenLayers.Control.WMSGetFeatureInfo"});