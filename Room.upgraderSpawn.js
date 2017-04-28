var optimalUpgrader = function(room) {
    var carryBodyparts, workBodyparts, moveBodyparts, creepCost, bodyparts, i;
    carryBodyparts = 1;
    workBodyparts = Math.floor(-(BODYPART_COST[MOVE] - 2 * room.energyAvailable + 2 * carryBodyparts * BODYPART_COST[CARRY]) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    moveBodyparts = Math.floor((workBodyparts + carryBodyparts) / 2);
    creepCost = moveBodyparts * BODYPART_COST[MOVE] + carryBodyparts * BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK];
    bodyparts = [];
    for(i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    for(i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(i = 0; i < carryBodyparts; i++) {
        bodyparts.push(CARRY);
    }
    if(workBodyparts > 0 && moveBodyparts > 0) {
        return {
            bodyparts: bodyparts,
            workBodyparts: workBodyparts,
            moveBodyparts: moveBodyparts,
            carryBodyparts: carryBodyparts
        };
    }
};
var RoomUpgraderSpawn = function() {
    if(this.memory.spawns.length) {
        var upgraders = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                if(creep.memory.recycle) {
                    return false;
                } else if(creep.memory.role == 'upgrader') {
                    return true;
                }
            }
        });
        var upgrader = optimalUpgrader(this);
        if(upgraders.length > 0) { //this shouldn't go here
            upgraders.sort(function(a, b) {
                var a_work = a.getActiveBodyparts(WORK);
                var b_work = b.getActiveBodyparts(WORK);
                return a_work - b_work;
            });
            var upgradePerTick = 0;
            upgraders.forEach(function(creep) {
                upgradePerTick = upgradePerTick + creep.getActiveBodyparts(WORK);
            });
            //console.log(JSON.stringify(this));
            if(upgrader) {
                if(upgrader.workBodyparts > upgraders[0].getActiveBodyparts(WORK)) {
                    upgraders[0].memory.recycle = true;
                    this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                    this.memory.spawns[0].memory.spawning = Game.time;
                } else if(upgradePerTick + upgrader.workBodyparts < this.memory.harvestPerTick * 0.5) {
                    this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                    this.memory.spawns[0].memory.spawning = Game.time;
                }
            }
            if(upgradePerTick > this.memory.harvestPerTick * 0.5) {
                upgraders[0].memory.recycle = true;
            }
        } else {
            if(upgrader) {
                this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                this.memory.spawns[0].memory.spawning = Game.time;
            }
        }
    }
};
module.exports = RoomUpgraderSpawn;
