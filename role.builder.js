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
        } else {
            //console.log('Builder:');
            creep.collect({
                resource: RESOURCE_ENERGY,
                amount: 50,
                structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
            });
            /*
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_CONTAINER) {
                        //console.log(_.sum(structure.store));
                        return _.sum(structure.store) > 50;
                    } else if(structure.structureType == STRUCTURE_STORAGE) {
                        //console.log(_.sum(structure.store));
                        return _.sum(structure.store) > 50;
                    } else if(structure.structureType == STRUCTURE_EXTENSION) {
                        //console.log(structure.energy);
                        //return structure.energy > 50;
                        return false; //This is so the spawn can still heal creeps that are dying.
                    } else if(structure.structureType == STRUCTURE_SPAWN) {
                        //console.log(structure.energy);
                        return structure.energy > 50;
                    }
                }
            });
            
            if(target) {
                //console.log(target);
                //console.log(creep.withdraw(target, RESOURCE_ENERGY));
                //console.log(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE);
                if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    //console.log(creep.moveTo(target));
                    creep.moveTo(target);
                }
            }
            */
            /*var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                if(creep.memory.path == false) {
                    creep.memory.path = creep.room.findPath(creep.pos, sources[0].pos);
                }
                creep.moveByPath(creep.memory.path);
            } else {
                creep.memory.path = false;
            }*/
	    }
	}
};
module.exports = roleBuilder;
