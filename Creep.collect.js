var CreepCollect = function(input) {
    /*
    methods:
    grab from fullest of given structures
    grab from least full of given structures
    grab to even out given structures
    grab from closest
    grab from structures in a given priority
    grab dropped energy first
    */
    var target;
    var resource = input.resource;
    //var amount = this.carryCapacity - _.sum(this.carry);
    var amount = 50;
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
            } else if(structure.structureType == STRUCTURE_LINK && structures.indexOf(STRUCTURE_LINK) != -1) {
                return structures.energy >= amount;
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
            return ERR_NOT_IN_RANGE;
        } else {
            return OK;
        }
    } else {
        this.say("No energy");
        return ERR_NOT_FOUND;
    }
};

module.exports = CreepCollect;
