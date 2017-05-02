var optimalSpawnKeeper = function(room) {
    var carryBodyparts, moveBodyparts, creepCost, bodyparts, i;
    moveBodyparts = Math.floor(room.energyAvailable / (2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]));
    //x = t / (2 * c + m)
    carryBodyparts = Math.floor(2 * moveBodyparts);
    //y = 2 * x
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
var RoomSpawnKeeperSpawn = function() {
    var spawnKeepers = this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            if(creep.memory.recycle) {
                return false;
            } else if(creep.memory.role == 'spawnKeeper') {
                return true;
            }
        }
    });
    var spawnKeeper = optimalSpawnKeeper(this);
    if(spawnKeepers.length > 0) {
        spawnKeepers.sort(function(a, b){
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
        spawnKeepers.forEach(function(creep, i) {
            totalCarry = totalCarry + CARRY_CAPACITY * creep.getActiveBodyparts(CARRY);
        });
        if(this.memory.spawns.length > 0) {
            if(spawnKeeper) {
                if(spawnKeeper.carryBodyparts > spawnKeepers[0].getActiveBodyparts(CARRY)) {
                    if(Math.ceil(spawnKeepers[0].weight() / spawnKeepers[0].getActiveBodyparts(MOVE)) >= 1) {
                        spawnKeepers[0].memory.recycle = true;
                        this.memory.spawns[0].createCreep(spawnKeeper.bodyparts, undefined, {role: 'spawnKeeper'});
                        this.memory.spawns[0].memory.spawning = Game.time;
                    }
                }
            }
        }
    } else {
        if(spawnKeeper) {
            this.memory.spawns[0].createCreep(spawnKeeper.bodyparts, undefined, {role: 'spawnKeeper'});
            this.memory.spawns[0].memory.spawning = Game.time;
        }
    }
};

module.exports = RoomSpawnKeeperSpawn;
