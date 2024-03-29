var optimalUpgrader = function(room) {
    var i;
    var ticksToUpgrade = 30;
    var workBodyparts = Math.floor((2 * CARRY_CAPACITY * room.energyAvailable) / ((2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]) * ticksToUpgrade * UPGRADE_CONTROLLER_POWER + CARRY_CAPACITY * (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK])));
    //z
    // z = (2 * C * t) / ((2 * c + m) * T * U + C * (m + 2 * w))
    var carryBodyparts = Math.floor((ticksToUpgrade * UPGRADE_CONTROLLER_POWER * workBodyparts) / CARRY_CAPACITY);
    //y
    // T = (carryBodyparts * CARRY_CAPACITY) / (UPGRADE_CONTROLLER_POWER * workBodyparts)
    // T = (y * 50) / (1 * z)
    // y = (T * U * z) / C
    var moveBodyparts = Math.floor((workBodyparts + carryBodyparts) / 2);
    //x
    //x = (z + y) / 2
    var creepCost = moveBodyparts * BODYPART_COST[MOVE] + carryBodyparts * BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK];
    // t = x * m + y * c + z * w
    var bodyparts = [];
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
            carryBodyparts: carryBodyparts,
            creepCost: creepCost
        };
    }
};
var RoomUpgraderSpawn = function() {
    var multiplier = 0.5;
    var upgraderLimit = Math.ceil(this.memory.harvestPoints * multiplier);
    var myCreeps = this.memory.found.myCreeps;
    var upgraders = _.filter(myCreeps, function(creep) {
        if(creep.memory.recycle) {
            return false;
        } else if(creep.memory.role == 'upgrader') {
            return true;
        }
    });
    var upgrader = optimalUpgrader(this);
    if(upgraders.length > 0) {
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
            if(this.memory.spawns.length > 0) {
                if(upgrader.workBodyparts > upgraders[0].getActiveBodyparts(WORK)) {
                    upgraders[0].memory.recycle = true;
                    this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                    this.memory.spawns[0].memory.busy = Game.time;
                } else if(upgradePerTick + upgrader.workBodyparts < this.memory.harvestPerTick * multiplier) {
                    if(upgraders.length < upgraderLimit) {
                        this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                        this.memory.spawns[0].memory.busy = Game.time;
                    }
                }
            }
        }
        if(upgradePerTick > this.memory.harvestPerTick * multiplier) {
            upgraders[0].memory.recycle = true;
        }
        if(upgraders.length > upgraderLimit) {
            upgraders[0].memory.recycle = true;
        }
    } else {
        if(upgrader) {
            if(this.memory.spawns.length > 0) {
                this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
                this.memory.spawns[0].memory.busy = Game.time;
            }
        }
    }
};

module.exports = RoomUpgraderSpawn;
