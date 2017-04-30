// simple three.js program

//all threejs progs need these three things:
//  a scene, a camera, and a renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, 1000
);
// args
// field of view
// aspect ratio
//     use width/height every time
//     min/max clipping plane
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,
    window.innerHeight
); // the args set the sizefor the draw area
//  for the app
// a third arg (updateStyle) can be set false
//  to render app at 1/2 resolution

document.body.appendChild(renderer.domElement);
//add the renderer object to the canvas element.

var geometry = new THREE.BoxGeometry(1, 1, 1);
//BoxGeometry streamlines the setup of all the vertices
//  and the fill of the cube
var material = new THREE.MeshBasicMaterial(
    { color: 0xcc0000 }
);
//MeshBasicMaterial will be used to paint
//the cube a color (in this case)
var cube = new THREE.Mesh(geometry, material);
//Mesh takes a geometry, and a material,
//  and applies the material to the geometry
//  which can be inserted into the scene
//scene.add(cube);
//cube will now be added to the scene

//test the Particle_Handler()
var part = new Particle_Handler(scene);

camera.position.z = 5;
//set camera's z position to 5

//a simple render loop
//this will make a loop to draw scene 60 times
//  a sec
//
function render() {
    requestAnimationFrame(render);
    //requestAnimationFrame() is like setInterval()
    //  but can do other things, like automatically
    //  pause when user chgs tabs

    //a little animation
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
}

render();
