var creepCount = require('creepCount');
var SpawnCycle = function() {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
    var sick = _.filter(Game.creeps, (creep) => creep.memory.sick);
    //console.log("There are "+harvesters.length+" harvesters, "+upgraders.length+" upgraders, "+builders.length+" builders, "+fighters.length+" fighters, and "+sick.length+" sick");
    if(harvesters.length < creepCount['harvesters']) {
        var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        //console.log('Spawning new harvester: ' + newName);
    } else if(couriers.length < creepCount['couriers']) {
        var newName = spawn.createCreep([CARRY,CARRY,MOVE,MOVE], undefined, {role: 'courier'});
    } else if(upgraders.length < creepCount['upgraders']) {
        var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
        //console.log('Spawning new upgrader: ' + newName);
    } else if(builders.length < creepCount['builders']) {
        var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
        //console.log('Spawning new builder: ' + newName);
    } else if(fighters.length < creepCount['fighters']) {
        var newName = spawn.createCreep([MOVE,MOVE,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], undefined, {role: 'fighter'});
        //console.log('Spawning new fighter: ' + newName);
    }
};

module.exports = SpawnCycle;
