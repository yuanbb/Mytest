OpenLayers.Control.Geolocate=OpenLayers.Class(OpenLayers.Control,{geolocation:null,available:("geolocation" in navigator),bind:true,watch:false,geolocationOptions:null,destroy:function(){this.deactivate();OpenLayers.Control.prototype.destroy.apply(this,arguments)},activate:function(){if(this.available&&!this.geolocation){this.geolocation=navigator.geolocation}if(!this.geolocation){this.events.triggerEvent("locationuncapable");return false}if(OpenLayers.Control.prototype.activate.apply(this,arguments)){if(this.watch){this.watchId=this.geolocation.watchPosition(OpenLayers.Function.bind(this.geolocate,this),OpenLayers.Function.bind(this.failure,this),this.geolocationOptions)}else{this.getCurrentLocation()}return true}return false},deactivate:function(){if(this.active&&this.watchId!==null){this.geolocation.clearWatch(this.watchId)}return OpenLayers.Control.prototype.deactivate.apply(this,arguments)},geolocate:function(b){var a=new OpenLayers.LonLat(b.coords.longitude,b.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"),this.map.getProjectionObject());if(this.bind){this.map.setCenter(a)}this.events.triggerEvent("locationupdated",{position:b,point:new OpenLayers.Geometry.Point(a.lon,a.lat)})},getCurrentLocation:function(){if(!this.active||this.watch){return false}this.geolocation.getCurrentPosition(OpenLayers.Function.bind(this.geolocate,this),OpenLayers.Function.bind(this.failure,this),this.geolocationOptions);return true},failure:function(a){this.events.triggerEvent("locationfailed",{error:a})},CLASS_NAME:"OpenLayers.Control.Geolocate"});