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

    // Inside the init function after setting up camera and controls
    camera.position.set(0, 0, 50); // Set the camera far enough to see many atoms
    controls.target.set(0, 0, 0); // Look at the center of the scene
    controls.update();


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

function createAtom(x, y, z, color) {
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Adjust the size as needed
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: color });
    const atom = new THREE.Mesh(sphereGeometry, sphereMaterial);
    atom.position.set(x, y, z);
    scene.add(atom);
    return atom;
}

function createBond(atom1, atom2, color) {
    const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, atom1.position.distanceTo(atom2.position), 8);
    const bondMaterial = new THREE.MeshBasicMaterial({ color: color });
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);

    // Position
    const midpoint = new THREE.Vector3().addVectors(atom1.position, atom2.position).multiplyScalar(0.5);
    bond.position.copy(midpoint);

    // Rotation
    bond.lookAt(atom2.position);

    // Scale
    bond.scale.z = atom1.position.distanceTo(atom2.position);

    scene.add(bond);
    return bond;
}


function generateMolecularBackground() {
    const numAtoms = 100; // The number of atoms you want to create
    for (let i = 0; i < numAtoms; i++) {
        // Random positions
        const x = Math.random() * 100 - 50; // Random x between -50 and 50
        const y = Math.random() * 100 - 50; // Random y between -50 and 50
        const z = Math.random() * 100 - 50; // Random z between -50 and 50

        // Create the atom
        const color = new THREE.Color(Math.random(), Math.random(), Math.random()); // Random color
        createAtom(x, y, z, color);
    }

    // After creating atoms, you could randomly pick pairs and create bonds
}


function init() {
    // ... (rest of your setup code)

    // Generate the molecular background
    generateMolecularBackground();

    // ... (rest of your setup code)
}
