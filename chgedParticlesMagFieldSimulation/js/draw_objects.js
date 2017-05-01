var TEST_MASS = 1

function Particle_Handler(scene) {
    //make a new 3d sphere mesh
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: "#ffff00" });

    //add a charged particle
    this.particle = new ChargedParticle(TEST_MASS);

    this.mesh = new THREE.Mesh(
        this.geometry,
        this.material
    );

   

    scene.add(this.mesh);
 
}

Particle_Handler.prototype = {
    geometry: null,
    material: null,
    particle: null,
    color: "#ffff00",
    mesh: null,
    update: function () {
        //bind the mesh's position to the particles
        this.mesh.position =
            this.particle.position;
    }
}