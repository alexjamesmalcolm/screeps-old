var stateRecycle = {
    run: function(creep) {
        if(creep.memory.recycle) {
            var spawn = creep.memory.nearestSpawn;
            if(creep.carry.energy > 0) {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function(structure) {
                        if(structure.structureType == STRUCTURE_EXTENSION) {
                            return structure.energy < structure.energyCapacity;
                        } else if(structure.structureType == STRUCTURE_SPAWN) {
                            return structure.energy < structure.energyCapacity;
                        } else if(structure.structureType == STRUCTURE_CONTAINER) {
                            return _.sum(structure.store) < structure.storeCapacity
                        } else if(structure.structureType == STRUCTURE_STORAGE) {
                            return structure.energy < strucutre.energyCapacity; //Incorrect, should be similar to container
                        }
                    }
                });
                if(target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            } else {
                if(spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                    creep.say('Recycling');
                }
            }
        } else {
            creep.memory.recycle = true;
            creep.memory.nearestSpawn = creep.pos.findClosestByPath(STRUCTURE_SPAWN);
        }
    }
};

module.exports = stateRecycle;
