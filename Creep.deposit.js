var CreepDeposit = function(input) {
    //console.log(JSON.stringify(input));
    var creepDepositing = input.creepDepositing;
    var structures = input.structures;
    var amount = this.carry.energy;
    var target;
    var check = function(structure, structures, structureType) {
        return structure.structureType == structureType
        && structures.indexOf(structureType) != -1;
    }
    if(structures.length > 0) {
        var closestStructure;
        for(var i = 0; i < structures.length; i++) {
            var structureType = structures[i];
            if(closestStructure) {
                break;
            } else {
                closestStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(structure) {
                        if(structure.structureType == structureType) {
                            switch(structureType) {
                                case STRUCTURE_EXTENSION:
                                    return structure.energyCapacity - structure.energy >= amount;
                                    break;
                                case STRUCTURE_SPAWN:
                                    return structure.energyCapacity - structure.energy >= amount;
                                    break;
                                case STRUCTURE_STORAGE:
                                    return structure.storeCapacity - _.sum(structure.store) >= amount;
                                    break;
                                case STRUCTURE_CONTAINER:
                                    return structure.storeCapacity - _.sum(structure.store) >= amount;
                            }
                        }
                    }
                });
            }
        }
        //console.log(closestStructure);
        var closestStructureDistance = this.pos.getRangeTo(closestStructure);
    }
    if(creepDepositing) {
        var closestCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.needEnergy) {
                    if(creep.carryCapacity - creep.carry.energy >= amount) {
                        return true;
                    }
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
    //console.log(target);
    if(target) {
        if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    }
};

module.exports = CreepDeposit;
