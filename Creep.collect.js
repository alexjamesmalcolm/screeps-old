var CreepCollect = function(input) {
    var target;
    var resource = input.resource;
    var amount = this.carryCapacity - _.sum(this.carry);
    var structures = input.structures;
    var closestStructure = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType == STRUCTURE_CONTAINER && structures.indexOf(STRUCTURE_CONTAINER) != -1) {
                return true; //return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_STORAGE && structures.indexOf(STRUCTURE_STORAGE) != -1) {
                return true; //return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_EXTENSION && structures.indexOf(STRUCTURE_EXTENSION) != -1) {
                return true; //return structure.energy >= amount;
            } else if(structure.structureType == STRUCTURE_SPAWN && structures.indexOf(STRUCTURE_SPAWN) != -1) {
                return true; //return structure.energy >= amount;
            }
        }
    });
    var closestStructureDistance = this.pos.getRangeTo(target);
    var droppedEnergy = this.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    if(droppedEnergy) {
        if(this.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            this.moveTo(droppedEnergy);
        }
        var droppedEnergyDistance = this.pos.getRangeTo(droppedEnergy);
    }
    if(closestStructureDistance <= droppedEnergyDistance) {
        target = closestStructure;
    } else {
        target = droppedEnergyDistance;
    }
    if(target) {
        if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    } else {
        this.say("No energy");
    }
};

module.exports = CreepCollect;
