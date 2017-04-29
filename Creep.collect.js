var CreepCollect = function(input) {
    var target;
    var resource = input.resource;
    //var amount = this.carryCapacity - _.sum(this.carry);
    var amount = 1;
    var structures = input.structures;
    var closestStructure = this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType == STRUCTURE_CONTAINER && structures.indexOf(STRUCTURE_CONTAINER) != -1) {
                return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_STORAGE && structures.indexOf(STRUCTURE_STORAGE) != -1) {
                return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_EXTENSION && structures.indexOf(STRUCTURE_EXTENSION) != -1) {
                return structure.energy >= amount;
            } else if(structure.structureType == STRUCTURE_SPAWN && structures.indexOf(STRUCTURE_SPAWN) != -1) {
                return structure.energy >= amount;
            } else if(structure.structureType == STRUCTURE_TOWER && structures.indexOf(STRUCTURE_TOWER) != -1) {
                return structure.energy >= amount;
            }
        }
    });
    var closestStructureDistance = this.pos.getRangeTo(closestStructure);
    var droppedEnergy = this.pos.findClosestByRange(FIND_DROPPED_ENERGY);
    var droppedEnergyDistance;
    if(droppedEnergy) {
        if(this.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
            this.moveTo(droppedEnergy);
        }
        droppedEnergyDistance = this.pos.getRangeTo(droppedEnergy);
    }
    if(closestStructure) {
        if(droppedEnergy) {
            if(closestStructureDistance <= droppedEnergyDistance) {
                target = closestStructure;
            } else {
                target = droppedEnergy;
            }
        } else {
            target = closestStructure;
        }
    } else {
        if(droppedEnergy) {
            target = droppedEnergy;
        }
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
