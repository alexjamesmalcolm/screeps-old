var creepCount = require('creepCount');
var harvesterSpawn = function(room) {
    var spawns = room.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(spawns.length > 0) {
        var sources = room.find(FIND_SOURCES);
        room = Game.rooms['W93S6'];
        var harvesters = room.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.recycle) {
                    return false;
                } else if(creep.memory.role == 'harvester') {
                    return true;
                }
            }
        });
        if(harvesters.length > 0) {
            harvesters.sort(function(a, b) {
                return a.getActiveBodyparts(WORK) > b.getActiveBodyparts(WORK);
            });
            var workBodyParts = Math.floor(-(BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - room.energyAvailable) / BODYPART_COST[WORK]);
            if(workBodyParts > 6) {
                workBodyParts = 6;
            }
            var moveBodyParts = Math.floor((room.energyAvailable - BODYPART_COST[WORK] * workBodyParts - BODYPART_COST[CARRY]) / BODYPART_COST[MOVE]);
            if(moveBodyParts > workBodyParts / 3) {
                moveBodyParts = workBodyParts / 3;
            }
            var creepCost = moveBodyParts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyParts * BODYPART_COST[WORK];
            var bodyparts = [CARRY];
            for(var i = 0; i < workBodyParts; i++) {
                bodyparts.push(WORK);
            }
            for(var i = 0; i < moveBodyParts; i++) {
                bodyparts.push(MOVE);
            }
            if(harvesters.length > sources.length) {
                harvesters[0].memory.recycle = true;
            } else if(workBodyParts > harvesters[0].getActiveBodyparts(WORK)) {
                if(spawn) {
                    harvesters[0].memory.recycle = true;
                    spawns[0].createCreep(bodyparts, undefined, {role: 'harvester'});
                }
            }
        } else {
            var workBodyParts = Math.floor(-(BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - room.energyAvailable) / BODYPART_COST[WORK]);
            if(workBodyParts > 6) {
                workBodyParts = 6;
            }
            var moveBodyParts = Math.floor((room.energyAvailable - BODYPART_COST[WORK] * workBodyParts - BODYPART_COST[CARRY]) / BODYPART_COST[MOVE]);
            if(moveBodyParts > workBodyParts / 3) {
                moveBodyParts = workBodyParts / 3;
            }
            var creepCost = moveBodyParts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyParts * BODYPART_COST[WORK];
            var bodyparts = [CARRY];
            for(var i = 0; i < workBodyParts; i++) {
                bodyparts.push(WORK);
            }
            for(var i = 0; i < moveBodyParts; i++) {
                bodyparts.push(MOVE);
            }
            spawns[0].createCreep(bodyparts, undefined, {role: 'harvester'});
        }
    }
};
var RoomCycle = function() {
    harvesterSpawn(this);
    var spawns = this.find(FIND_MY_SPAWNS);
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

/*
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
    }
};

module.exports = SpawnCycle;

*/
