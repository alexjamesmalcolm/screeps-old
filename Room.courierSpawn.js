var optimalCourier = function(room) {
    var carryBodyparts, moveBodyparts, creepCost, bodyparts, i;
    //var carryBodyparts = Math.floor(room.energyAvailable / (BODYPART_COST[MOVE] + BODYPART_COST[CARRY]));
    carryBodyparts = Math.floor((2 * room.energyAvailable) / (2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]));
    //y = (2 * t) / (2 * c + m)
    //var moveBodyparts = Math.floor(room.energyAvailable / (BODYPART_COST[MOVE] + BODYPART_COST[CARRY]));
    moveBodyparts = Math.floor(carryBodyparts / 2);
    //x = y / 2
    creepCost = moveBodyparts * BODYPART_COST[MOVE] + carryBodyparts * BODYPART_COST[CARRY];
    //t = x * m + y * c
    bodyparts = [];
    for(i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    for(i = 0; i < carryBodyparts; i++) {
        bodyparts.push(CARRY);
    }
    if(carryBodyparts > 0) {
        if(moveBodyparts > 0) {
            return {
                bodyparts: bodyparts,
                moveBodyparts: moveBodyparts,
                carryBodyparts: carryBodyparts,
                creepCost: creepCost
            };
        }
    }
};
var RoomCourierSpawn = function() {
    var couriers = this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            if(creep.memory.recycle) {
                return false;
            } else if(creep.memory.role == 'courier') {
                return true;
            }
        }
    });
    var courier = optimalCourier(this);
    if(couriers.length > 0) {
        couriers.sort(function(a, b){
            //var a_movementTime = Math.ceil(a.weight() / a.getActiveBodyparts[MOVE]);
            //var b_movementTime = Math.ceil(b.weight() / b.getActiveBodyparts[MOVE]);
            var a_carry = a.getActiveBodyparts(CARRY);
            var b_carry = b.getActiveBodyparts(CARRY);
            return a_carry - b_carry; //Simplification made so that couriers optimized for the roads would be considered equal to unoptimized couriers
            /*
            if(a_movementTime == b_movementTime) {
                return a_carry - b_carry;
            } else {
                return  a_movementTime - b_movementTime;
            }
            */
        });
        var totalCarry = 0;
        couriers.forEach(function(creep, i) {
            totalCarry = totalCarry + CARRY_CAPACITY * creep.getActiveBodyparts(CARRY);
        });
        var droppedResources = 0;
        this.find(FIND_DROPPED_RESOURCES).forEach(function(resource) {
            droppedResources = droppedResources + resource.amount;
        });
        var transitEnergy = droppedResources + this.energyCapacityAvailable;
        if(this.memory.spawns.length > 0) {
            if(courier) {
                if(courier.carryBodyparts > couriers[0].getActiveBodyparts(CARRY)) {
                    if(Math.ceil(couriers[0].weight() / couriers[0].getActiveBodyparts(MOVE)) >= 1) {
                        couriers[0].memory.recycle = true;
                        this.memory.spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
                        this.memory.spawns[0].memory.spawning = Game.time;
                    }
                }
                if(transitEnergy * 0.33 > totalCarry + CARRY_CAPACITY * courier.carryBodyparts) {
                    this.memory.spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
                    this.memory.spawns[0].memory.spawning = Game.time;
                }
            }
            if(transitEnergy * 0.33 < totalCarry) {
                if(couriers.length > 1) {
                    couriers[0].memory.recycle = true;
                }
            }
        }
    } else {
        if(courier) {
            this.memory.spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
            this.memory.spawns[0].memory.spawning = Game.time;
        }
    }
};

module.exports = RoomCourierSpawn;
