var CreepDeposit = function(input) {
    //console.log(JSON.stringify(input));
    var creepDepositing = input.creepDepositing;
    var structures = input.structures;
    var amount = this.carry.energy;
    var target;
    var check = function(structure, structures, structureType) {
        /*
        console.log(structure);
        console.log(structures);
        console.log(structureType);
        console.log(structure.structureType == structureType
        && structures.indexOf(structureType) != -1);
        */
        return structure.structureType == structureType
        && structures.indexOf(structureType) != -1;
    }
    if(structures.length > 0) {
        var closestStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if(check(structure, structures, STRUCTURE_EXTENSION)) {
                    return structure.energyCapacity - structure.energy <= amount;
                } else if(check(structure, structures, STRUCTURE_SPAWN)) {
                    return structure.energyCapacity - structure.energy <= amount;
                } else if(check(structure, structures, STRUCTURE_STORAGE)) {
                    return structure.storeCapacity - _.sum(structure.store) <= amount;
                } else if(check(structure, structures, STRUCTURE_CONTAINER)) {
                    return structure.storeCapacity - _.sum(structure.store) <= amount;
                }
            }
        });
        //console.log(closestStructure);
        var closestStructureDistance = this.pos.getRangeTo(closestStructure);
    }
    if(creepDepositing) {
        var closestCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.needEnergy) {
                    return true;
                }
            }
        });
        //console.log(closestCreep);
        var closestCreepDistance = this.pos.getRangeTo(closestCreep);
    }
    if(closestCreepDistance <= closestStructureDistance) {
        target = closestCreep;
    } else {
        target = closestStructure;
    }
    if(target) {
        if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    }
};

module.exports = CreepDeposit;
