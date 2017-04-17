var roleBuilder = function() {
    if(this.memory.building && this.carry.energy == 0) {
        this.memory.building = false;
        this.memory.needEnergy = true;
        this.say('Need Energy');
    }
    if(!this.memory.building && this.carry.energy == this.carryCapacity) {
        this.memory.building = true;
        this.memory.needEnergy = false;
        this.say('Building');
    }
    if(this.memory.building) {
        this.build({
            activeRepair: true,
            structures: [
                STRUCTURE_CONTAINER,
                STRUCTURE_STORAGE
            ]
        });
        this.passiveRepair();
    } else {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: this.carryCapacity,
            structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
        });
    }
};

module.exports = roleBuilder;
