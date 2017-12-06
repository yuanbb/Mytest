OpenLayers.Control.TransformFeature=OpenLayers.Class(OpenLayers.Control,{geometryTypes:null,layer:null,preserveAspectRatio:false,rotate:true,feature:null,renderIntent:"temporary",rotationHandleSymbolizer:null,box:null,center:null,scale:1,ratio:1,rotation:0,handles:null,rotationHandles:null,dragControl:null,irregular:false,initialize:function(b,a){OpenLayers.Control.prototype.initialize.apply(this,[a]);this.layer=b;if(!this.rotationHandleSymbolizer){this.rotationHandleSymbolizer={stroke:false,pointRadius:10,fillOpacity:0,cursor:"pointer"}}this.createBox();this.createControl()},activate:function(){var a=false;if(OpenLayers.Control.prototype.activate.apply(this,arguments)){this.dragControl.activate();this.layer.addFeatures([this.box]);this.rotate&&this.layer.addFeatures(this.rotationHandles);this.layer.addFeatures(this.handles);a=true}return a},deactivate:function(){var a=false;if(OpenLayers.Control.prototype.deactivate.apply(this,arguments)){this.layer.removeFeatures(this.handles);this.rotate&&this.layer.removeFeatures(this.rotationHandles);this.layer.removeFeatures([this.box]);this.dragControl.deactivate();a=true}return a},setMap:function(a){this.dragControl.setMap(a);OpenLayers.Control.prototype.setMap.apply(this,arguments)},setFeature:function(i,c){c=OpenLayers.Util.applyDefaults(c,{rotation:0,scale:1,ratio:1});var e=this.rotation;var a=this.center;OpenLayers.Util.extend(this,c);var j=this.events.triggerEvent("beforesetfeature",{feature:i});if(j===false){return}this.feature=i;this.activate();this._setfeature=true;var b=this.feature.geometry.getBounds();this.box.move(b.getCenterLonLat());this.box.geometry.rotate(-e,a);this._angle=0;var f;if(this.rotation){var g=i.geometry.clone();g.rotate(-this.rotation,this.center);var d=new OpenLayers.Feature.Vector(g.getBounds().toGeometry());d.geometry.rotate(this.rotation,this.center);this.box.geometry.rotate(this.rotation,this.center);this.box.move(d.geometry.getBounds().getCenterLonLat());var h=d.geometry.components[0].components[0];f=h.getBounds().getCenterLonLat()}else{f=new OpenLayers.LonLat(b.left,b.bottom)}this.handles[0].move(f);delete this._setfeature;this.events.triggerEvent("setfeature",{feature:i})},unsetFeature:function(){if(this.active){this.deactivate()}else{this.feature=null;this.rotation=0;this.scale=1;this.ratio=1}},createBox:function(){var f=this;this.center=new OpenLayers.Geometry.Point(0,0);this.box=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(-1,-1),new OpenLayers.Geometry.Point(0,-1),new OpenLayers.Geometry.Point(1,-1),new OpenLayers.Geometry.Point(1,0),new OpenLayers.Geometry.Point(1,1),new OpenLayers.Geometry.Point(0,1),new OpenLayers.Geometry.Point(-1,1),new OpenLayers.Geometry.Point(-1,0),new OpenLayers.Geometry.Point(-1,-1)]),null,typeof this.renderIntent=="string"?null:this.renderIntent);this.box.geometry.move=function(i,o){f._moving=true;OpenLayers.Geometry.LineString.prototype.move.apply(this,arguments);f.center.move(i,o);delete f._moving};var a=function(i,o){OpenLayers.Geometry.Point.prototype.move.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.move(i,o);this._handle.geometry.move(i,o)};var n=function(p,i,o){OpenLayers.Geometry.Point.prototype.resize.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.resize(p,i,o);this._handle.geometry.resize(p,i,o)};var l=function(o,i){OpenLayers.Geometry.Point.prototype.rotate.apply(this,arguments);this._rotationHandle&&this._rotationHandle.geometry.rotate(o,i);this._handle.geometry.rotate(o,i)};var h=function(u,s){var t=this.x,r=this.y;OpenLayers.Geometry.Point.prototype.move.call(this,u,s);if(f._moving){return}var A=f.dragControl.handlers.drag.evt;var z=!f._setfeature&&f.preserveAspectRatio;var C=!z&&!(A&&A.shiftKey);var D=new OpenLayers.Geometry.Point(t,r);var B=f.center;this.rotate(-f.rotation,B);D.rotate(-f.rotation,B);var o=this.x-B.x;var v=this.y-B.y;var p=o-(this.x-D.x);var w=v-(this.y-D.y);if(f.irregular&&!f._setfeature){o-=(this.x-D.x)/2;v-=(this.y-D.y)/2}this.x=t;this.y=r;var G,q=1;if(C){G=Math.abs(w)<0.00001?1:v/w;q=(Math.abs(p)<0.00001?1:(o/p))/G}else{var F=Math.sqrt((p*p)+(w*w));var E=Math.sqrt((o*o)+(v*v));G=E/F}f._moving=true;f.box.geometry.rotate(-f.rotation,B);delete f._moving;f.box.geometry.resize(G,B,q);f.box.geometry.rotate(f.rotation,B);f.transformFeature({scale:G,ratio:q});if(f.irregular&&!f._setfeature){var i=B.clone();i.x+=Math.abs(t-B.x)<0.00001?0:(this.x-t);i.y+=Math.abs(r-B.y)<0.00001?0:(this.y-r);f.box.geometry.move(this.x-t,this.y-r);f.transformFeature({center:i})}};var c=function(v,t){var D=this.x,A=this.y;OpenLayers.Geometry.Point.prototype.move.call(this,v,t);if(f._moving){return}var B=f.dragControl.handlers.drag.evt;var u=(B&&B.shiftKey)?45:1;var s=f.center;var z=this.x-s.x;var q=this.y-s.y;var C=z-v;var r=q-t;this.x=D;this.y=A;var o=Math.atan2(r,C);var i=Math.atan2(q,z);var p=i-o;p*=180/Math.PI;f._angle=(f._angle+p)%360;var w=f.rotation%u;if(Math.abs(f._angle)>=u||w!==0){p=Math.round(f._angle/u)*u-w;f._angle=0;f.box.geometry.rotate(p,s);f.transformFeature({rotation:p})}};var m=new Array(8);var j=new Array(4);var k,g,b;var e=["sw","s","se","e","ne","n","nw","w"];for(var d=0;d<8;++d){k=this.box.geometry.components[d];g=new OpenLayers.Feature.Vector(k.clone(),{role:e[d]+"-resize"},typeof this.renderIntent=="string"?null:this.renderIntent);if(d%2==0){b=new OpenLayers.Feature.Vector(k.clone(),{role:e[d]+"-rotate"},typeof this.rotationHandleSymbolizer=="string"?null:this.rotationHandleSymbolizer);b.geometry.move=c;k._rotationHandle=b;j[d/2]=b}k.move=a;k.resize=n;k.rotate=l;g.geometry.move=h;k._handle=g;m[d]=g}this.rotationHandles=j;this.handles=m},createControl:function(){var a=this;this.dragControl=new OpenLayers.Control.DragFeature(this.layer,{documentDrag:true,moveFeature:function(b){if(this.feature===a.feature){this.feature=a.box}OpenLayers.Control.DragFeature.prototype.moveFeature.apply(this,arguments)},onDrag:function(c,b){if(c===a.box){a.transformFeature({center:a.center})}},onStart:function(e,c){var b=!a.geometryTypes||OpenLayers.Util.indexOf(a.geometryTypes,e.geometry.CLASS_NAME)!==-1;var d=OpenLayers.Util.indexOf(a.handles,e);d+=OpenLayers.Util.indexOf(a.rotationHandles,e);if(e!==a.feature&&e!==a.box&&d==-2&&b){a.setFeature(e)}},onComplete:function(c,b){a.events.triggerEvent("transformcomplete",{feature:a.feature})}})},drawHandles:function(){var b=this.layer;for(var a=0;a<8;++a){if(this.rotate&&a%2===0){b.drawFeature(this.rotationHandles[a/2],this.rotationHandleSymbolizer)}b.drawFeature(this.handles[a],this.renderIntent)}},transformFeature:function(e){if(!this._setfeature){this.scale*=(e.scale||1);this.ratio*=(e.ratio||1);var b=this.rotation;this.rotation=(this.rotation+(e.rotation||0))%360;if(this.events.triggerEvent("beforetransform",e)!==false){var d=this.feature;var c=d.geometry;var a=this.center;c.rotate(-b,a);if(e.scale||e.ratio){c.resize(e.scale,a,e.ratio)}else{if(e.center){d.move(e.center.getBounds().getCenterLonLat())}}c.rotate(this.rotation,a);this.layer.drawFeature(d);d.toState(OpenLayers.State.UPDATE);this.events.triggerEvent("transform",e)}}this.layer.drawFeature(this.box,this.renderIntent);this.drawHandles()},destroy:function(){var b;for(var a=0;a<8;++a){b=this.box.geometry.components[a];b._handle.destroy();b._handle=null;b._rotationHandle&&b._rotationHandle.destroy();b._rotationHandle=null}this.center=null;this.feature=null;this.handles=null;this.rotationHandleSymbolizer=null;this.rotationHandles=null;this.box.destroy();this.box=null;this.layer=null;this.dragControl.destroy();this.dragControl=null;OpenLayers.Control.prototype.destroy.apply(this,arguments)},CLASS_NAME:"OpenLayers.Control.TransformFeature"});