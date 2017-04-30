var TEST_MASS = 1

function Particle_Handler(scene) {
    //make a new 3d sphere mesh
    this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial(
            { color: "#ffff00" }
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