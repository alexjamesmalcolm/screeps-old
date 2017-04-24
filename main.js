var creepCount = require('creepCount');
try{
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
    Creep.prototype.weight = require('Creep.weight');
    Creep.prototype.sick = require('Creep.sick');
    Creep.prototype.pathing = require('Creep.pathing');
    Room.prototype.cycle = require('Room.cycle');
    Room.prototype.harvesterSpawn = require('Room.harvesterSpawn');
    Room.prototype.courierSpawn = require('Room.courierSpawn');
    Room.prototype.upgraderSpawn = require('Room.upgraderSpawn');
    Room.prototype.builderSpawn = require('Room.builderSpawn');
    Room.prototype.paths = require('Room.paths');
    Spawn.prototype.cycle = require('Spawn.cycle');
} catch(err) {
    console.log(err+": initializing prototypes");
}
const profiler = require('screeps-profiler');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function() {
        for(var name in Memory.creeps) {
            var creep = Game.creeps[name];
            if(creep) {
                if(creep.ticksToLive <= 1) {
                    for(var resourceType in creep.carry) {
                        creep.drop(resourceType);
                    }
                    creep.suicide();
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
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
