OpenLayers.Layer.MapServer=OpenLayers.Class(OpenLayers.Layer.Grid,{DEFAULT_PARAMS:{mode:"map",map_imagetype:"png"},initialize:function(c,b,d,a){OpenLayers.Layer.Grid.prototype.initialize.apply(this,arguments);this.params=OpenLayers.Util.applyDefaults(this.params,this.DEFAULT_PARAMS);if(a==null||a.isBaseLayer==null){this.isBaseLayer=((this.params.transparent!="true")&&(this.params.transparent!=true))}},clone:function(a){if(a==null){a=new OpenLayers.Layer.MapServer(this.name,this.url,this.params,this.getOptions())}a=OpenLayers.Layer.Grid.prototype.clone.apply(this,[a]);return a},getURL:function(c){c=this.adjustBounds(c);var b=[c.left,c.bottom,c.right,c.top];var d=this.getImageSize();var a=this.getFullRequestString({mapext:b,imgext:b,map_size:[d.w,d.h],imgx:d.w/2,imgy:d.h/2,imgxy:[d.w,d.h]});return a},getFullRequestString:function(f,e){var b=(e==null)?this.url:e;var g=OpenLayers.Util.extend({},this.params);g=OpenLayers.Util.extend(g,f);var a=OpenLayers.Util.getParameterString(g);if(OpenLayers.Util.isArray(b)){b=this.selectUrl(a,b)}var d=OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(b));for(var h in g){if(h.toUpperCase() in d){delete g[h]}}a=OpenLayers.Util.getParameterString(g);var i=b;a=a.replace(/,/g,"+");if(a!=""){var c=b.charAt(b.length-1);if((c=="&")||(c=="?")){i+=a}else{if(b.indexOf("?")==-1){i+="?"+a}else{i+="&"+a}}}return i},CLASS_NAME:"OpenLayers.Layer.MapServer"});