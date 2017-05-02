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

camera.position.z = 10;

var particle1 = new ChargedParticle(scene);
particle1.setCharge(1);
particle1.setPosition(new THREE.Vector3(
    0.0, 2.5, 0.0
));
particle1.setVelocity(new THREE.Vector3(
    1.0, 0.0, 0.0
));

var B = new THREE.Vector3(0.0, 0.0, 1.0);

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
        var force = force_mag_point(
            particle1.charge,
            particle1.velocity,
            B
        )

        //apply the forces
        particle1.applyForce([force]);

        //then update position
        particle1.update();
    }
    renderer.render(scene, camera);
}

render();
