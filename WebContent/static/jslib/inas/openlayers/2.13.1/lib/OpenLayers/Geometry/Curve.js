OpenLayers.Geometry.Curve=OpenLayers.Class(OpenLayers.Geometry.MultiPoint,{componentTypes:["OpenLayers.Geometry.Point"],getLength:function(){var c=0;if(this.components&&(this.components.length>1)){for(var b=1,a=this.components.length;b<a;b++){c+=this.components[b-1].distanceTo(this.components[b])}}return c},getGeodesicLength:function(b){var e=this;if(b){var c=new OpenLayers.Projection("EPSG:4326");if(!c.equals(b)){e=this.clone().transform(b,c)}}var f=0;if(e.components&&(e.components.length>1)){var h,g;for(var d=1,a=e.components.length;d<a;d++){h=e.components[d-1];g=e.components[d];f+=OpenLayers.Util.distVincenty({lon:h.x,lat:h.y},{lon:g.x,lat:g.y})}}return f*1000},CLASS_NAME:"OpenLayers.Geometry.Curve"});