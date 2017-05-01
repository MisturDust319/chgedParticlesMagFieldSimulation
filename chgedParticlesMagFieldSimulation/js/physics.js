consts = {
    fundamental_charge: 1.61e-19
};

function Particle(start_mass) {
    this.mass = start_mass;
    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
}

Particle.prototype = {
    mass: 0,
    position: null,
    velocity: null,
    acceleration: null,
    setPosition: function (new_position) {
        //check if new_postion is 3vec
        //if not, throw type error
        if (!(Object.prototype.toString.call(new_position) = "THREE.Vector3")) {
            throw new TypeError("you must pass a THREE.Vector3 obj\n as input for setPosition");
        }
        else {
            this.position = new_position;
            //if the data type is valid, change
            //this.position to new_position
        }
    },
    setVelocity: function (new_velocity) {
        //check if new_velocity is 3vec
        //if not, throw type error
        if (!(Object.prototype.toString.call(new_velocity) = "THREE.Vector3")) {
            throw new TypeError("you must pass a THREE.Vector3 obj\n as input for setvelocity");
        }
        else {
            this.velocity = new_velocity;
            //if the data type is valid, change
            //this.velocity to new_velocity
        }
    },
    setAcceleration: function (new_acceleration) {
        //check if new_acceleration is 3vec
        //if not, throw type error
        if (!(Object.prototype.toString.call(new_acceleration) = "THREE.Vector3")) {
            throw new TypeError("you must pass a THREE.Vector3 as input.");
        }
        else {
            this.acceleration = new_acceleration;
            //if the data type is valid, change
            //this.acceleration to new_acceleration
        }
    },
    changePosition: function (time) {
        //s_f = s_i + vt + 0.5a*t^2
        //a simple kinematics equation
        //  applied in a not so simple way...
        var velocity_comp = this.velocity.clone().multiplyScalar(
            time);
        var accel_comp =
            this.acceleration.clone().multiplyScalar(
                time * time / 2
            );
        this.position.addVectors(
            velocity_comp,
            accel_comp
        )
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
        this.setAcceleration(force_vectors.reduce(function (prev, cur) {
            var cur_accel = cur.clone();
            cur_accel.divideScalar(this.mass);
            //copy cur_accel, then divide by the particle's mass to
            //get an acceleration vector
            prev.add(cur_accel);
        }, this.acceleration))
    }
}
//info for inheritence
var tmp = function () { };
tmp.prototype = Particle.prototype;

function ChargedParticle(start_mass) {
    this.magnetic_field = new THREE.Vector3(0, 0, 0);
    Particle.call(this, start_mass);
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
ChargedParticle.prototype.set_magnetic_field = function (other_position) {
    var radius = new Vector3(0, 0, 0);
    radius.copy(other_position);
    radius.sub(this.position);
    //gets the radius between the involved particles

    this.magnetic_field.crossVectors(
        this.velocity, radius.clone().normalize()
    );
    //field =  vec(v) x vec(r.normal)
    this.magnetic_field.multiplyScalar(
        this.charge *
        radius.lengthSq() *
        1.0e-7
    )
};


function Electron() {
    ChargedParticle.call(this, 9.11e-31);
    //electron has mass of 9.11e-31 kg
    this.charge = consts.fundamental_charge * -1;
    //a electron is a charged particle w/
    //a charge of e

}
//make electron inherit from chargedParticle
tmp.prototype = ChargedParticle.prototype;
Electron.prototype = new tmp();
Electron.prototype.constructor = Electron;

function Proton() {
    ChargedParticle.call(this, 1.67e-27);
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
    var new_vec = new THREE.Vector3().cross(velocity, field);
    return new_vec.multiplyScalar(charge);
}