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

var RoomSpawns = function() {
    var harvesters = _.filter(this.memory.found.myCreeps, function(creep) {
        if(creep.memory.role === 'harvester') {
            return true;
        }
    });
    var hostiles;
    var hostileFlags;
    checkSpawns(this);
    try {this.harvesterSpawn();} catch(err) {console.log(err+": Room.cycle.js this.harvesterSpawn()");}
    if(harvesters.length > 0) {
        checkSpawns(this);
        try {this.spawnKeeperSpawn();} catch(err) {console.log(err+": Room.cycle.js this.spawnKeeperSpawn()");}
        checkSpawns(this);
        try {this.courierSpawn();} catch(err) {console.log(err+": Room.cycle.js this.courierSpawn()");}
        checkSpawns(this);
        try {this.upgraderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.upgraderSpawn()");}
        checkSpawns(this);
        try {this.builderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.builderSpawn()");}
    }
};

module.exports = RoomSpawns;
