var roleBuilder = {
    run: function(creep) {
        var say = function(text) {
            creep.say('B: '+text);
        }

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        say('building');
	    }

	    if(creep.memory.building) {
	        //var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                    /*
                    if(creep.memory.path == false) {
                        creep.memory.path = creep.room.findPath(creep.pos, target.pos);
                    }
                    if(creep.moveByPath(creep.memory.path) == ERR_NOT_FOUND) {
                        creep.memory.path = false;
                        say('Pausing');
                    }
                } else {
                    creep.memory.path = false;
                    */
                }
            }
	    } else {
	        //var sources = creep.room.find(FIND_SOURCES);
            var source = creep.pos.findClosestByRange(FIND_SOURCE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                /*
                if(creep.memory.path == false) {
                    creep.memory.path = creep.room.findPath(creep.pos, sources[0].pos);
                }
                creep.moveByPath(creep.memory.path);
            } else {
                creep.memory.path = false;
                */
            }
	    }
	}
};
module.exports = roleBuilder;
