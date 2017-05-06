var RoomFighterSpawn = function() {
    this.memory.spawns[0].createCreep([MOVE, ATTACK], undefined, {role: 'fighter'});
    this.memory.spawns[0].memory.busy = Game.time;
};

module.exports = RoomFighterSpawn;
