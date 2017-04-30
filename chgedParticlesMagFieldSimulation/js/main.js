//object to hold the state of various things
state = {
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



var Supervisor = function () {
    //holds particles for simulation
    this.particles = [];
    var supervisor = this; //for helping
    //keep things organized

    //set up GUI
    var MainMenu = function () {
        this.addParticle = function () {
            console.log("Dummy for addParticle");
        }
        this.play_pause = function () {
            state.play = !(state.play);
        }
        this.particles = supervisor.particles;
    }

    this.menu = new MainMenu();

    //create menu obj, and a GUI obj
    var gui = new dat.GUI();

    //used for tracking the # of particles by type
    this.electronCount = 0;
    this.protonCount = 0;

    //attacch items to GUI
    gui.add(this.menu, "play_pause");

    gui.add(this.menu, "addParticle");
    gui.add(this.menu, "particles", this.menu.particles);
    
}

var supervisor = new Supervisor();
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
