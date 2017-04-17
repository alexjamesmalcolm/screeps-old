var roleCourier = function(creep) {
    if (creep.memory.collecting) {
        if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.collecting = false;
            creep.say('Delivering');
        }
    } else {
        if (creep.carry.energy == 0) {
            creep.memory.collecting = true;
            creep.say('Collecting');
        }
    }
    if (creep.memory.collecting) {
        creep.collect({
            resource: RESOURCE_ENERGY,
            amount: creep.carryCapacity,
            structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
        });
    } else {
        var target;
        var closestStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if (structure.structureType == STRUCTURE_EXTENSION) {
                    return structure.energy < structure.energyCapacity;
                } else if (structure.structureType == STRUCTURE_SPAWN) {
                    return structure.energy < structure.energyCapacity;
                }
            }
        });
        var closestCreep = creep.pos.findClosestByRange(FIND_CREEPS, {
            filter: function(creep) {
                if (creep.memory.needEnergy) {
                    return true;
                }
            }
        });
        //console.log(closestCreep);
        var closestStructureDistance = creep.pos.getRangeTo(closestStructure);
        var closestCreepDistance = creep.pos.getRangeTo(closestCreep);
        if (closestCreepDistance <= closestStructureDistance) {
            target = closestCreep;
        } else {
            target = closestStructure
        }
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(Game.flags.Flag1);
        }
    }
};

module.exports = roleCourier;
