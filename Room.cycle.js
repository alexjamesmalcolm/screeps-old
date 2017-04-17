var RoomCycle = function() {
    var spawns = this.find(FIND_MY_SPAWNS);
    for(var name in spawns) {
        var spawn = Game.spawns[name];
        spawn.cycle();
    }
};

module.exports = RoomCycle;
