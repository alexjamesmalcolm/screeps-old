var stateRecycle = {
    run: function(creep) {
        if(creep.memory.recycle) {
            creep.memory.closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            var spawn = creep.memory.closestSpawn;
            if(creep.carry.energy > 0) {
                creep.deposit({
                    creepDepositing: true,
                    structures: [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
                });
            } else {
                console.log(spawn);
                console.log(creep.pos.findClosestByRange(FIND_MY_SPAWNS));
                if(spawn.recycleCreep(creep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                    creep.say('Recycling');
                }
            }
        } else {
            creep.memory.recycle = true;
        }
    }
};

module.exports = stateRecycle;
