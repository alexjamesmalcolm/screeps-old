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
        } else {
            creep.collect({
                resource: RESOURCE_ENERGY,
                amount: 50,
                structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
            });
        }
        creep.passiveRepair();
        /*
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
        */
    }
};

module.exports = roleUpgrader;
