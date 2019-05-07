function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x303030);
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
    var material = new THREE.MeshLambertMaterial();

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


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.020;
        cube.rotation.y += 0.012;
        renderer.render( scene, camera );
    }
}
