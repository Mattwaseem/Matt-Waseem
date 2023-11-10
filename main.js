let scene, camera, renderer, controls;

function init() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xaaaaaa); // Set a gray clear color
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //... rest of your controls setup

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
    for (let i = 1; i <= 6; i++) {
        clouds.push(createElectronShell(i * 2, shellColors[i - 1], 0.5, -(i * 2)));
    }

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
    shell.position.z = zPosition;
    scene.add(shell);
    return shell;
}

// ... rest of the code
