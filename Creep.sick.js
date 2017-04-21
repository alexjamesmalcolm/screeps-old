var stateDying = {
    run: function(creep) {
        if(!creep.memory.sick) {
            console.log('Bug in sickness');
        }
        creep.memory.sick = true;
        var spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if(spawn.renewCreep(creep) == ERR_FULL) {
            creep.memory.sick = false;
        }
        if(spawn.renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
            creep.say('Dying');
        } else if(spawn.renewCreep(creep) == OK) {
            creep.say('Healing');
        } else {
            creep.say('Dying');
        }
    }
};

module.exports = stateDying;
