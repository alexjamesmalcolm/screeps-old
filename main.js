var roleHarvester = require('role.harvester.js');
var roleBuilder = require('role.builder.js');
var roleUpgrader = require('role.upgrader.js');
var creepCount = {
    harvesters: 3,
    upgraders: 4,
    builders: 4
};

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(harvesters.length < creepCount['harvesters']) {
            var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            console.log('Spawning new harvester: ' + newName);
        } else if(upgraders.length < creepCount['upgraders']) {
            var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        } else if(builders.length < creepCount['builders']) {
            var newName = spawn.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
