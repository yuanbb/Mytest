OpenLayers.Layer.WMS=OpenLayers.Class(OpenLayers.Layer.Grid,{DEFAULT_PARAMS:{service:"WMS",version:"1.1.1",request:"GetMap",styles:"",format:"image/jpeg"},isBaseLayer:true,encodeBBOX:false,noMagic:false,yx:{},initialize:function(d,c,e,b){var a=[];e=OpenLayers.Util.upperCaseObject(e);if(parseFloat(e.VERSION)>=1.3&&!e.EXCEPTIONS){e.EXCEPTIONS="INIMAGE"}a.push(d,c,e,b);OpenLayers.Layer.Grid.prototype.initialize.apply(this,a);OpenLayers.Util.applyDefaults(this.params,OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));if(!this.noMagic&&this.params.TRANSPARENT&&this.params.TRANSPARENT.toString().toLowerCase()=="true"){if((b==null)||(!b.isBaseLayer)){this.isBaseLayer=false}if(this.params.FORMAT=="image/jpeg"){this.params.FORMAT=OpenLayers.Util.alphaHack()?"image/gif":"image/png"}}},clone:function(a){if(a==null){a=new OpenLayers.Layer.WMS(this.name,this.url,this.params,this.getOptions())}a=OpenLayers.Layer.Grid.prototype.clone.apply(this,[a]);return a},reverseAxisOrder:function(){var a=this.projection.getCode();return parseFloat(this.params.VERSION)>=1.3&&!!(this.yx[a]||(OpenLayers.Projection.defaults[a]&&OpenLayers.Projection.defaults[a].yx))},getURL:function(c){c=this.adjustBounds(c);var d=this.getImageSize();var e={};var b=this.reverseAxisOrder();e.BBOX=this.encodeBBOX?c.toBBOX(null,b):c.toArray(b);e.WIDTH=d.w;e.HEIGHT=d.h;var a=this.getFullRequestString(e);return a},mergeNewParams:function(c){var b=OpenLayers.Util.upperCaseObject(c);var a=[b];return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this,a)},getFullRequestString:function(e,c){var b=this.map.getProjectionObject();var a=this.projection&&this.projection.equals(b)?this.projection.getCode():b.getCode();var d=(a=="none")?null:a;if(parseFloat(this.params.VERSION)>=1.3){this.params.CRS=d}else{this.params.SRS=d}if(typeof this.params.TRANSPARENT=="boolean"){e.TRANSPARENT=this.params.TRANSPARENT?"TRUE":"FALSE"}return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this,arguments)},CLASS_NAME:"OpenLayers.Layer.WMS"});