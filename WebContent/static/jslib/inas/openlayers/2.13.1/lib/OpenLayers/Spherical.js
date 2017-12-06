OpenLayers.Spherical=OpenLayers.Spherical||{};OpenLayers.Spherical.DEFAULT_RADIUS=6378137;OpenLayers.Spherical.computeDistanceBetween=function(h,g,b){var f=b||OpenLayers.Spherical.DEFAULT_RADIUS;var e=Math.sin(Math.PI*(g.lon-h.lon)/360);var d=Math.sin(Math.PI*(g.lat-h.lat)/360);var c=d*d+e*e*Math.cos(Math.PI*h.lat/180)*Math.cos(Math.PI*g.lat/180);return 2*f*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))};OpenLayers.Spherical.computeHeading=function(d,c){var b=Math.sin(Math.PI*(d.lon-c.lon)/180)*Math.cos(Math.PI*c.lat/180);var a=Math.cos(Math.PI*d.lat/180)*Math.sin(Math.PI*c.lat/180)-Math.sin(Math.PI*d.lat/180)*Math.cos(Math.PI*c.lat/180)*Math.cos(Math.PI*(d.lon-c.lon)/180);return 180*Math.atan2(b,a)/Math.PI};