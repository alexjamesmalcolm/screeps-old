var RoomCycle = function() {
    var spawns = this.find(FIND_MY_SPAWNS);
    for(var name in spawns) {
        var spawn = Game.spawns[name];
        spawn.cycle();
    }
    var creeps = this.find(FIND_MY_CREEPS);
    for(var name in creeps) {
        var creep = Game.creeps[name];
        creep.cycle();
    }
};

module.exports = RoomCycle;
