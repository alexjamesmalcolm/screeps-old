var CreepDeposit = function(input) {
    //console.log(JSON.stringify(input));
    var creepDepositing, structures, amount, target, closestStructure, check, closestCreepDistance, closestStructureDistance, closestCreep;
    creepDepositing = input.creepDepositing;
    structures = input.structures;
    amount = this.carry.energy;
    check = function(structure, structures, structureType) {
        if(structure.structureType == structureType) {
            if(structures.indexOf(structureType) != -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    if(structures.length > 0) {
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
                                    return structure.energyCapacity - structure.energy > 0;
                                case STRUCTURE_SPAWN:
                                    return structure.energyCapacity - structure.energy > 0;
                                case STRUCTURE_STORAGE:
                                    return structure.storeCapacity - _.sum(structure.store) > 0;
                                case STRUCTURE_CONTAINER:
                                    return structure.storeCapacity - _.sum(structure.store) > 0;
                                case STRUCTURE_TOWER:
                                    return structure.energyCapacity - structure.energy > 0;
                            }
                        }
                    }
                });
            }
        }
        //console.log(closestStructure);
        closestStructureDistance = this.pos.getRangeTo(closestStructure);
    }
    if(creepDepositing) {
        closestCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.needEnergy) {
                    if(creep.carryCapacity - creep.carry.energy >= amount) {
                        return true;
                    }
                }
            }
        });
        //console.log(closestCreep);
        closestCreepDistance = this.pos.getRangeTo(closestCreep);
    }
    if(closestCreepDistance <= closestStructureDistance) {
        target = closestCreep;
    } else {
        target = closestStructure;
    }
    //console.log(target);
    if(target) {
        var result = this.transfer(target, RESOURCE_ENERGY);
        if(result == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
            return ERR_NOT_IN_RANGE;
            //try {this.pathing(target);} catch(err) {console.log(err+": Creep.deposit.js this.pathing(target)");}
        } else {
            return result;
        }
    }
};

module.exports = CreepDeposit;
