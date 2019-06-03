function Bounds( v_min, v_max )
{
    var minx = v_min.x;
    var miny = v_min.y;
    var minz = v_min.z;

    var maxx = v_max.x;
    var maxy = v_max.y;
    var maxz = v_max.z;

    var v0 = new THREE.Vector3( minx, miny, minz );
    var v1 = new THREE.Vector3( maxx, miny, minz );
    var v2 = new THREE.Vector3( maxx, miny, maxz );
    var v3 = new THREE.Vector3( minx, miny, maxz );
    var v4 = new THREE.Vector3( minx, maxy, minz );
    var v5 = new THREE.Vector3( maxx, maxy, minz );
    var v6 = new THREE.Vector3( maxx, maxy, maxz );
    var v7 = new THREE.Vector3( minx, maxy, maxz );

    var group = new THREE.Group();
    group.add(new Basics());
    group.add(new XAxis());
    group.add(new YAxis());
    group.add(new ZAxis());
    return group;
    
    function Basics()
    {
	var material = new THREE.LineBasicMaterial();
	var geometry = new THREE.Geometry();
	//geometry.vertices.push( v0 ); geometry.vertices.push( v1 );  //XAxis: red
	geometry.vertices.push( v1 ); geometry.vertices.push( v2 );
	geometry.vertices.push( v2 ); geometry.vertices.push( v3 );
	//geometry.vertices.push( v3 ); geometry.vertices.push( v0 );  //ZAxis: blue
	geometry.vertices.push( v4 ); geometry.vertices.push( v5 );
	geometry.vertices.push( v5 ); geometry.vertices.push( v6 );
	geometry.vertices.push( v6 ); geometry.vertices.push( v7 );
	geometry.vertices.push( v7 ); geometry.vertices.push( v4 );
	//geometry.vertices.push( v0 ); geometry.vertices.push( v4 );  //YAxis: green
	geometry.vertices.push( v1 ); geometry.vertices.push( v5 );
	geometry.vertices.push( v2 ); geometry.vertices.push( v6 );
	geometry.vertices.push( v3 ); geometry.vertices.push( v7 );
	material.linewidth = 2;
	material.color = new THREE.Color( "black" );
	return new THREE.Line( geometry, material, THREE.LinePieces );
    }
    
    function XAxis()
    {
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial();
	geometry.vertices.push( v0 ); geometry.vertices.push( v1 );
	material.linewidth = 2;
	material.color = new THREE.Color( "red" );
	return new THREE.Line( geometry, material, THREE.LinePieces );
    }
    
    function YAxis()
    {
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial();
	geometry.vertices.push( v0 ); geometry.vertices.push( v4 );
	material.linewidth = 2;
	material.color = new THREE.Color( "green" );
	return new THREE.Line( geometry, material, THREE.LinePieces );
    }
    
    function ZAxis()
    {
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial();
	geometry.vertices.push( v3 ); geometry.vertices.push( v0 );
	material.linewidth = 2;
	material.color = new THREE.Color( "blue" );
	return new THREE.Line( geometry, material, THREE.LinePieces );
    }

}
