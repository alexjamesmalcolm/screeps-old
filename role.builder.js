var roleBuilder = {
    run: function(creep) {
        var say = function(text) {
            creep.say('B: '+text);
        }
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.memory.needEnergy = true;
            say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.memory.needEnergy = false;
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
            creep.passiveRepair();
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
