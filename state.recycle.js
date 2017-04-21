var stateRecycle = {
    run: function(creep) {
        if(creep.memory.recycle) {
            var spawn = creep.memory.closestSpawn;
            if(creep.carry.energy > 0) {
                creep.deposit({
                    creepDepositing: true,
                    structures: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
                });
            } else {
                if(spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                    creep.say('Recycling');
                }
            }
        } else {
            creep.memory.recycle = true;
            creep.memory.closestSpawn = creep.pos.findClosestByRange(STRUCTURE_SPAWN);
        }
    }
};

module.exports = stateRecycle;
