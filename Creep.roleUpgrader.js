var roleUpgrader = function() {
    if(this.memory.upgrading && this.carry.energy == 0) {
        this.memory.upgrading = false;
        this.memory.needEnergy = true;
        this.say('Need Energy');
    }
    if(!this.memory.upgrading && this.carry.energy == this.carryCapacity) {
        this.memory.upgrading = true;
        this.memory.needEnergy = false;
        this.say('Upgrading');
    }
    if(this.memory.upgrading) {
        if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    } else {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: 50,
            structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
        });
    }
    this.passiveRepair();
};

module.exports = roleUpgrader;
