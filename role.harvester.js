var roleHarvester = {
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        creep.say('Harvesting');
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                if(creep.memory.path == false) {
                    creep.memory.path = creep.room.findPath(creep.pos, sources[0].pos);
                    creep.say('Pathing');
                }
                if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND) {
                    creep.memory.path = false;
                    creep.say('Pausing');
                }
            } else {
                creep.memory.path = false;
                creep.say('Pausing');
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_EXTENSION) {
                        return structure.energy < structure.energyCapacity;
                    } else if (structure.structureType == STRUCTURE_SPAWN) {
                        return structure.energy < structure.energyCapacity;
                    }
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    	        if(creep.memory.path == false) {
                        creep.memory.path = creep.room.findPath(creep.pos, targets[0].pos);
                    }
                    creep.moveByPath(creep.memory.path);
                    if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND) {
                        creep.memory.path = false;
                        creep.say('Pausing');
                    }
                } else {
                    creep.memory.path = false;
                    creep.say('Pausing');
                }
            }
        }
	}
};


module.exports = roleHarvester;
