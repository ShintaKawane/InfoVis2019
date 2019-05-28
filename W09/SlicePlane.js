function SlicePlane( volume, p )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();
    
    var smin = volume.min_value;
    var smax = volume.max_value;

    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0;
	var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
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
                var indices = cell_node_indices( cell_index++ );
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

		    var v01 = interpolated_vertex( v0, v1);
                    var v23 = interpolated_vertex( v2, v3);
                    var v45 = interpolated_vertex( v4, v5);

		    var C0 = volume.values[v0.x + v0.y*lines + v0.z*slices];
		    var C1 = volume.values[v1.x + v1.y*lines + v1.z*slices];
		    var C2 = volume.values[v2.x + v2.y*lines + v2.z*slices];
		    var C3 = volume.values[v3.x + v3.y*lines + v3.z*slices];
		    var C4 = volume.values[v4.x + v4.y*lines + v4.z*slices];
		    var C5 = volume.values[v5.x + v5.y*lines + v5.z*slices];
		    
		    var C01 = interpolate_color(C0, C1);
		    var C23 = interpolate_color(C2, C3);
		    var C45 = interpolate_color(C4, C5);

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
		    
		    geometry.faces[face_n].vertexColors.push( C01 );
		    geometry.faces[face_n].vertexColors.push( C23 );
		    geometry.faces[face_n].vertexColors.push( C45 );
		    face_n++;
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();
    material.vertexColors = THREE.VertexColors;
    material.side = THREE.DoubleSide;

    return new THREE.Mesh( geometry, material );

    function cell_node_indices( cell_index )
    {
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
	var s0 = (x  )*p[0] + (y  )*p[1] + (z  )*p[2] + p[3];
        var s1 = (x+1)*p[0] + (y  )*p[1] + (z  )*p[2] + p[3];
        var s2 = (x+1)*p[0] + (y+1)*p[1] + (z  )*p[2] + p[3];
        var s3 = (x  )*p[0] + (y+1)*p[1] + (z  )*p[2] + p[3];
        var s4 = (x  )*p[0] + (y  )*p[1] + (z+1)*p[2] + p[3];
        var s5 = (x+1)*p[0] + (y  )*p[1] + (z+1)*p[2] + p[3];
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

    function interpolated_vertex(v0, v1)
    {
	var pv0 = v0.x*p[0] + v0.y*p[1] + v0.z*p[2] + p[3];
	var pv1 = v1.x*p[0] + v1.y*p[1] + v1.z*p[2] + p[3];

	var ratio = Math.abs(pv0 / (pv1 - pv0));
	var vx = v0.x * (1.0 - ratio) + v1.x * ratio;
	var vy = v0.y * (1.0 - ratio) + v1.y * ratio;
	var vz = v0.z * (1.0 - ratio) + v1.z * ratio;
	
	return new THREE.Vector3(vx, vy, vz);	
        //return new THREE.Vector3().addVectors( v0, v1 ).divideScalar( 2 );
    }
    
    function interpolate_color(val0, val1)
    {
	var c0 = cmap[val0];
	var c1 = cmap[val1];

	var R_p = (c0.r + c1.r) / 2;
	var G_p = (c0.g + c1.g) / 2;
	var B_p = (c0.b + c1.b) / 2;

	/*var ratio = Math.abs(val0 / (val1 - val0));
	var R_p = c0.r * (1.0 - ratio) + c1.r * ratio;
	var G_p = c0.g * (1.0 - ratio) + c1.g * ratio;
	var B_p = c0.b * (1.0 - ratio) + c1.b * ratio;*/

	return new THREE.Color(R_p, G_p, B_p);
    }

}
