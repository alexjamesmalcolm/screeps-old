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
        if(harvesters.length > 0) {
            harvesters.sort(function(a, b) {
                return a.getActiveBodyparts(WORK) > b.getActiveBodyparts(WORK);
            });
            var workBodyParts = Math.floor(-(BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - this.energyAvailable) / BODYPART_COST[WORK]);
            if(workBodyParts > 6) {
                workBodyParts = 6;
            }
            var moveBodyParts = Math.floor((this.energyAvailable - BODYPART_COST[WORK] * workBodyParts - BODYPART_COST[CARRY]) / BODYPART_COST[MOVE]);
            if(moveBodyParts > workBodyParts / 3) {
                moveBodyParts = workBodyParts / 3;
            }
            var creepCost = moveBodyParts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyParts * BODYPART_COST[WORK];
            var bodyparts = [CARRY];
            for(var i = 0; i < workBodyParts; i++) {
                bodyparts.push(WORK);
            }
            for(var i = 0; i < moveBodyParts; i++) {
                bodyparts.push(MOVE);
            }
            if(harvesters.length > sources.length) {
                harvesters[0].memory.recycle = true;
            } else if(workBodyParts > harvesters[0].getActiveBodyparts(WORK)) {
                harvesters[0].memory.recycle = true;
                spawns[0].createCreep(bodyparts, undefined, {role: 'harvester'});
            }
        } else {
            var workBodyParts = Math.floor(-(BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - this.energyAvailable) / BODYPART_COST[WORK]);
            if(workBodyParts > 6) {
                workBodyParts = 6;
            }
            var moveBodyParts = Math.floor((this.energyAvailable - BODYPART_COST[WORK] * workBodyParts - BODYPART_COST[CARRY]) / BODYPART_COST[MOVE]);
            if(moveBodyParts > workBodyParts / 3) {
                moveBodyParts = workBodyParts / 3;
            }
            var creepCost = moveBodyParts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyParts * BODYPART_COST[WORK];
            var bodyparts = [CARRY];
            for(var i = 0; i < workBodyParts; i++) {
                bodyparts.push(WORK);
            }
            for(var i = 0; i < moveBodyParts; i++) {
                bodyparts.push(MOVE);
            }
            spawns[0].createCreep(bodyparts, undefined, {role: 'harvester'});
        }
    }
};
};

module.exports = RoomHarvesterSpawn;
