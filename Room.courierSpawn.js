var optimalCourier = function(room) {
    var moveBodyparts = room.energyAvailable / (BODYPART_COST[MOVE] + BODYPART_COST[CARRY]);
    var carryBodyparts = room.energyAvailable / (BODYPART_COST[MOVE] + BODYPART_COST[CARRY]);
    var creepCost = moveBodyparts * BODYPART_COST[MOVE] + carryBodyparts * BODYPART_COST[CARRY];
    var bodyparts = [];
    for(var i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    for(var i = 0; i < carryBodyparts; i++) {
        bodyparts.push(CARRY);
    }
    return {
        bodyparts: bodyparts,
        moveBodyparts: moveBodyparts,
        carryBodyparts: carryBodyparts
    };
};
var RoomCourierSpawn = function() {
    var spawns = this.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(spawns.length > 0) {
        var sources = this.find(FIND_SOURCES);
        var couriers = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.recycle) {
                    return false;
                } else if(creep.memory.role == 'courier') {
                    return true;
                }
            }
        });
        couriers.sort(function(a, b){
            return Math.ceil(a.weight() / a.getActiveBodyparts[MOVE]) < Math.ceil(b.weight() / b.getActiveBodyparts[MOVE]);
        });
        console.log(couriers);
    }
};
module.exports = RoomCourierSpawn;
/*
var RoomHarvesterSpawn = function() {
    var spawns = this.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(spawns.length > 0) {
        var sources = this.find(FIND_SOURCES);
        room = Game.rooms['W93S6'];
        var harvesters = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.recycle) {
                    return false;
                } else if(creep.memory.role == 'harvester') {
                    return true;
                }
            }
        });
        harvesters.sort(function(a, b) {
            return a.getActiveBodyparts(WORK) > b.getActiveBodyparts(WORK);
        });
        if(harvesters.length > sources.length) {
            harvesters[0].memory.recycle = true;
        } else if(optimalHarvester.workBodyparts > harvesters[0].getActiveBodyparts(WORK)) {
            harvesters[0].memory.recycle = true;
            spawns[0].createCreep(optimalHarvester.bodyparts, undefined, {role: 'harvester'});
        } else if(harvesters.length < sources.length) {
            spawns[0].createCreep(optimalHarvester(room).bodyparts, undefined, {role: 'harvester'});
        }
    }
};

module.exports = RoomHarvesterSpawn;

*/
