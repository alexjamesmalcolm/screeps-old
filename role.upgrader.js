var roleUpgrader = {
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.memory.needEnergy = true;
            creep.say('Need Energy');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.memory.needEnergy = false;
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
    }
};

module.exports = roleUpgrader;
