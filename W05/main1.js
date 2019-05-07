function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var light = new THREE.PointLight(0xffffff);
    light.position.set(1,1,1);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff,0.3);
    light2.position.set(-1,-1,-1);
    scene.add(light2);

    //var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    //directionalLight.position.set(THREE.Object3D.DefaultDown);
    //scene.add(directionalLight);

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
    var f3 = new THREE.Face3(6, 7, 3);
    var f4 = new THREE.Face3(6, 2, 5);//GREEN
    var f5 = new THREE.Face3(5, 2, 1);
    var f6 = new THREE.Face3(0, 2, 3);
    var f7 = new THREE.Face3(0, 2, 3);
    var f8 = new THREE.Face3(0, 2, 3);
    var f9 = new THREE.Face3(0, 2, 3);
    var f10 = new THREE.Face3(0, 2, 3);
    var f11 = new THREE.Face3(0, 2, 3);
    
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

    var material = new THREE.MeshBasicMaterial();
    //var material = new THREE.MeshLambertMaterial();
    //var material = new THREE.MeshNormalMaterial();
    //var material = new THREE.MeshLambertMaterial({color: 0x80ffff});
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color = new THREE.Color(0xff0000);
    geometry.faces[1].color = new THREE.Color(0xff4040);
    geometry.faces[2].color = new THREE.Color(0x0000ff);
    geometry.faces[3].color = new THREE.Color(0x4040ff);
    geometry.faces[4].color = new THREE.Color(0x00ff00);
    geometry.faces[5].color = new THREE.Color(0x80ff80);

    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );


    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.025;
        cube.rotation.y += 0.015;
        renderer.render( scene, camera );
    }
}
