var isovalue = 8;
var surfaces;
var scene_iso = new THREE.Scene();

function main_isosurface()
{
    var width = 500;
    var height = 500;

    var iso = document.getElementById("Iso");

    var ambientLight = new THREE.AmbientLight(0x404040);
    scene_iso.add(ambientLight);
    
    var light = new THREE.PointLight(0xffffff);
    scene_iso.add(light);
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xa0a0a0,1);
    iso.appendChild(renderer.domElement);
    //document.body.appendChild(renderer.domElement);

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 5000;
    var camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,0,300);
    scene_iso.add(camera);

    var trackball = new THREE.TrackballControls(camera, renderer.domElement);
    trackball.rotateSpeed = 3.0;

    var bounds = new Bounds(new THREE.Vector3(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2),
    new THREE.Vector3(volume.dimx/2,volume.dimy/2,volume.dimz/2));
    scene_iso.add(bounds);
    
    //var isovalue = document.getElementById("isovalue").value;
    surfaces = Isosurfaces(volume, isovalue, scene_iso);
    surfaces.position.set(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2);
    scene_iso.add(surfaces);
    
    loop();

    function loop()
    {
	requestAnimationFrame(loop);
	trackball.update();
	light.position.copy(camera.position);
	renderer.render(scene_iso, camera);
    }
}

function iso_change(v)
{
    scene_iso.remove(surfaces);
    isovalue = v;
    surfaces = Isosurfaces(volume, isovalue, scene_iso);
    surfaces.position.set(-volume.dimx/2,-volume.dimy/2,-volume.dimz/2);
    scene_iso.add(surfaces);
}
