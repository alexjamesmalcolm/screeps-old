var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('Harvesting');
	    }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('Upgrading');
        }
        
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: function(structure) {
                    if(structure.structureType == STRUCTURE_SPAWN) {
                        return structure.energy > 0;
                    } else if(structure.structureType == STRUCTURE_EXTENSION) {
                        return structure.energy > 0;
                    } else if(structure.structureType == STRUCTURE_STORAGE) {
                        return _.sum(structure.store);
                    } else if(structure.structureType == STRUCTURE_CONTAINER) {
                        return _.sum(structure.store);
                    }
                }
            });
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        
        var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: function(object) {
                return object.hits < object.hitsMax
                && object.hitsMax - object.hits > REPAIR_POWER;
            }
        });
        repairTargets.sort(function (a,b) {
            return (a.hits / a.hitsMax - b.hits / b.hitsMax)
        });
        if(repairTargets.length > 0) {
            creep.repair(repairTargets[0]);
        }
	}
};

module.exports = roleUpgrader;
