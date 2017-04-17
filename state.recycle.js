var stateRecycle = {
    run: function(creep) {
        if(creep.memory.recycle) {
            var spawn = creep.memory.recycle.nearestSpawn;
            //if()
        } else {
            creep.memory.recycle = {
                nearestSpawn: creep.pos.findClosestByPath(STRUCTURE_SPAWN);
            };
        }
    }
};

module.exports = stateRecycle;
