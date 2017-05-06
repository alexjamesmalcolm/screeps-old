var stateRecycle = {
    run: function(creep) {
        if(creep.memory.recycle) {
            creep.memory.closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
            var spawn = creep.memory.closestSpawn;
            if(!spawn) {
                spawn = Game.spawns['Spawn1'];
            }
            if(creep.carry.energy > 0) {
                creep.deposit({
                    creepDepositing: true,
                    structures: [STRUCTURE_STORAGE, STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_CONTAINER]
                });
            } else {
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
