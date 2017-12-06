OpenLayers.Control.UTFGrid=OpenLayers.Class(OpenLayers.Control,{autoActivate:true,layers:null,defaultHandlerOptions:{delay:300,pixelTolerance:4,stopMove:false,single:true,"double":false,stopSingle:false,stopDouble:false},handlerMode:"click",setHandler:function(a){this.handlerMode=a;this.resetHandler()},resetHandler:function(){if(this.handler){this.handler.deactivate();this.handler.destroy();this.handler=null}if(this.handlerMode=="hover"){this.handler=new OpenLayers.Handler.Hover(this,{pause:this.handleEvent,move:this.reset},this.handlerOptions)}else{if(this.handlerMode=="click"){this.handler=new OpenLayers.Handler.Click(this,{click:this.handleEvent},this.handlerOptions)}else{if(this.handlerMode=="move"){this.handler=new OpenLayers.Handler.Hover(this,{pause:this.handleEvent,move:this.handleEvent},this.handlerOptions)}}}if(this.handler){return true}else{return false}},initialize:function(a){a=a||{};a.handlerOptions=a.handlerOptions||this.defaultHandlerOptions;OpenLayers.Control.prototype.initialize.apply(this,[a]);this.resetHandler()},handleEvent:function(c){if(c==null){this.reset();return}var d=this.map.getLonLatFromPixel(c.xy);if(!d){return}var h=this.findLayers();if(h.length>0){var g={};var f,b;for(var e=0,a=h.length;e<a;e++){f=h[e];b=OpenLayers.Util.indexOf(this.map.layers,f);g[b]=f.getFeatureInfo(d)}this.callback(g,d,c.xy)}},callback:function(a){},reset:function(a){this.callback(null)},findLayers:function(){var c=this.layers||this.map.layers;var d=[];var b;for(var a=c.length-1;a>=0;--a){b=c[a];if(b instanceof OpenLayers.Layer.UTFGrid){d.push(b)}}return d},CLASS_NAME:"OpenLayers.Control.UTFGrid"});