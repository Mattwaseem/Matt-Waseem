let scene, camera, renderer, controls;
let clouds = []; // Array to store the electron clouds

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50); // Adjust for a good view of the shells

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xaaaaaa); // Set a gray clear color
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 5; // The minimum distance for zooming in
    controls.maxDistance = 100; // The maximum distance for zooming out

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(1, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Electron Shells
    const shellColors = [0xff0000, 0xff8c00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082]; // Colors for each shell
    shellColors.forEach((color, index) => {
        clouds.push(createElectronShell((index + 1) * 2, color, 0.5, -(index + 1) * 5));
    });

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Scroll event
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Start the animation loop
    animate();
}

function createElectronShell(radius, color, opacity, zPosition) {
    const shellGeometry = new THREE.SphereGeometry(radius, 32, 32);
    const shellMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, wireframe: true });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    shell.position.set(0, 0, zPosition);
    scene.add(shell);
    return shell;
}

function onWindowResize() {
    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseWheel(event) {
    // Adjust the camera zoom based on the scroll direction
    const zoomAmount = event.deltaY * 0.01;
    controls.dollyIn(Math.pow(0.95, zoomAmount));
}

function animate() {
    console.log('Animating...'); // This should appear repeatedly in the console
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


init();
