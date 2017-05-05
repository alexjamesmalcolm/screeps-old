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
    checkSpawns(room);
    try {this.harvesterSpawn();} catch(err) {console.log(err+": Room.cycle.js this.harvesterSpawn()");}
    checkSpawns(room);
    try {this.spawnKeeperSpawn();} catch(err) {console.log(err+": Room.cycle.js this.spawnKeeperSpawn()");}
    checkSpawns(room);
    try {this.courierSpawn();} catch(err) {console.log(err+": Room.cycle.js this.courierSpawn()");}
    checkSpawns(room);
    try {this.upgraderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.upgraderSpawn()");}
    checkSpawns(room);
    try {this.builderSpawn();} catch(err) {console.log(err+": Room.cycle.js this.builderSpawn()");}
};

module.exports = RoomSpawns;
