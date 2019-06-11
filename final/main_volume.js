var scene_volume = new THREE.Scene();

function main_VolumeRendering()
{
    var width = 500;
    var height = 500;

    var slice = document.getElementById("Vol_R");

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene_volume.add(ambientLight);
    
    var light = new THREE.PointLight(0xffffff);
    scene_volume.add(light);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xa0a0a0,1);
    slice.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement);

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 5000;
    var camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,0,300);
    scene_volume.add(camera);

    var trackball = new THREE.TrackballControls(camera, renderer.domElement);
    trackball.rotateSpeed = 3.0;

    var geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
    var material = new THREE.MeshLambertMaterial({color:0xff8080});
    material.opacity = 0.5;
    material.transparent = true;
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(1,1,1);
    scene_volume.add(cube);

    var bounds = new Bounds(new THREE.Vector3(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2),
    new THREE.Vector3(volume.dimx/2,volume.dimy/2,volume.dimz/2));
    scene_volume.add(bounds);
    
    //var isovalue = document.getElementById("isovalue").value;
    var p = [5, 2, -4, 3];
    var plane = SlicePlane(volume, p);
    plane.position.set(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2);
    scene_volume.add(plane);
    
    loop();

    function loop()
    {
	requestAnimationFrame(loop);
	trackball.update();
	light.position.copy(camera.position);
	renderer.render(scene_volume, camera);
    }
}
