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
            /*
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
                */
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    //console.log(structure.structureType);
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
                                        /*
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
                    */
                }
            }
            var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: function(object) {
                    return object.hits < object.hitsMax
                    && object.hitsMax - object.hits > REPAIR_POWER;
                }
            });
            repairTargets.sort(function (a,b) {
                return ((a.hits / a.hitsMax) - (b.hits / b.hitsMax))
            });
            if(repairTargets.length > 0) {
                creep.repair(repairTargets[0]);
            }
        }
        
        creep.memory.lastPos = creep.pos;
    }
};

module.exports = roleHarvester;
