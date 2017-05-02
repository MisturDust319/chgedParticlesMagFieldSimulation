//object to hold the state of various things
state = {
    play: false, //if true, keep updateing positions
    //start at false to prevent the particle from moving
    //from start
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

        this.update = function () {
            var temp_vec = new THREE.Vector3(0, 0, 0);
            temp_vec = this.particle.getPosition();
            this["pos x"] = temp_vec.x;
            this["pos y"] = temp_vec.y;
            this["pos z"] = temp_vec.z;

            temp_vec = this.particle.velocity.clone();
            this["vel x"] = temp_vec.x;
            this["vel y"] = temp_vec.y;
            this["vel z"] = temp_vec.z;

            temp_vec = this.particle.acceleration.clone();
            this["accel x"] = temp_vec.x;
            this["accel y"] = temp_vec.y;
            this["accel z"] = temp_vec.z;

            temp_vec = this.particle.magnetic_field.clone();
            this["mag x"] = temp_vec.x;
            this["mag y"] = temp_vec.y;
            this["mag z"] = temp_vec.z; 
        }
    }

    //add in the guis
    this.menu = new MainMenu();
    
    //create menu obj, and a GUI obj
    var gui = new dat.GUI();
    var statsGui = new dat.GUI();

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
    //listen won't work as the menu's position
    //  isn't exactly the same as the particle's

    f_position.add(this.menu, 'apply new position');
    f_position.open();

    var f_velocity = gui.addFolder('velocity');
    f_velocity.add(this.menu, 'vel x');
    f_velocity.add(this.menu, 'vel y');
    f_velocity.add(this.menu, 'vel z');
    //listen won't work as the menu's velocity
    //  isn't exactly the same as the particle's

    f_velocity.add(this.menu, 'apply new velocity');
    f_velocity.open();

    var f_acceleration = gui.addFolder('acceleration');
    f_acceleration.add(this.menu, 'accel x');
    f_acceleration.add(this.menu, 'accel y');
    f_acceleration.add(this.menu, 'accel z');
    //listen won't work as the menu's acceleration
    //  isn't exactly the same as the particle's

    f_acceleration.add(this.menu, 'apply new acceleration');
    f_acceleration.open();

    var f_magnetic_field = gui.addFolder('magnetic_field');
    f_magnetic_field.add(this.menu, 'mag x');
    f_magnetic_field.add(this.menu, 'mag y');
    f_magnetic_field.add(this.menu, 'mag z');
    //listen won't work as the menu's magnetic_field
    //  isn't exactly the same as the particle's

    f_magnetic_field.add(this.menu, 'apply new magnetic field');
    f_magnetic_field.open();

    //populate the stats menu
    //position data
    statsGui.add(this.menu, "pos x").listen();
    statsGui.add(this.menu, "pos y").listen();
    statsGui.add(this.menu, "pos z").listen();
    //velocity data
    statsGui.add(this.menu, "vel x").listen();
    statsGui.add(this.menu, "vel y").listen();
    statsGui.add(this.menu, "vel z").listen();
    //accel data
    statsGui.add(this.menu, "accel x").listen();
    statsGui.add(this.menu, "accel y").listen();
    statsGui.add(this.menu, "accel z").listen();
    //mag data
    statsGui.add(this.menu, "mag x").listen();
    statsGui.add(this.menu, "mag y").listen();
    statsGui.add(this.menu, "mag z").listen();
    statsGui.close();
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
        //update gui
        supervisor.menu.update();

        //update position
        for (var key in supervisor.particles) {
            supervisor.particles[key].update();
        }
    }
    renderer.render(scene, camera);
}

render();
