//var creepCount = require('creepCount');
var SpawnCycle = function() {
    var creepsInRange, creep;
    creepsInRange = this.pos.findInRange(FIND_MY_CREEPS, 1);
    if(creepsInRange.length > 0) {
        this.memory.busy = Game.time;
        creepsInRange.sort(function(a, b) {
            return a.ticksToLive - b.ticksToLive;
        });
        creep = creepsInRange[0];
        if(this.renewCreep(creep) === OK) {
            this.renewCreep(creep);
        }
    }
    /*
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    var sick = _.filter(Game.creeps, (creep) => creep.memory.sick);
    //console.log("There are "+harvesters.length+" harvesters, "+upgraders.length+" upgraders, "+builders.length+" builders, "+fighters.length+" fighters, and "+sick.length+" sick");
    if(harvesters.length < creepCount['harvesters']) {
        var newName = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        //console.log('Spawning new harvester: ' + newName);
    } else if(couriers.length < creepCount['couriers']) {
        var newName = this.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'courier'});
    } else if(upgraders.length < creepCount['upgraders']) {
        var newName = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new upgrader: ' + newName);
    } else if(builders.length < creepCount['builders']) {
        var newName = this.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new builder: ' + newName);
    } else if(fighters.length < creepCount['fighters']) {
        var newName = this.createCreep([MOVE,MOVE,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], undefined, {role: 'fighter'});
        //console.log('Spawning new fighter: ' + newName);
    }*/
};

module.exports = SpawnCycle;
