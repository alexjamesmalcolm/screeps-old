var optimalUpgrader = function(room) {
    var carryBodyparts = 1;
    var moveBodyparts = Math.floor((workBodyparts + carryBodyparts) / 2);
    var workBodyparts = Math.floor(-(BODYPART_COST[MOVE] - 2 * room.energyAvailable + 2 * carryBodyparts * BODYPART_COST[CARRY]) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    var creepCost = moveBodyparts * BODYPART_COST[MOVE] + carryBodyparts * BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK];
    var bodyparts = [];
    for(var i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    for(var i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(var i = 0; i < carryBodyparts; i++) {
        bodyparts.push(CARRY);
    }
    return {
        bodyparts: bodyparts,
        workBodyparts: workBodyparts,
        moveBodyparts: moveBodyparts,
        carryBodyparts: carryBodyparts
    };
};
var RoomUpgraderSpawn = function() {
    var spawns = this.find(FIND_MY_SPAWNS, {
        filter: function(spawn) {
            if(spawn.spawning) {
                return false;
            } else {
                return true;
            }
        }
    });
    if(spawns.length) {
        var sources = this.find(FIND_SOURCES);
        var upgraders = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.recycle) {
                    return false;
                } else if(creep.memory.role == 'upgrader') {
                    return true;
                }
            }
        });
        upgraders.sort(function(a, b) {
            var a_work = a.getActiveBodyparts(WORK);
            var b_work = b.getActiveBodyparts(WORK);
            return a_work < b_work;
        });
        var upgrader = optimalUpgrader(this);
        var upgradePerTick = 0;
        upgraders.forEach(function(creep) {
            upgradePerTick = upgradePerTick + creep.getActiveBodyparts(WORK);
        });
        //console.log(upgradePerTick);
        if(upgrader.workBodyparts > upgraders[0].getActiveBodyparts(WORK)) {
            upgraders[0].memory.recycle = true;
            spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
        } else if(upgradePerTick < 15) {
            spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
        } else if(upgradePerTick > 20) {
            upgraders[0].memory.recycle = true;
        }
    }
};
module.exports = RoomUpgraderSpawn;
