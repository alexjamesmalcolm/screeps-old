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
        var target;
        var storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if(structure.structureType === STRUCTURE_STORAGE) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        var droppedEnergy = this.room.find(FIND_DROPPED_ENERGY);
        if(droppedEnergy.length > 0 && droppedEnergy[0].amount > 50) {
            target = droppedEnergy[0];
            this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            if(this.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            target = storage;
            this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            if(this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(target);
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
