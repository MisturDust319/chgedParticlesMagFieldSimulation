Particle.prototype = {
    mass: 0,
    position: THREE.Vector3(0, 0, 0),
    velocity: THREE.Vector3(0, 0, 0),
    acceleration: THREE.Vector3(0, 0, 0),
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
    }
    accelerate: function (acceleration_vectors) {
        this.setAcceleration(acceleration_vectors.reduce(function (prev, cur) {
            prev.add(cur);
            //just a vector sum of previous and current values,
            //  starting w/ current acceleration
        }, this.acceleration)
        )
    }
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
