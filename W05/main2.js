function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    var light = new THREE.PointLight(0xffffff,1.2);
    light.position.set(2,2,2);
    scene.add(light);

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var vertices = [
	[-0.5, -0.5, -0.5],
	[0.5, -0.5, -0.5],
	[0.5, -0.5, 0.5],
	[-0.5, -0.5, 0.5],
	
	[-0.5, 0.5, -0.5],
	[0.5, 0.5, -0.5],
	[0.5, 0.5, 0.5],
	[-0.5, 0.5, 0.5]
    ];

    var v0 = new THREE.Vector3().fromArray(vertices[0]);
    var v1 = new THREE.Vector3().fromArray(vertices[1]);
    var v2 = new THREE.Vector3().fromArray(vertices[2]);
    var v3 = new THREE.Vector3().fromArray(vertices[3]);
    var v4 = new THREE.Vector3().fromArray(vertices[4]);
    var v5 = new THREE.Vector3().fromArray(vertices[5]);
    var v6 = new THREE.Vector3().fromArray(vertices[6]);
    var v7 = new THREE.Vector3().fromArray(vertices[7]);

    var f0 = new THREE.Face3(0, 1, 2);//RED
    var f1 = new THREE.Face3(0, 2, 3);
    var f2 = new THREE.Face3(6, 3, 2);//BLUE
    var f3 = new THREE.Face3(3, 6, 7);
    var f4 = new THREE.Face3(2, 5, 6);//GREEN
    var f5 = new THREE.Face3(5, 2, 1);
    var f6 = new THREE.Face3(7, 5, 4);//YELLOW
    var f7 = new THREE.Face3(7, 6, 5);
    var f8 = new THREE.Face3(4, 1, 0);//PINK
    var f9 = new THREE.Face3(1, 4, 5);
    var f10 = new THREE.Face3(0, 3, 7);//SKYBLUE
    var f11 = new THREE.Face3(7, 4, 0);
    
    var geometry = new THREE.Geometry();

    geometry.vertices.push(v0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.vertices.push(v4);
    geometry.vertices.push(v5);
    geometry.vertices.push(v6);
    geometry.vertices.push(v7);
    
    geometry.faces.push(f0);
    geometry.faces.push(f1);
    geometry.faces.push(f2);
    geometry.faces.push(f3);
    geometry.faces.push(f4);
    geometry.faces.push(f5);
    geometry.faces.push(f6);
    geometry.faces.push(f7);
    geometry.faces.push(f8);
    geometry.faces.push(f9);
    geometry.faces.push(f10);
    geometry.faces.push(f11);
    
    //var material = new THREE.MeshBasicMaterial();
    //var material = new THREE.MeshLambertMaterial();
    var material = new THREE.MeshPhysicalMaterial();
    
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color = new THREE.Color(0xff4040);
    geometry.faces[1].color = new THREE.Color(0xff0000);
    geometry.faces[2].color = new THREE.Color(0x4040ff);
    geometry.faces[3].color = new THREE.Color(0x0000ff);
    geometry.faces[4].color = new THREE.Color(0x00ff00);
    geometry.faces[5].color = new THREE.Color(0x80ff80);
    geometry.faces[6].color = new THREE.Color(0xffff00);
    geometry.faces[7].color = new THREE.Color(0xffff80);
    geometry.faces[8].color = new THREE.Color(0xff40ff);
    geometry.faces[9].color = new THREE.Color(0xff00ff);
    geometry.faces[10].color = new THREE.Color(0x80ffff);
    geometry.faces[11].color = new THREE.Color(0x00ffff);

    geometry.computeFaceNormals();

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    document.addEventListener('mousedown', mouse_down_event);
    function mouse_down_event(event)
    {
	//Clicked point in window coordinates
	var x_win = event.clientX;
	var y_win = event.clientY;

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
	var intersects = raycaster.intersectObject(cube);
	if(intersects.length > 0)
	{
	    //console.log("in the box");
	    intersects[0].face.color.setRGB(1.0, 1.0, 1.0);
	    intersects[0].object.geometry.colorsNeedUpdate = true;
	}
	
	//console.log("Clicked point", x_win, ",", y_win);
	//console.log("NDC", x_NDC, ",", y_NDC);
	//console.log("world coordinate", p_wld);
    }

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.020;
        cube.rotation.y += 0.012;
        renderer.render( scene, camera );
    }
}
