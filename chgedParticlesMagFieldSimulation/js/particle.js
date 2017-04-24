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
        this.position.addVectors(
            this.velocity.clone().multiplyScalar(
                time),
            this.acceleration.clone().multiplyScalar(
                time * time / 2
            )
        )
    }
}
