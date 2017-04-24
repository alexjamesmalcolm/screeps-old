var creepCount = require('creepCount');
var checkSpawns = function(room) {
    var spawns = room.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning || spawn.memory.spawning == Game.time) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(!spawns.length) {
        room.memory.spawns = [];
    } else {
        room.memory.spawns = spawns;
    }
}
var RoomCycle = function() {
    try {this.paths();} catch(err) {console.log(err+": Room.cycle.js this.paths()");}
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
    checkSpawns(room);
    try {this.harvesterSpawn();} catch(err) {console.log(err+": Room.cycle.js this.harvesterSpawn()");}
    checkSpawns(room);
    try {this.courierSpawn();} catch(err) {console.log(err+": Room.cycle.js this.courierSpawn()");}
    checkSpawns(room);
    try {this.upgraderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.upgraderSpawn()");}
    checkSpawns(room);
    try {this.builderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.builderSpawn()");}
    spawns = this.find(FIND_MY_SPAWNS);
    for(var name in spawns) {
        var spawn = spawns[name];
        //spawn.cycle();
    }
    var creeps = this.find(FIND_MY_CREEPS);
    for(var name in creeps) {
        var creep = creeps[name];
        try {creep.cycle();} catch(err) {console.log(err+": Room.cycle.js creep.cycle()");}
    }
    //try {this.roadBuilder();} catch(err) {console.log(err+" Room.cycle.js this.roadBuilder()");}
};

module.exports = RoomCycle;
