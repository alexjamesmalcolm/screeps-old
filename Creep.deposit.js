var CreepDeposit = function() {
    
};

module.exports = CreepDeposit;

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
