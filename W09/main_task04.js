function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    //var isovalue = 10;
    //var surfaces = Isosurfaces( volume, isovalue );
    //screen.scene.add( surfaces );

    var p = [2, 3, 1, 10];
    var plane = SlicePlane( volume, p);
    screen.scene.add( plane );


    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();
}
