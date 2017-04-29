var TEST_MASS = 1

var 

function Particle_Handler() {
    //make a new 3d sphere mesh
    this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshBasicMaterial(
            { color: this.color }\
        )
    );

    scene.add(this.mesh);
 
}

Particle_Handler.prototype = {
    particle: new Particle(TEST_MASS),
    color: "#ffff00",
    mesh: null,
    update: function () {
        console.log("particle update dummy func");
    }
}