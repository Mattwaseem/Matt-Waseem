// Define the main scene components: scene, camera, renderer, and controls
let scene, camera, renderer, controls;
let clouds = []; // Array to store the electron clouds
let goldNucleus; // This will hold the Mesh for the gold nucleus

function init() {
    // Create the main scene object
    scene = new THREE.Scene();

    // Set up the camera with a perspective view
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // Position the camera for a good view of the scene
    camera.position.set(0, 0, 50);

    // Set up the WebGL renderer and append it to the DOM
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xaaaaaa); // Set background color to a light grey
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Initialize orbit controls for the camera
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable smooth dampening to the controls
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 5; // Minimum distance for zooming in
    controls.maxDistance = 100; // Maximum distance for zooming out

    // Add ambient light to the scene for soft general illumination
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create the nucleus of the gold atom
    goldNucleus = createAtom(0, 0, 0, 0xFFD700); // Use gold color for the nucleus

    // Electron Shells: Create multiple shells with different radii and colors
    const shellColors = [0xff0000, 0xff8c00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082];
    shellColors.forEach((color, index) => {
        // Multiply the index by 2 and subtract to space out the shells evenly
        clouds.push(createElectronShell((index + 1) * 2, color, 0.5, -(index + 1) * 5));
    });

    // Add event listeners for window resizing and mouse wheel scrolling
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('wheel', onDocumentMouseWheel, false);

    // Start the animation loop
    animate();
}

// Function to create an electron shell with a specific radius, color, opacity, and position
function createElectronShell(radius, color, opacity, zPosition) {
    // Create a spherical geometry for the shell
    const shellGeometry = new THREE.SphereGeometry(radius, 32, 32);
    // Create a material that is basic (not affected by light), colored, transparent, and wireframed
    const shellMaterial = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, wireframe: true });
    // Create a mesh from the geometry and material
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    // Set the position of the shell
    shell.position.set(0, 0, zPosition);
    // Add the shell to the scene
    scene.add(shell);
    return shell;
}

// Function to handle window resizing events
function onWindowResize() {
    // Adjust the camera's aspect ratio and update its projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // Update the renderer's size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to handle mouse wheel events for zooming
function onDocumentMouseWheel(event) {
    // Calculate the zoom amount based on the scroll direction
    const zoomAmount = event.deltaY * 0.01;
    // Zoom in or out based on the wheel movement
    controls.dollyIn(Math.pow(0.95, zoomAmount));
}

// The animation loop function, which repeatedly renders the scene
function animate() {
    // Log to console for debugging
    console.log('Animating...');
    // Request the next frame to keep the loop going
    requestAnimationFrame(animate);
    // Update the controls based on interactions
    controls.update();
    // Render the scene from the camera's perspective
    renderer.render(scene, camera);
}

// Function to create an atom at a given position with a given color
function createAtom(x, y, z, color) {
    // Define the geometry and material for the atom
    const atomGeometry = new THREE.SphereGeometry(1, 32, 32);
    const atomMaterial = new THREE.MeshBasicMaterial({ color: color });
    // Create the mesh and set its position
    const atom = new THREE.Mesh(atomGeometry, atomMaterial);
    atom.position.set(x, y, z);
    // Add the atom to the scene
    scene.add(atom);
    return atom;
}

// Function to handle mouse click events for interaction
function onDocumentMouseClick(event) {
    event.preventDefault();
    // Normalize the mouse position from the event coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // Set up the raycaster using the mouse position and camera
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    // Calculate objects intersecting the picking ray (click ray)
    const intersects = raycaster.intersectObjects([goldNucleus]);
    // If the gold nucleus is clicked, execute some logic
    if (intersects.length > 0) {
        // For example, show some information about the nucleus
        console.log("Gold nucleus clicked!");
    }
}

// Add event listeners to HTML elements by their ID for page navigation
document.getElementById('contactMe').addEventListener('click', function () {
    // Navigate to the contact page
});

document.getElementById('more').addEventListener('click', function () {
    // Navigate to the more information page
});

document.getElementById('projects').addEventListener('click', function () {
    // Open the GitHub profile or projects page
});

// Call the init function to set up the scene
init();
