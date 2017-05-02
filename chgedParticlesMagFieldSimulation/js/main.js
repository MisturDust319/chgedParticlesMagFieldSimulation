//object to hold the state of various things
state = {
    play: true, //if true, keep updateing positions
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

camera.position.z = 10;

var particle1 = new ChargedParticle(scene);
particle1.setCharge(1e-10000);
var particle2 = new ChargedParticle(scene);
particle2.setCharge(1e-10000);

particle1.setPosition(new THREE.Vector3(
    0, 0, 0
));
particle2.setPosition(new THREE.Vector3(
    2, 0, 0
));

particle1.setVelocity(new THREE.Vector3(
    0, 1, 0
));
particle2.setVelocity(new THREE.Vector3(
    0, 0, 0
));

//set camera's z position to 5

//a simple render loop
//this will make a loop to draw scene 60 times
//  a sec
function render() {
    renderer.setClearColor("#000000", 1);

    requestAnimationFrame(render);
    //requestAnimationFrame() is like setInterval()
    //  but can do other things, like automatically
    //  pause when user chgs tabs

    if (state.play) {
        //get each particle's corresponding mag field
        var field1 = particle1.get_magnetic_field(particle2.getPosition());
        var field2 = particle1.get_magnetic_field(particle1.getPosition());

        //get the appropriate mag forces
        var force1 = force_mag_point(
            particle1.charge,
            particle1.velocity,
            field1
        )
        var force2 = force_mag_point(
            particle2.charge,
            particle2.velocity,
            field2
        )

        //apply the forces
        particle1.applyForce([force2]);
        particle2.applyForce([force1]);

        //then update position
        particle1.update();
        particle2.update();
    }
    renderer.render(scene, camera);
}

render();
