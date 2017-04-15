var roleBuilder = {
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    if(creep.memory.path == false) {
                        creep.memory.path = creep.room.findPath(creep.pos, targets[0].pos);
                    }
                    if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND) {
                        creep.memory.path = false;
                        creep.say('Pausing');
                    }
                } else {
                    creep.memory.path = false;
                }
            }
	    } else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                if(creep.memory.path == false) {
                    creep.memory.path = creep.room.findPath(creep.pos, sources[0].pos);
                }
                creep.moveByPath(creep.memory.path);
            } else {
                creep.memory.path = false;
            }
	    }
	}
};
module.exports = roleBuilder;
