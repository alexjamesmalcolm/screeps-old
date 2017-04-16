var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleFighter = require('role.fighter');
var roleCourier = require('role.courier');
var stateDying = require('state.dying');
var creepCount = {
    harvesters: 6,
    upgraders: 6,
    builders: 1,
    fighters: 0,
    sick: 2,
    couriers: 3
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
        var couriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'courier');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var fighters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fighter');
        var sick = _.filter(Game.creeps, (creep) => creep.memory.sick);
        console.log("There are "+harvesters.length+" harvesters, "+upgraders.length+" upgraders, "+builders.length+" builders, "+fighters.length+" fighters, and "+sick.length+" sick");
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
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var sick = _.filter(Game.creeps, (creep) => creep.memory.sick);
        if(!creep.memory.sick) {
            if(sick < creepCount.sick) {
                if(creep.ticksToLive < 500) {
                    creep.memory.sick = true;
                }
            } else {
                creep.memory.sick = false;
            }
        }
        if(creep.memory.sick) {
            stateDying.run(creep);
        } else if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if(creep.memory.role == 'fighter') {
            roleFighter.run(creep);
        } else if(creep.memory.role == 'courier') {
            roleCourier.run(creep);
        }
    }
}
