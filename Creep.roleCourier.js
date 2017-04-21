var roleCourier = function() {
    if(this.memory.collecting) {
        if(this.carry.energy == this.carryCapacity) {
            this.memory.collecting = false;
            this.say('Delivering');
        }
    } else {
        if(this.carry.energy == 0) {
            this.memory.collecting = true;
            this.say('Collecting');
        }
    }
    if(this.memory.collecting) {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: this.carryCapacity,
            structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
        });
    } else {
        this.deposit({
            creepDepositing: true,
            structures: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
        });
    }
};

module.exports = roleCourier;
