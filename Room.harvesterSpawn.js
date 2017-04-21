var optimalHarvester = function(room) {
    var workBodyparts = Math.floor(-(2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - 2 * room.energyAvailable) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    //-(2 c + m - 2 t)/(m + 2 w)
    var moveBodyparts = Math.floor((workBodyparts + 1) / 2);
    //(b + 1) * 0.5
    var creepCost = moveBodyparts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK]; // t = a * m + c + b * w
    var bodyparts = [CARRY];
    for(var i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(var i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    if(workBodyparts > 0 && moveBodyparts > 0) {
        return {
            bodyparts: bodyparts,
            moveBodyparts: moveBodyparts,
            workBodyparts: workBodyparts
        };
    }
}

var RoomHarvesterSpawn = function() {
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
    var harvester = optimalHarvester(this);
    var harvestPerTick = 0;
    if(harvesters.length > 0) {
        harvesters.sort(function(a, b) {
            return a.getActiveBodyparts(WORK) > b.getActiveBodyparts(WORK);
        });
        harvesters.forEach(function(creep) {
            harvestPerTick = harvestPerTick + HARVEST_POWER * creep.getActiveBodyparts(WORK);
        });
        //console.log(harvester);
        if(harvestPerTick > 2 * sources.length * 3000 / 300) {
            harvesters[0].memory.recycle = true;
        } else if(harvester && this.memory.spawns.length > 0) {
            if(harvester.workBodyparts > harvesters[0].getActiveBodyparts(WORK)) {
                harvesters[0].memory.recycle = true;
                if(harvesters.length >= 5) {
                    this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
                }
            } else if(harvestPerTick < sources.length * 3000 / 300) {
                if(harvesters.length >=5 ) {
                    this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
                }
            }
        }
    } else if(harvester) {
        if(this.memory.spawns.length > 0) {
            if(harvestPerTick < sources.length * 3000 / 300) {
                this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
            }
        }
    }
    this.memory.harvestPerTick = harvestPerTick;
    console.log(this.memory.harvestPerTick);
};

module.exports = RoomHarvesterSpawn;
