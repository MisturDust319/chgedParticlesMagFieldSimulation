//object to hold the state of various things
var state = {
    play: true, //if true, keep updateing positions
}
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


//test the Particle_Handler()
var part = new Particle_Handler(scene);

//set up GUI
var MainMenu = function() {
    this.addParticle = function () {
        console.log("Dummy for addParticle")
    }
}
var menu = new MainMenu();
var gui = new dat.GUI();
gui.add(menu, "addParticle");


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
    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
    if (state.play) {
        console.log("Update dummy");
    }
    renderer.render(scene, camera);
}

render();
