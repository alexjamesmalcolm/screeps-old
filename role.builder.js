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
            creep.collect({
                resource: RESOURCE_ENERGY,
                amount: creep.carryCapacity,
                structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
            });
        }
    }
};
module.exports = roleBuilder;
