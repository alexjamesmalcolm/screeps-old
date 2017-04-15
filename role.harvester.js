var roleHarvester = {
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
	        creep.say('Harvesting');
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                if(creep.memory.path == false) {
                    creep.memory.path = creep.room.findPath(creep.pos, source.pos);
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
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_EXTENSION) {
                        return structure.energy < structure.energyCapacity;
                    } else if (structure.structureType == STRUCTURE_SPAWN) {
                        return structure.energy < structure.energyCapacity;
                    }
                }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	    	        if(creep.memory.path == false) {
                        creep.memory.path = creep.room.findPath(creep.pos, target.pos);
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
