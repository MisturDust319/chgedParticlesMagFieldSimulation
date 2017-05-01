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
//add some light
var lighting = new THREE.PointLight("#2E2E09", 1, 100);
scene.add(lighting);

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
//var part = new Particle_Handler(scene);



var Supervisor = function (scene) {
    //holds particles for simulation
    this.particles = {
        "particle 1": new ChargedParticle(scene)
    }
    var supervisor = this; //for helping
    //keep things organized

    //set up GUI
    var MainMenu = function () {
        this.addParticle = function () {
            console.log("Dummy for addParticle");
            console.log("update particle list");
        }
        this.play_pause = function () {
            state.play = !(state.play);
        }
        this.particles = supervisor.particles;
        //particles is a list of particles
        //particle is the current particle we are editing
        this.particle = this.particles["particle 1"];

        //particle stats
        this.mass = this.particle.mass;
        this.charge = this.particle.charge;

        var temp_vec = new THREE.Vector3(0, 0, 0);
        //create a vec to hold the values from the particle
        temp_vec= this.particle.mesh.position;
        //store the particles' position
        this["pos x"] = temp_vec.getComponent(0);
        this["pos y"] = temp_vec.getComponent(1);
        this["pos z"] = temp_vec.getComponent(2);
        
        this["apply new position"] = function () {

            this.particle.setPosition(
                new THREE.Vector3(
                    this["pos x"],
                    this["pos y"],
                    this["pos z"]
                )
            );

            //set the position of the selected particle
            //console.log(this.particle.position.z);
            //console.log(this["pos z"]);

        }
        
        //create a vec to hold the values from the particle
        temp_vec = this.particle.velocity;
        //store the particles' velocity
        
        this["vel x"] = temp_vec.getComponent(0);
        this["vel y"] = temp_vec.getComponent(1);
        this["vel z"] = temp_vec.getComponent(2);

        this["apply new velocity"] = function () {
            this.particle.velocity = new THREE.Vector3(
                this["vel x"],
                this["vel y"],
                this["vel z"]
            );
            //set the velocity of the selected particle
        }

        //create a vec to hold the values from the particle
        temp_vec = this.particle.acceleration;
        //store the particles' acceleration\
        
        this["accel x"] = temp_vec.getComponent(0);
            this["accel y"] = temp_vec.getComponent(1);
            this["accel z"] = temp_vec.getComponent(2);

        this["apply new acceleration"] = function () {
            this.particle.acceleration = new THREE.Vector3(
                this["accel x"],
                this["accel y"],
                this["accel z"]
            );
            //set the acceleration of the selected particle
        }

        //create a vec to hold the values from the particle
        temp_vec = this.particle.magnetic_field;
        //store the particles' magnetic_field
        
        this["mag x"] = temp_vec.getComponent(0);
        this["mag y"] = temp_vec.getComponent(1);
        this["mag z"] = temp_vec.getComponent(2);
        this["apply new magnetic field"] = function () {
            this.particle.magnetic_field = new THREE.Vector3(
                this["mag x"],
                this["mag y"],
                this["mag z"]
                //set the magnetic_field of the selected particle
            );
        }
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
    gui.add(this.menu, "particle", this.menu.particles);

    //particle stats
    var f_position = gui.addFolder('position');
    f_position.add(this.menu, 'pos x');
    f_position.add(this.menu, 'pos y');
    f_position.add(this.menu, 'pos z');

    f_position.add(this.menu, 'apply new position');
    
}

var supervisor = new Supervisor(scene);
camera.position.z = 5;
//set camera's z position to 5
//a simple render loop
//this will make a loop to draw scene 60 times
//  a sec
//
function render() {
    renderer.setClearColor("#000000", 1);

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
