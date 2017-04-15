var stateDying = {
    run: function(creep) {
        if(creep.ticksToLive < 1490) {
            creep.memory.sick = true;
        } else {
            creep.memory.sick = false;
        }
        creep.say('Dying');
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
        }
    }
};

module.exports = stateDying;
