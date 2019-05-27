function SlicePlane( volume, p )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    material.vertexColors = THREE.VertexColors;
    
    var smin = volume.min_value;
    var smax = volume.max_value;
    //isovalue = KVS.Clamp( isovalue, smin, smax );

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
	var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        //cmap.push( [ S, '0x' + color.getHexString() ] );
	cmap.push(color);
    }
    
    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
    console.log(p);

    var lines = volume.resolution.x;
    var slices = volume.resolution.x * volume.resolution.y;

    var face_n = 0;
    
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
		//var isovalue = x * p[0] + y * p[1] + z * p[2] + p[3];
		//var isovalue = 60;
                var indices = cell_node_indices( cell_index++ );
                //var index = table_index( indices );
		var index = table_index( indices, x, y, z );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    /*var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );*/

		    var C0 = interpolate_color(v0, v1);
		    var C1 = interpolate_color(v2, v3);
		    var C2 = interpolate_color(v4, v5);

		    var v01 = interpolated_vertex( v0, v1, 0 );
                    var v23 = interpolated_vertex( v2, v3, 0 );
                    var v45 = interpolated_vertex( v4, v5, 0 );

		    //geometry.colors.push(cmap[volume.values[v01.x + v01.y*lines + v01.z*slices]]);
		    //geometry.colors.push(cmap[volume.values[v23.x + v23.y*lines + v23.z*slices]]);
		    //geometry.colors.push(cmap[volume.values[v45.x + v45.y*lines + v45.z*slices]]);

		    //geometry.colors.push(cmap[0]);
		    //geometry.colors.push(cmap[200]);
		    //geometry.colors.push(cmap[100]);

		    //geometry.colors.push( new THREE.Color( 'skyblue' ) );
		    //geometry.colors.push( new THREE.Color( 'skyblue' ) );
		    //geometry.colors.push( new THREE.Color( 'skyblue' ) );
		    
                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
		    
		    //var C0 = cmap[volume.values[v01.x + v01.y*lines + v01.z*slices]];
		    //var C1 = cmap[volume.values[v23.x + v23.y*lines + v23.z*slices]];
		    //var C2 = cmap[volume.values[v45.x + v45.y*lines + v45.z*slices]];
	
		    //var C0 = cmap[ 200 ];
		    //var C1 = cmap[ 200 ];
		    //var C2 = cmap[ 200 ];
		    geometry.faces[face_n].vertexColors.push( C0 );
		    geometry.faces[face_n].vertexColors.push( C1 );
		    geometry.faces[face_n].vertexColors.push( C2 );
		    face_n++;
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();

    /*var faceColor = new THREE.Color(0x00ffff);
    for(var i = 0; i < geometry.vertices.length; i++){
        geometry.colors[i] = faceColor;
    }*/
    
    geometry.colorsNeedUpdate = true;
    //material.color = new THREE.Color( "red" );
    //material.color = cmap[isovalue];
    //var return_mesh = new THREE.Mesh( geometry, material );
    //return_mesh.vertexColors = THREE.VertexColors;
    
    //return return_mesh;
    //material.vertexColors = THREE.VertexColors;

    
    // Assign colors for each vertex
    //material.vertexColors = THREE.VertexColors;
    //for ( var i = 0; i < geometry.faces.length; i++ )
    //{
        /*var id = faces[i];
        var S0 = scalars[ id[0] ];
        var S1 = scalars[ id[1] ];
        var S2 = scalars[ id[2] ];
        var S0 = Math.round(a*S0+b);
        var S1 = Math.round(a*S1+b);
        var S2 = Math.round(a*S2+b);
        console.log(S0,S1,S2);*/
	//cmap[volume.values[v01.x + v01.y*lines + v01.z*slices]]
	
        //var C0 = cmap[ 200 ];
        //var C1 = cmap[ 200 ];
        //var C2 = cmap[ 200 ];
        //geometry.faces[i].vertexColors.push( C0 );
        //geometry.faces[i].vertexColors.push( C1 );
        //geometry.faces[i].vertexColors.push( C2 );
    //}
    
    return new THREE.Mesh( geometry, material );

    function interpolate_color(v0, v1)
    {
	var s0 = volume.values[v0.x + v0.y*lines + v0.z*slices];
	var s1 = volume.values[v1.x + v1.y*lines + v1.z*slices];

	var ai0 = Math.round();

	//function getColorMapIndex(alpha, minV, maxV, n)
	if ( s0 <= smin ) {
	    s0 = smin;
	} else if ( s0 >= smax ) {
	    s0 = smax;
	}
	s0 = ( s0 - smin ) / ( smax - smin );
	var cp0 = Math.round ( s0 * 256 );
	cp0 == 256 ? cp0 -= 1 : cp0;

	if ( s1 <= smin ) {
	    s1 = smin;
	} else if ( s1 >= smax ) {
	    s1 = smax;
	}
	s1 = ( s1 - smin ) / ( smax - smin );
	var cp1 = Math.round ( s1 * 256 );
	cp1 == 256 ? cp1 -= 1 : cp1;


	
	var c0 = cmap[cp0];
	var c1 = cmap[cp1];

	/*var ratio = Math.abs(v0 / (v1 - v0));
	var R_p = c0.r + ratio * (c1.r - c0.r);
	var G_p = c0.g + ratio * (c1.g - c0.g);
	var B_p = c0.b + ratio * (c1.b - c0.b);
	
	return new THREE.Color(R_p, G_p, B_p);*/
	return c1;
    }

    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;

        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices, x, y, z )
    {
        /*var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }*/
	
	var s0 = (x  )*p[0] + (y  )*p[1] + (z  )*p[2] + p[3];
        var s1 = (x+1)*p[0] + (y  )*p[1] + (z  )*p[2] + p[3];
        var s2 = (x+1)*p[0] + (y  )*p[1] + (z+1)*p[2] + p[3];
        var s3 = (x  )*p[0] + (y  )*p[1] + (z+1)*p[2] + p[3];
        var s4 = (x  )*p[0] + (y+1)*p[1] + (z  )*p[2] + p[3];
        var s5 = (x+1)*p[0] + (y+1)*p[1] + (z  )*p[2] + p[3];
        var s6 = (x+1)*p[0] + (y+1)*p[1] + (z+1)*p[2] + p[3];
        var s7 = (x  )*p[0] + (y+1)*p[1] + (z+1)*p[2] + p[3];

        var index = 0;
        if ( s0 > 0 ) { index |=   1; }
        if ( s1 > 0 ) { index |=   2; }
        if ( s2 > 0 ) { index |=   4; }
        if ( s3 > 0 ) { index |=   8; }
        if ( s4 > 0 ) { index |=  16; }
        if ( s5 > 0 ) { index |=  32; }
        if ( s6 > 0 ) { index |=  64; }
        if ( s7 > 0 ) { index |= 128; }

        return index;
    }

    function interpolated_vertex( v0, v1, s )
    {
	/*var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;
	var vx = interpolate_two_point(v0.x, v1.x, volume.values[v0.x + v0.y*lines + v0.z*slices], volume.values[v1.x + v1.y*lines + v1.z*slices], s);
	var vy = interpolate_two_point(v0.y, v1.y, volume.values[v0.x + v0.y*lines + v0.z*slices], volume.values[v1.x + v1.y*lines + v1.z*slices], s);
	var vz = interpolate_two_point(v0.z, v1.z, volume.values[v0.x + v0.y*lines + v0.z*slices], volume.values[v1.x + v1.y*lines + v1.z*slices], s);
	return new THREE.Vector3(vx, vy, vz);*/

	var pv0 = v0.x*p[0] + v0.y*p[1] + v0.z*p[2] + p[3];
	var pv1 = v1.x*p[0] + v1.y*p[1] + v1.z*p[2] + p[3];
	var ratio = Math.abs(pv0 / (pv1 - pv0));
	var vx = (1.0 - ratio) * v0.x + ratio * v1.x;
	var vy = (1.0 - ratio) * v0.y + ratio * v1.y;
	var vz = (1.0 - ratio) * v0.z + ratio * v1.z;
	
	/*var vx = interpolate_two_point(v0.x, v1.x, pv0, pv1, s);
	var vy = interpolate_two_point(v0.y, v1.y, pv0, pv1, s);
	var vz = interpolate_two_point(v0.z, v1.z, pv0, pv1, s);*/
	return new THREE.Vector3(vx, vy, vz);
	
        //return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }

    function interpolate_two_point(a, b, v0, v1, x)
    {
	return a + (b-a) * (x-v0) / (v1-v0);
    }
    
}