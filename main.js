try {
    Creep.prototype.collect = require('Creep.collect');
    Creep.prototype.cycle = require('Creep.cycle');
    Creep.prototype.deposit = require('Creep.deposit');
    Creep.prototype.maintainBuild = require('Creep.maintainBuild');
    Creep.prototype.passiveRepair = require('Creep.passiveRepair');
    Creep.prototype.pathing = require('Creep.pathing');
    Creep.prototype.roleBuilder = require('Creep.roleBuilder');
    Creep.prototype.roleClaimer = require('Creep.roleClaimer');
    Creep.prototype.roleCourier = require('Creep.roleCourier');
    Creep.prototype.roleFighter = require('Creep.roleFighter');
    Creep.prototype.roleHarvester = require('Creep.roleHarvester');
    Creep.prototype.roleSpawnKeeper = require('Creep.roleSpawnKeeper');
    Creep.prototype.roleUpgrader = require('Creep.roleUpgrader');
    Creep.prototype.sick = require('Creep.sick');
    Creep.prototype.weight = require('Creep.weight');
    Room.prototype.builderSpawn = require('Room.builderSpawn');
    Room.prototype.courierSpawn = require('Room.courierSpawn');
    Room.prototype.cycle = require('Room.cycle');
    Room.prototype.fighterSpawn = require('Room.fighterSpawn');
    Room.prototype.findAll = require('Room.findAll');
    Room.prototype.harvesterSpawn = require('Room.harvesterSpawn');
    Room.prototype.links = require('Room.links');
    Room.prototype.paths = require('Room.paths');
    Room.prototype.roadBuilder = require('Room.roadBuilder');
    Room.prototype.spawn = require('Room.spawn');
    Room.prototype.spawnKeeperSpawn = require('Room.spawnKeeperSpawn');
    Room.prototype.towers = require('Room.towers');
    Room.prototype.upgraderSpawn = require('Room.upgraderSpawn');
    Spawn.prototype.cycle = require('Spawn.cycle');
} catch(err) {console.log(err+": main.js 1");}
const profiler = require('screeps-profiler');
profiler.enable();
module.exports.loop = function () {
    profiler.wrap(function() {
        var name;
        for(name in Memory.creeps) {
            if(Memory.creeps[name]) {
                var creep = Game.creeps[name];
                if(creep) {
                    if(creep.ticksToLive <= 1) {
                        for(var resourceType in creep.carry) {
                            if(creep.carry[resourceType]) {
                                creep.drop(resourceType);
                            }
                        }
                        try {creep.suicide();} catch(err) {console.log(err+": main.js creep.suicide()");}
                        delete Memory.creeps[name];
                        console.log('Clearing non-existing creep memory:', name);
                    }
                }
                if(!Game.creeps[name]) {
                    delete Memory.creeps[name];
                    console.log('Clearing non-existing creep memory:', name);
                }
            }
        }
        for(name in Game.rooms) {
            if(Game.rooms[name]) {
                var room = Game.rooms[name];
                try {room.cycle();} catch(err) {console.log(err+": main.js room.cycle()");}
            } else {
                delete Memory.rooms[name];
                console.log('Clearing non-existing room memory:', name);
            }
        }
    });
};
