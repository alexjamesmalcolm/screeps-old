var checkSpawns = function(room) {
    var spawns = room.memory.found.mySpawns;
    var activeSpawns = _.filter(spawns, function(spawn) {
        if(spawn.spawning || spawn.memory.busy == Game.time) {
            return false;
        } else {
            return true;
        }
    });
    if(!activeSpawns.length) {
        room.memory.spawns = [];
    } else {
        room.memory.spawns = activeSpawns;
    }
};
var RoomCycle = function() {
    var name, room, sources, creeps, spawns, spawn, energyPercent;
    room = this;
    energyPercent = this.energyAvailable / this.energyCapacityAvailable;
    this.memory.energyPercent = energyPercent;
    try {this.paths();} catch(err) {console.log(err+": Room.cycle.js this.paths()");}
    try {this.findAll();} catch(err) {console.log(err+": Room.cycle.js this.findAll()");}
    sources = this.memory.found.sources;
    this.memory.harvestPoints = 0;
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
    spawns = this.find(FIND_MY_SPAWNS);
    try {this.links();} catch(err) {console.log(err+": Room.cycle.js this.links()");}
    for(name in spawns) {
        if(spawns[name]) {
            spawn = spawns[name];
            try {spawn.cycle();} catch(err) {console.log(err+": Room.cycle.js spawn.cycle()");}
        }
    }
    try {this.spawn();} catch(err) {console.log(err+": Room.cycle.js this.spawn()");}
    try {this.towers();} catch(err) {console.log(err+": Room.cycle.js this.towers()");}
    creeps = this.memory.found.myCreeps;
    for(name in creeps) {
        if(creeps[name]) {
            var creep = creeps[name];
            try {creep.cycle();} catch(err) {console.log(err+": Room.cycle.js creep.cycle()");}
        }
    }
};

module.exports = RoomCycle;
