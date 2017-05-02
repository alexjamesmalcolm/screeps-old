var CreepRoleSpawnKeeper = function() {
    if(this.memory.collecting) {
        if(this.carry.energy === this.carryCapacity) {
            this.memory.collecting = false;
            this.say('Delivering');
        }
    } else {
        if(this.carry.energy === 0) {
            this.memory.collecting = true;
            this.say('Collecting');
        }
    }
    if(this.memory.collecting) {
        var droppedEnergy = this.room.find(FIND_DROPPED_ENERGY);
        if(droppedEnergy.length > 0 && droppedEnergy[0].amount > 50) {
            if(this.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                this.moveTo(droppedEnergy[0]);
            }
        } else {
            if(this.transfer(this.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.storage);
            }
        }
    } else {
        this.deposit({
            creepDepositing: false,
            structures: [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER]
        });
    }
};

module.exports = CreepRoleSpawnKeeper;
