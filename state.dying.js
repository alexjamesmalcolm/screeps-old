var stateDying = {
    run: function(creep) {
        creep.say('Dying');
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.room.moveTo(spawn);
        }
    }
};

module.exports = stateDying;
