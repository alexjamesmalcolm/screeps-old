var optimalUpgrader = function(room) {
    var moveBodyparts;
    var carryBodyparts;
    var workBodyparts;
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
        } else if(upgradePerTick < 10) {
            spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
        } else if(upgradePerTick > 20) {
            upgraders[0].memory.recycle = true;
        }
    }
};
module.exports = RoomUpgraderSpawn;
/*
var RoomCourierSpawn = function() {
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
            var a_movementTime = Math.ceil(a.weight() / a.getActiveBodyparts[MOVE]);
            var b_movementTime = Math.ceil(b.weight() / b.getActiveBodyparts[MOVE]);
            var a_carry = a.getActiveBodyparts(CARRY);
            var b_carry = b.getActiveBodyparts(CARRY);
            if(a_movementTime == b_movementTime) {
                return a_carry < b_carry;
            } else {
                return  a_movementTime > b_movementTime;
            }
        });
        var courier = optimalCourier(this);
        if(courier.carryBodyparts > couriers[0].getActiveBodyparts(CARRY)) {
            if(Math.ceil(couriers[0].weight() / couriers[0].getActiveBodyparts(MOVE)) >= 1) {
                couriers[0].memory.recycle = true;
                spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
            }
        } else if(couriers.length < sources.length) {
            spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
        } else if(couriers.length > sources.length) {
            couriers[0].memory.recycle = true;
        }
    }
};
module.exports = RoomCourierSpawn;

*/
