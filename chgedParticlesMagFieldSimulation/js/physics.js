if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() { }

        F.prototype = o;
        return new F();
    };
}
//a helper method for dealing with inheritence
function inheritPrototype(childObject, parentObject) {
    // As discussed above, we use the Crockford’s method to copy the properties and methods from the parentObject onto the childObject​
    // So the copyOfParent object now has everything the parentObject has ​
    var copyOfParent = Object.create(parentObject.prototype);

    //Then we set the constructor of this new object to point to the childObject.​
    // Why do we manually set the copyOfParent constructor here, see the explanation immediately following this code block.​
    copyOfParent.constructor = childObject;

    // Then we set the childObject prototype to copyOfParent, so that the childObject can in turn inherit everything from copyOfParent (from parentObject)​
    childObject.prototype = copyOfParent;
}

consts = {
    fundamental_charge: 1.61e-19,
    mu_naught = 4 * Math.PI * 1.0e-7

};

function Particle(start_mass) {
    this.mass = start_mass;
}

Particle.prototype = {
    mass: 0,
    position: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    acceleration: new THREE.Vector3(0, 0, 0),
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

function ChargedParticle(start_mass) {
    this.mass = start_mass;
}
ChargedParticle.prototype = {
    charge: 0,
    magneticField: new THREE.Vector3(0, 0, 0),
    setCharge: function (new_charge) {
        this.charge = new_charge;
    }
    setMagneticField: function (other_position) {
        var radius = new Vector3(0, 0, 0);
        radius.copy(other_position);
        radius.sub(this.position);
        //gets the radius between the involved particles

        this.magneticField.crossVectors(
            this.velocity, radius.clone().normalize()
        );
        //field =  vec(v) x vec(r.normal)
        this.magneticField.multiplyScalar(
            this.charge *
            radius.lengthSq() *
            1.0e-7
            )
    }
}
//make chargedParticle inherit from particle
inheritPrototype(ChargedParticle, Particle);

function Electron() {
    this.charge = consts.fundamental_charge * -1;
    //a proton is a charged particle w/
    //a charge of e
}
//make electron inherit from chargedParticle
inheritPrototype(Electron, ChargedParticle);

function Proton() {
    this.charge = consts.fundamental_charge;
    //a proton is a charged particle w/
    //a charge of e
}
//make electron inherit from chargedParticle
inheritPrototype(Proton, ChargedParticle);

//functions
//forces
function force_mag_point(charge, velocity, field) {
    var new_vec = new THREE.Vector3().cross(velocity, field);
    return new_vec.multiplyScalar(charge);
}