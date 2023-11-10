let scene, camera, renderer;
let clouds = []; // Array to store the electron clouds

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Nucleus
    const nucleusGeometry = new THREE.SphereGeometry(1, 32, 32);
    const nucleusMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    scene.add(nucleus);

    // Electron Clouds
    clouds.push(createElectronCloud(2, 0x00ff00, 0.5, -5));
    clouds.push(createElectronCloud(3, 0x0000ff, 0.3, -10));
    // More electron clouds can be added with different parameters.

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Scroll event
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Start the animation loop
    animate();
}

function createElectronCloud(radius, color, opacity, zPosition) {
    const cloudGeometry = new THREE.TorusGeometry(radius, 0.1, 16, 100);
    const cloudMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity });
    const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloud.rotation.x = Math.PI / 2; // Rotate the torus for a horizontal orientation
    cloud.position.z = zPosition; // Set the z position
    scene.add(cloud);
    return cloud;
}

function onWindowResize() {
    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseWheel(event) {
    // This will zoom the camera in and out
    camera.position.z += event.deltaY * 0.01;
    // Clamp the camera's position so it doesn't go too far in or out
    camera.position.z = Math.max(camera.position.z, 1);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate clouds here if needed

    renderer.render(scene, camera);
}

init();
