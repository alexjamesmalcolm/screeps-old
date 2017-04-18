var optimalCourier = function(room) {};
var RoomCourierSpawn = function() {}
module.exports = RoomCourierSpawn;
/*
var optimalHarvester = function(room) {
    var workBodyparts = Math.floor(-(BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - room.energyAvailable) / BODYPART_COST[WORK]);
    if(workBodyparts > 6) {
        workBodyparts = 6;
    }
    var moveBodyparts = Math.floor((room.energyAvailable - BODYPART_COST[WORK] * workBodyparts - BODYPART_COST[CARRY]) / BODYPART_COST[MOVE]);
    if(moveBodyparts > workBodyparts / 3) {
        moveBodyparts = workBodyparts / 3;
    }
    var creepCost = moveBodyparts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK];
    var bodyparts = [CARRY];
    for(var i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(var i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    return {
        bodyparts: bodyparts,
        moveBodyparts: moveBodyparts,
        workBodyparts: workBodyparts
    };
};

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
