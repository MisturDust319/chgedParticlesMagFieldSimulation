consts = {
    fundamental_charge: 1.61e-19
};

function Particle(scene, start_mass, obj_color) {
    //default color setting
    if (!obj_color) {
        obj_color = "#ffff00";
    }
    //default mass
    if (!start_mass) {
        start_mass = 1.0;
    }
    //make a new 3d sphere mesh
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: obj_color });

    this.mesh = new THREE.Mesh(
        geometry,
        material
    );
    //add it to scene
    scene.add(this.mesh);


    //basic properties of a particle
    this.mass = start_mass;
    //init this object with the time it was created
    this.time = Date.now();
    //any position data will use the mesh's position
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
}

Particle.prototype = {
    mass: 0,
    position: null,
    velocity: null,
    acceleration: null,
    time: 0,
    setPosition: function (new_position) {
        //console.log(new_position.toString);
        //check if new_postion is 3vec
        //if not, throw type error
        //if (!(Object.prototype.toString.call(new_position) == "THREE.Vector3")) {
        //    throw new TypeError("you must pass a THREE.Vector3 obj\n as input for setPosition");
        //}
        //else {

        this.mesh.position.set(
            new_position.x,
            new_position.y,
            new_position.z
      );
            //if the data type is valid, change
            //this.position to new_position
        //}
    },
    getPosition: function () {
        //returns the particle mesh's position
        //as a three.js Vector3
        return this.mesh.position.clone();
    },
    setVelocity: function (new_velocity) {
        //check if new_velocity is 3vec
        //if not, throw type error
        //if (!(Object.prototype.toString.call(new_velocity) = "THREE.Vector3")) {
        //    throw new TypeError("you must pass a THREE.Vector3 obj\n as input for setvelocity");
        //}
        //else {
        this.velocity.set(
            new_velocity.x,
            new_velocity.y,
            new_velocity.z
        );
            //if the data type is valid, change
            //this.velocity to new_velocity
        //}
    },
    setAcceleration: function (new_acceleration) {
        //check if new_acceleration is 3vec
        //if not, throw type error
        //if (!(Object.prototype.toString.call(new_acceleration) = "THREE.Vector3")) {
        //    throw new TypeError("you must pass a THREE.Vector3 as input.");
        //}
        //else {
            this.acceleration = new_acceleration;
            //if the data type is valid, change
            //this.acceleration to new_acceleration
        //}
    },
    changePosition: function (time) {
        //store the old position to get speed
        var old_pos = this.getPosition();

        //s_f = s_i + vt + 0.5a*t^2
        //a simple kinematics equation
        //  applied in a not so simple way...
        var velocity_comp = this.velocity.clone().multiplyScalar(
            time);
        var accel_comp =
            this.acceleration.clone().multiplyScalar(
                time * time / 2
            );
        var new_pos = this.getPosition().addVectors(
            velocity_comp,
            accel_comp
        );
        this.setPosition(
            new_pos
        );

        this.setVelocity(
            new_pos.clone().sub(old_pos)
        );
    },
    accelerate: function (acceleration_vectors) {
        this.setAcceleration(acceleration_vectors.reduce(function (prev, cur) {
            prev.add(cur);
            //just a vector sum of previous and current values,
            //  starting w/ current acceleration
        }, this.acceleration)
        )
    },
    applyForce: function (force_vectors) {
        var old_accel = this.acceleration.clone();
        this.setAcceleration(force_vectors.reduce(function (prev, cur) {
            var cur_accel = cur.clone();
            cur_accel.divideScalar(this.mass);
            //copy cur_accel, then divide by the particle's mass to
            //get an acceleration vector
            prev.add(cur_accel);
        }, new THREE.Vector3(0, 0, 0)));

        this.setAcceleration(old_accel);
    },
    update: function () {

        //get time elapsed from start/last
        //update
        this.changePosition(Date.now() - this.time);
        //use this to calculate cur position
        //by getting the delta t

        //reset the last time
        this.time = Date.now();

    }
}
//info for inheritence
var tmp = function () { };
tmp.prototype = Particle.prototype;

function ChargedParticle(scene, start_mass, obj_color) {
    Particle.call(this, scene, start_mass, obj_color);
    this.magnetic_field = new THREE.Vector3(0, 0, 0);
}
//these two functions should cause ChargedParticle to 
//inherit from particle
ChargedParticle.prototype = new tmp();
ChargedParticle.prototype.constructor = ChargedParticle;

ChargedParticle.prototype.charge = 0;
ChargedParticle.prototype.magnetic_field =
    new THREE.Vector3(0, 0, 0);
ChargedParticle.prototype.setCharge = function (new_charge) {
    this.charge = new_charge;
};
ChargedParticle.prototype.get_magnetic_field = function (other_position) {
    var radius = new THREE.Vector3(0, 0, 0);
    radius.copy(other_position);
    radius.sub(this.getPosition());
    //gets the radius between the involved particles

    this.magnetic_field.crossVectors(
        this.velocity, radius.clone().normalize()
    );
    //field =  vec(v) x vec(r.normal)
    this.magnetic_field.multiplyScalar(
        this.charge *
        1.0e-7 /
        radius.lengthSq()
    );
    //field = vec(v) x vec(r.normal) * q * 1e-7/ r^2
    return this.magnetic_field;
};


function Electron(scene) {
    ChargedParticle.call(this, scene, 9.11e-31, "#0000ff");
    //electron has mass of 9.11e-31 kg
    this.charge = consts.fundamental_charge * -1;
    //a electron is a charged particle w/
    //a charge of e

}
//make electron inherit from chargedParticle
tmp.prototype = ChargedParticle.prototype;
Electron.prototype = new tmp();
Electron.prototype.constructor = Electron;

function Proton(scene) {
    ChargedParticle.call(this, scene, 1.67e-27, "#ff0000");
    this.charge = consts.fundamental_charge;
    //a proton is a charged particle w/
    //a charge of e
}
//make proton inherit from chargedParticle
Electron.prototype = new tmp();
Electron.prototype.constructor = Electron;

//functions
//forces
function force_mag_point(charge, velocity, field) {
    var new_vec = new THREE.Vector3().crossVectors(velocity, field);
    return new_vec.multiplyScalar(charge);
}