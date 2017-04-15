var roleCourier = {
    run: function(creep) {
        /*It's got to find storage and containers*/
        if(creep.memory.collecting) {
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.collecting = false;
                creep.say('Delivering');
            }
        } else {
            if(creep.carry.energy == 0) {
                creep.memory.collecting = true;
                creep.say('Collecting');
            }
        }
        if(creep.memory.collecting) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_CONTAINER) {
                        return _.sum(structure.store) < structure.storeCapacity
                    } else if(structure.structureType == STRUCTURE_STORAGE) {
                        return _.sum(structure.store) < structure.storeCapacity
                    }
                }
            });
            console.log(target);
            if(target) {
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_EXTENSION) {
                        return structure.energy < structure.energyCapacity;
                    } else if(structure.structureType == STRUCTURE_SPAWN) {
                        return structure.energy < structure.energyCapacity;
                    }
                }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};

module.exports = roleCourier;
