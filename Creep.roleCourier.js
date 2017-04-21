var roleCourier = function() {
    if (this.memory.collecting) {
        if (this.carry.energy == this.carryCapacity) {
            this.memory.collecting = false;
            this.say('Delivering');
        }
    } else {
        if (this.carry.energy == 0) {
            this.memory.collecting = true;
            this.say('Collecting');
        }
    }
    if (this.memory.collecting) {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: this.carryCapacity,
            structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
        });
    } else {
        /*
        var target;
        var closestStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if (structure.structureType == STRUCTURE_EXTENSION) {
                    return structure.energy < structure.energyCapacity;
                } else if (structure.structureType == STRUCTURE_SPAWN) {
                    return structure.energy < structure.energyCapacity;
                }
            }
        });
        var closestCreep = this.pos.findClosestByRange(FIND_CREEPS, {
            filter: function(creep) {
                if (creep.memory.needEnergy) {
                    return true;
                }
            }
        });
        var closestStructureDistance = this.pos.getRangeTo(closestStructure);
        var closestCreepDistance = this.pos.getRangeTo(closestCreep);
        if (closestCreepDistance <= closestStructureDistance) {
            target = closestCreep;
        } else {
            target = closestStructure
        }
        if (target) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            this.moveTo(Game.flags.Flag1);
        }
        */
        this.deposit({
        });
    }
};

module.exports = roleCourier;
