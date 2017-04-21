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
