function LIC_func( volume, p )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    
    var cmap = [];
    make_colormap();
    
    var amax = 0;
    var bmax = 0;
    var axis = p[0];
    var sl = p[1];
    var counter = 0;
    set_axis(axis);

    var face_n = 0;

    var ns = 32;
    var noise = [];
    generate_noise();
    var alpha = 0.1;
    
    var v0; var v1; var v2; var v3;
    
    for(var a = 0; a < amax-1; a++)
    {
	for(var b = 0; b < bmax-1; b++)
	{
	    push_vertices(a,b);
	    var id0 = counter++;
	    var id1 = counter++;
	    var id2 = counter++;
	    var id3 = counter++;
	    geometry.faces.push(new THREE.Face3(id0, id1, id2));
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v0)) );
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v1)) );
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v2)) );
	    face_n++;
	    geometry.faces.push(new THREE.Face3(id1, id3, id2));
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v1)) );
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v3)) );
	    geometry.faces[face_n].vertexColors.push( mix(noise[a%ns][b%ns], image(v2)) );
	    face_n++;
	}
    }
    
    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;
    
    return new THREE.Mesh( geometry, material );

    function generate_noise()
    {
	for(var i = 0; i < ns; i++)
	{
	    noise[i] = [];
	    for(var j = 0; j < ns; j++)
	    {
		noise[i][j] = Math.random();
	    }
	}
    }

    function mix(a,b)
    {
	var c = alpha * a + (1 - alpha) * b;
	return new THREE.Color(c,c,c);
    }

    function image(vert)
    {
	var v = tange(vert);
	
	if(v.length() > 10.0)
	{
	    return 1.0;
	}
	else
	{
	    return v.length() / 10.0;
	}
    }

    function tange(v)
    {
	var ix = Math.round(v.x);
	var iy = Math.round(v.y);
	var iz = Math.round(v.z);
	var dx = (values(ix + 1, iy, iz) - values(ix - 1, iy, iz)) / 2.0;
	var dy = (values(ix, iy + 1, iz) - values(ix, iy - 1, iz)) / 2.0;
	var dz = (values(ix, iy, iz + 1) - values(ix, iy, iz - 1)) / 2.0;
	return new THREE.Vector3(dx, dy, dz);
    }
    
    function values(x,y,z)
    {
	var lines = volume.dimx;
	var slices = volume.dimx * volume.dimy;
	return volume.value[x + y*lines + z*slices];
    }
    
    function set_axis()
    {
	if(axis == 0)
	{
	    amax = volume.dimy;
	    bmax = volume.dimz;
	}
	else if(axis == 1)
	{
	    amax = volume.dimz;
	    bmax = volume.dimx;
	}
	else if(axis == 2)
	{
	    amax = volume.dimx;
	    bmax = volume.dimy;
	}
    }
    
    function make_colormap()
    {
	for ( var i = 0; i < 256; i++ )
	{
            var S = i / 255.0;
	    var R = Math.max( Math.sin( S * Math.PI / 2.0), 0.0);
	    var G = Math.max( Math.sin( S * Math.PI / 2.0), 0.0);
	    var B = Math.max( Math.sin( S * Math.PI / 2.0), 0.0);
            var color = new THREE.Color( R, G, B );
	    cmap.push(color);
	}
    }
    
    function push_vertices(a,b)
    {
	if(axis == 0)
	{
	    v0 = new THREE.Vector3(sl,a,b);
	    v1 = new THREE.Vector3(sl,a+1,b);
	    v2 = new THREE.Vector3(sl,a,b+1);
	    v3 = new THREE.Vector3(sl,a+1,b+1);
	}
	else if(axis == 1)
	{
	    v0 = new THREE.Vector3(b,sl,a);
	    v1 = new THREE.Vector3(b,sl,a+1);
	    v2 = new THREE.Vector3(b+1,sl,a);
	    v3 = new THREE.Vector3(b+1,sl,a+1);
	}
	else if(axis == 2)
	{
	    v0 = new THREE.Vector3(a,b,sl);
	    v1 = new THREE.Vector3(a+1,b,sl);
	    v2 = new THREE.Vector3(a,b+1,sl);
	    v3 = new THREE.Vector3(a+1,b+1,sl);
	}
	geometry.vertices.push(v0);
	geometry.vertices.push(v1);
	geometry.vertices.push(v2);
	geometry.vertices.push(v3);
    }
    
    function getColorMapIndex(alpha)
    {
	var smin = volume.min;
	var smax = volume.max;
	
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

}
