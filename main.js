var creepCount = require('creepCount');
Creep.prototype.collect = require('Creep.collect');
Creep.prototype.cycle = require('Creep.cycle');
Creep.prototype.deposit = require('Creep.deposit');
Creep.prototype.maintainBuild = require('Creep.maintainBuild');
Creep.prototype.passiveRepair = require('Creep.passiveRepair');
Creep.prototype.roleBuilder = require('Creep.roleBuilder');
Creep.prototype.roleCourier = require('Creep.roleCourier');
Creep.prototype.roleFighter = require('Creep.roleFighter');
Creep.prototype.roleHarvester = require('Creep.roleHarvester');
Creep.prototype.roleUpgrader = require('Creep.roleUpgrader');
Room.prototype.cycle = require('Room.cycle');
Room.prototype.harvesterSpawn = require('Room.harvesterSpawn');
Spawn.prototype.cycle = require('Spawn.cycle');
const profiler = require('screeps-profiler');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for(var name in Game.rooms) {
            var room = Game.rooms[name];
            room.cycle();
        }
    });
}
