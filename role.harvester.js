var roleHarvester = {
    run: function(creep) {
        if(creep.memory.harvesting) {
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
                creep.say('Carrying');
            }
        } else {
            if(creep.carry.energy == 0) {
                creep.memory.harvesting = true;
                creep.say('Harvesting');
            }
        }
        
        if(creep.memory.harvesting) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES); //Inefficient
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        } else {
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
            creep.passiveRepair
        }
        //creep.memory.lastPos = creep.pos;
    }
};

module.exports = roleHarvester;
