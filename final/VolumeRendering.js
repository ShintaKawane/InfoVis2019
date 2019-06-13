function VolumeRender(width, height, camera, renderer, plane)
{
    
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0;
	
	if(i<128){
	    var R = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
            var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
            var B = 1.0;
	}else{
	    var R = 1.0;
            var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
            var B = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
	}
        var color = new THREE.Color( R, G, B );
	cmap.push(color);
    }
    var smin = volume.min;
    var smax = volume.max;
    function getColorMapIndex(alpha)
    {
	if ( alpha <= smin ) {
	    alpha = smin;
	} else if ( alpha >= smax ) {
	    alpha = smax;
	}
	alpha = ( alpha - smin ) / ( smax - smin );
	var colorPosition = Math.round ( alpha * 256 );
	colorPosition == 256 ? colorPosition -= 1 : colorPosition;
	return colorPosition;
    }
    
    var lines = volume.dimx;
    var slices = volume.dimx * volume.dimy;
    var cube_set = [];
    var geometry = new THREE.BoxGeometry(1.0,1.0,1.0);
    //var material = new THREE.MeshLambertMaterial();
    /*for ( var z = 0; z < volume.dimz - 1; z++ )
    {
        for ( var y = 0; y < volume.dimy - 1; y++ )
        {
            for ( var x = 0; x < volume.dimx - 1; x++ )
            {*/
    for ( var z = 0; z < volume.dimz/2; z++ )
    {
        for ( var y = 0; y < volume.dimy/2; y++ )
        {
            for ( var x = 0; x < volume.dimx/2; x++ )
            {
		var material = new THREE.MeshLambertMaterial({color:cmap[getColorMapIndex(volume.value[x + y*lines + z*slices])]});
		material.opacity = Math.min(volume.value[x + y*lines + z*slices] / volume.max, 1.0);
		material.transparent = true;
		if(material.opacity > 0.2)
		{
		var cube = new THREE.Mesh(geometry, material);
		cube.position.set(x+0.5-volume.dimx/2, y+0.5-volume.dimy/2, z+0.5-volume.dimz/2);
		//var valu = volume.value[x + y*lines + z*slices];
		//cube_set.push(new Area(cube, valu));
		    cube_set.push(cube);
		}
	    }
	}
    }
    return cube_set;
    /*
    var buffer = [];
    for( var i = 0; i < width; i++ )
    {
	buffer[i] = [];
	for( var j = 0; j < height; j++)
	{
	    buffer[i][j] = 0.0;
	}
    }*/
    
    /*for ( var y = 0; y < height; y++ )
    {
        for ( var x = 0; x < width; x++ )
        {*/
	    //var x_win = x;
    //var y_win = y;
    //var x_win = event.clientX;
    //var y_win = event.clientY;
/*    var x_win = 200;
    var y_win = 200;

	    //Window coordinates to NDC
	    var vx = renderer.domElement.offsetLeft;
	    var vy = renderer.domElement.offsetTop;
	    var vw = renderer.domElement.width;
	    var vh = renderer.domElement.height;

	    var x_NDC = 2*(x_win - vx) / vw - 1;
	    var y_NDC = -(2*(y_win - vy) / vh - 1);

	    //NDC to world coordinates
	    var p_NDC = new THREE.Vector3(x_NDC, y_NDC, 1);
	    var p_wld = p_NDC.unproject(camera);

	    //Origin and direction of the ray
	    var origin = camera.position;
	    var direction = (new THREE.Vector3(p_wld.x - camera.position.x,
					       p_wld.y - camera.position.y,
					       p_wld.z - camera.position.z)).normalize();

	    var raycaster = new THREE.Raycaster(origin, direction);
    //var intersects = raycaster.intersectObjects(cube_set);
    var intersects = raycaster.intersectObject(plane);
    if(intersects.length > 0)
	    {
		console.log("in the box");
		intersects[0].face.color.setRGB(1.0, 1.0, 1.0);
		intersects[0].object.geometry.colorsNeedUpdate = true;
	    }else{
		console.log("out");
	    }*/
	    
	    /*if(intersects.length > 0)
	    {
		console.log("in the box");
		intersects[0].face.color.setRGB(1.0, 1.0, 1.0);
		intersects[0].object.geometry.colorsNeedUpdate = true;
	    }*/
	    
	    //console.log("Clicked point", x_win, ",", y_win);
	    //console.log("NDC", x_NDC, ",", y_NDC);
	    //console.log("world coordinate", p_wld);
	//}
    //}
}
