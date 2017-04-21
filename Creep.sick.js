var CreepSick = function() {
    var spawn = this.pos.findClosestByRange(FIND_MY_SPAWNS);
    var result = spawn.renewCreep(this);
    if(result == ERR_FULL) {
        this.memory.sick = false;
    } else if(result == ERR_NOT_IN_RANGE) {
        this.moveTo(spawn);
        this.say('Sick');
    } else if(result == OK) {
        this.say('Healing');
    } else if(result == ERR_NOT_ENOUGH_ENERGY) {
        this.memory.sick = false;
    }
};

module.exports = CreepSick;
