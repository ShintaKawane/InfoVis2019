function main()
{
    var width = 1000;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var light = new THREE.PointLight();
    light.position.set( 5, 5, 5 );
    scene.add( light );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    renderer.debug.checkShaderErrors = true;

    var geometry = new THREE.TorusKnotGeometry( 1, 0.3, 100, 20 );
    var faceColor = new THREE.Color(0x00ffff);
    for(var i = 0; i < geometry.faces.length; i++){
	geometry.faces[i].color = faceColor;
    }

    
    var material_1 = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('shader.vert.Lambertian').text,
        fragmentShader: document.getElementById('shader.frag').text,
	uniforms: {
	    light_position: {type: 'v3', value: light.position},
	}
    });

    var material_2 = new THREE.ShaderMaterial({
        vertexColors: THREE.VertexColors,
        vertexShader: document.getElementById('shader.vert.Phong').text,
        fragmentShader: document.getElementById('shader.frag').text,
	uniforms: {
	    light_position: {type: 'v3', value: light.position},
	    camera_position: {type: 'v3', value: camera.position}
	}
    });

    var torus_knot_1 = new THREE.Mesh( geometry, material_1 );
    torus_knot_1.position.set(-2,0,0);
    scene.add( torus_knot_1 );

    var torus_knot_2 = new THREE.Mesh( geometry, material_2);
    torus_knot_2.position.set(2,0,0);
    scene.add( torus_knot_2 );

    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        torus_knot_1.rotation.x += 0.01;
        torus_knot_1.rotation.y += 0.01;
	torus_knot_2.rotation.x += 0.01;
        torus_knot_2.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
