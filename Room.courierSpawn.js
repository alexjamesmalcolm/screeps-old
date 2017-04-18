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
        carryBodyparts: carryBodyparts,
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
