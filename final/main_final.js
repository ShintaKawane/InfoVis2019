function main()
{
    var width = 500;
    var height = 500;
    
    console.log("Hello");
    var scene = new THREE.Scene();

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    var light = new THREE.PointLight(0xffffff);
    scene.add(light);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xa0a0a0,1);
    document.body.appendChild(renderer.domElement);

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,0,20);
    scene.add(camera);

    var trackball = new THREE.TrackballControls(camera, renderer.domElement);
    trackball.rotateSpeed = 3.0;

    var geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
    var material = new THREE.MeshLambertMaterial({color:0xff8080});
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(1,1,1);
    scene.add(cube);

    /*var value = [
	[[ 1, 2, 3],[ 4, 5, 6],[ 7, 8, 9]],
	[[10,11,12],[13,14,15],[16,17,18]],
	[[19,20,21],[22,23,24],[25,26,27]]
    ];
    console.log(value[1][2][0]);*/

    loop();

    function loop()
    {
	requestAnimationFrame(loop);
	trackball.update();
	light.position.copy(camera.position);
	renderer.render(scene, camera);
    }
}
