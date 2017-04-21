var creepCount = require('creepCount');
var RoomCycle = function() {
    var spawns = this.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(!spawns.length) {
        this.memory.spawns = [];
    } else {
        this.memory.spawns = spawns;
    }
    var sources = this.find(FIND_SOURCES);
    this.memory.harvestPoints = 0;
    var room = this;
    sources.forEach(function(source) {
        for(var i = -1; i < 2; i++) {
            for(var j = -1; j < 2; j++) {
                if(i * j != i + j) {
                    var pos = new RoomPosition(source.pos.x + i, source.pos.y + j, room.name);
                    if(pos.lookFor(LOOK_TERRAIN) != 'wall') {
                        room.memory.harvestPoints = room.memory.harvestPoints + 1;
                    }
                }
            }
        }
    });
    console.log(this.memory.harvestPoints);
    this.harvesterSpawn();
    this.courierSpawn();
    this.upgraderSpawn();
    this.builderSpawn();
    spawns = this.find(FIND_MY_SPAWNS);
    for(var name in spawns) {
        var spawn = spawns[name];
        //spawn.cycle();
    }
    var creeps = this.find(FIND_MY_CREEPS);
    for(var name in creeps) {
        var creep = creeps[name];
        creep.cycle();
    }
};

module.exports = RoomCycle;
