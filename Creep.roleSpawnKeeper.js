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
                this.room.visual.circle(droppedEnergy[0].pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            }
        } else {
            console.log(this.room.storage.pos);
            if(this.transfer(this.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(this.room.storage);
                this.room.visual.circle(this.room.storage.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
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
