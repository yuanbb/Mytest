OpenLayers.Layer.MapGuide=OpenLayers.Class(OpenLayers.Layer.Grid,{isBaseLayer:true,useHttpTile:false,singleTile:false,useOverlay:false,useAsyncOverlay:true,TILE_PARAMS:{operation:"GETTILEIMAGE",version:"1.2.0"},SINGLE_TILE_PARAMS:{operation:"GETMAPIMAGE",format:"PNG",locale:"en",clip:"1",version:"1.0.0"},OVERLAY_PARAMS:{operation:"GETDYNAMICMAPOVERLAYIMAGE",format:"PNG",locale:"en",clip:"1",version:"2.0.0"},FOLDER_PARAMS:{tileColumnsPerFolder:30,tileRowsPerFolder:30,format:"png",querystring:null},defaultSize:new OpenLayers.Size(300,300),tileOriginCorner:"tl",initialize:function(c,b,d,a){OpenLayers.Layer.Grid.prototype.initialize.apply(this,arguments);if(a==null||a.isBaseLayer==null){this.isBaseLayer=((this.transparent!="true")&&(this.transparent!=true))}if(a&&a.useOverlay!=null){this.useOverlay=a.useOverlay}if(this.singleTile){if(this.useOverlay){OpenLayers.Util.applyDefaults(this.params,this.OVERLAY_PARAMS);if(!this.useAsyncOverlay){this.params.version="1.0.0"}}else{OpenLayers.Util.applyDefaults(this.params,this.SINGLE_TILE_PARAMS)}}else{if(this.useHttpTile){OpenLayers.Util.applyDefaults(this.params,this.FOLDER_PARAMS)}else{OpenLayers.Util.applyDefaults(this.params,this.TILE_PARAMS)}this.setTileSize(this.defaultSize)}},clone:function(a){if(a==null){a=new OpenLayers.Layer.MapGuide(this.name,this.url,this.params,this.getOptions())}a=OpenLayers.Layer.Grid.prototype.clone.apply(this,[a]);return a},getURL:function(a){var d;var b=a.getCenterLonLat();var h=this.map.getSize();if(this.singleTile){var e={setdisplaydpi:OpenLayers.DOTS_PER_INCH,setdisplayheight:h.h*this.ratio,setdisplaywidth:h.w*this.ratio,setviewcenterx:b.lon,setviewcentery:b.lat,setviewscale:this.map.getScale()};if(this.useOverlay&&!this.useAsyncOverlay){var i={};i=OpenLayers.Util.extend(i,e);i.operation="GETVISIBLEMAPEXTENT";i.version="1.0.0";i.session=this.params.session;i.mapName=this.params.mapName;i.format="text/xml";d=this.getFullRequestString(i);OpenLayers.Request.GET({url:d,async:false})}d=this.getFullRequestString(e)}else{var g=this.map.getResolution();var f=Math.floor((a.left-this.maxExtent.left)/g);f=Math.round(f/this.tileSize.w);var c=Math.floor((this.maxExtent.top-a.top)/g);c=Math.round(c/this.tileSize.h);if(this.useHttpTile){d=this.getImageFilePath({tilecol:f,tilerow:c,scaleindex:this.resolutions.length-this.map.zoom-1})}else{d=this.getFullRequestString({tilecol:f,tilerow:c,scaleindex:this.resolutions.length-this.map.zoom-1})}}return d},getFullRequestString:function(f,e){var b=(e==null)?this.url:e;if(typeof b=="object"){b=b[Math.floor(Math.random()*b.length)]}var i=b;var g=OpenLayers.Util.extend({},this.params);g=OpenLayers.Util.extend(g,f);var d=OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(b));for(var h in g){if(h.toUpperCase() in d){delete g[h]}}var a=OpenLayers.Util.getParameterString(g);a=a.replace(/,/g,"+");if(a!=""){var c=b.charAt(b.length-1);if((c=="&")||(c=="?")){i+=a}else{if(b.indexOf("?")==-1){i+="?"+a}else{i+="&"+a}}}return i},getImageFilePath:function(g,e){var c=(e==null)?this.url:e;if(typeof c=="object"){c=c[Math.floor(Math.random()*c.length)]}var b=c;var d="";var f="";if(g.tilerow<0){d="-"}if(g.tilerow==0){d+="0"}else{d+=Math.floor(Math.abs(g.tilerow/this.params.tileRowsPerFolder))*this.params.tileRowsPerFolder}if(g.tilecol<0){f="-"}if(g.tilecol==0){f+="0"}else{f+=Math.floor(Math.abs(g.tilecol/this.params.tileColumnsPerFolder))*this.params.tileColumnsPerFolder}var a="/S"+Math.floor(g.scaleindex)+"/"+this.params.basemaplayergroupname+"/R"+d+"/C"+f+"/"+(g.tilerow%this.params.tileRowsPerFolder)+"_"+(g.tilecol%this.params.tileColumnsPerFolder)+"."+this.params.format;if(this.params.querystring){a+="?"+this.params.querystring}b+=a;return b},CLASS_NAME:"OpenLayers.Layer.MapGuide"});