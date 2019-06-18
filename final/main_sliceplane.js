var plane;
var scene_slice = new THREE.Scene();

function main_sliceplane()
{
    var width = 500;
    var height = 500;

    var slice = document.getElementById("Slice");

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene_slice.add(ambientLight);
    
    var light = new THREE.PointLight(0xffffff);
    scene_slice.add(light);
    
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
    scene_slice.add(camera);

    var trackball = new THREE.TrackballControls(camera, renderer.domElement);
    trackball.rotateSpeed = 3.0;

    var bounds = new Bounds(new THREE.Vector3(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2),
    new THREE.Vector3(volume.dimx/2,volume.dimy/2,volume.dimz/2));
    scene_slice.add(bounds);
    
    //var isovalue = document.getElementById("isovalue").value;
    var p = [5, 2, -4, 3];
    plane = SlicePlane(volume, p);
    plane.position.set(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2);
    scene_slice.add(plane);
    
    loop();

    function loop()
    {
	requestAnimationFrame(loop);
	trackball.update();
	light.position.copy(camera.position);
	renderer.render(scene_slice, camera);
    }
}

function change_slice()
{
    scene_slice.remove(plane);
    plane = SlicePlane(volume,
		       [document.getElementById("s_a").value,
			document.getElementById("s_b").value,
			document.getElementById("s_c").value,
			document.getElementById("s_d").value]);
    plane.position.set(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2);
    scene_slice.add(plane);
}
