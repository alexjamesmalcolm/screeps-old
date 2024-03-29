var optimalCourier = function(room) {
    var carryBodyparts, moveBodyparts, creepCost, bodyparts, i;
    /*moveBodyparts = Math.floor(room.energyAvailable / (2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]));
    //x = t / (2 * c + m)
    carryBodyparts = Math.floor(2 * moveBodyparts);
    //y = 2 * x*/
    moveBodyparts = 6;
    carryBodyparts = 6;
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
    var multiplier = 0.5;
    var creeps = this.memory.found.myCreeps;
    var couriers = _.filter(creeps, function(creep) {
        if(creep.memory.recycle) {
            return false;
        } else if(creep.memory.role == 'courier') {
            return true;
        }
    });
    var courier = optimalCourier(this);
    var totalCarry = 0;
    var droppedResources = 0;
    this.memory.found.droppedEnergy.forEach(function(resource) {
        droppedResources = droppedResources + resource.amount;
    });
    var containerEnergy = 0;
    this.memory.found.structures.forEach(function(structure) {
        if(structure.structureType === STRUCTURE_CONTAINER) {
            containerEnergy = containerEnergy + _.sum(structure.store);
        }
    });
    var transitEnergy = droppedResources + containerEnergy;
    var links = this.memory.found.links;
    if(links.length >= 2) {
        var linkClosestToStorage = this.storage.pos.findClosestByRange(links, {
            filter: function(structure) {
                if(structure.structureType === STRUCTURE_LINK) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        var linkEnergy = linkClosestToStorage.energy;
        transitEnergy = transitEnergy + linkEnergy;
    }
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
        couriers.forEach(function(creep, i) {
            totalCarry = totalCarry + CARRY_CAPACITY * creep.getActiveBodyparts(CARRY);
        });
    }
    if(this.memory.spawns.length > 0) {
        var storage = this.storage;
        if(storage) {
            if(courier) {
                if(couriers.length > 0) {
                    if(courier.carryBodyparts > couriers[0].getActiveBodyparts(CARRY)) {
                        if(Math.ceil(couriers[0].weight() / couriers[0].getActiveBodyparts(MOVE)) >= 1) {
                            couriers[0].memory.recycle = true;
                            this.memory.spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
                            this.memory.spawns[0].memory.busy = Game.time;
                        }
                    }
                }
                if(transitEnergy * multiplier > totalCarry + CARRY_CAPACITY * courier.carryBodyparts) {
                    this.memory.spawns[0].createCreep(courier.bodyparts, undefined, {role: 'courier'});
                    this.memory.spawns[0].memory.busy = Game.time;
                }
            }
        }
    }
    if(transitEnergy * multiplier < totalCarry) {
        couriers[0].memory.recycle = true;
    }
};

module.exports = RoomCourierSpawn;
