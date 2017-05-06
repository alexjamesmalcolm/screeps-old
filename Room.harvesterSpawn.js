var optimalHarvester = function(room) {
    var workBodyparts, moveBodyparts, creepCost, bodyparts, i;
    workBodyparts = Math.floor(-(2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE] - 2 * room.energyAvailable) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    //-(2 c + m - 2 t)/(m + 2 w)
    moveBodyparts = Math.floor((workBodyparts + 1) / 2);
    //(b + 1) * 0.5
    creepCost = moveBodyparts * BODYPART_COST[MOVE] + BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK]; // t = a * m + c + b * w
    bodyparts = [CARRY];
    for(i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    if(workBodyparts > 0 && moveBodyparts > 0) {
        return {
            bodyparts: bodyparts,
            moveBodyparts: moveBodyparts,
            workBodyparts: workBodyparts
        };
    }
};

var RoomHarvesterSpawn = function() {
    var sources = this.find(FIND_SOURCES);
    var harvesters = _.filter(this.memory.found.myCreeps, function(creep) {
        if(creep.memory.role === "harvester") {
            return true;
        }
    });
    var harvester = optimalHarvester(this);
    var harvestPerTick = 0;
    var multiplier = 1.1
    if(harvesters.length > 0) {
        harvesters.sort(function(a, b) {
            return a.getActiveBodyparts(WORK) - b.getActiveBodyparts(WORK);
        });
        harvesters.forEach(function(creep) {
            harvestPerTick = harvestPerTick + HARVEST_POWER * creep.getActiveBodyparts(WORK);
        });
        //console.log(harvester);
        if(harvestPerTick > multiplier * HARVEST_POWER * sources.length * 3000 / 300) {
            //console.log('The computer was about to make a dumb decision: a');
            harvesters[0].memory.recycle = true;
        } else if(harvester && this.memory.spawns.length > 0) {
            if(this.memory.energyPercent === 1) {
                if(harvester.workBodyparts > harvesters[0].getActiveBodyparts(WORK)) {
                    //console.log('The computer was about to make a dumb decision: b');
                    harvesters[0].memory.recycle = true;
                    if(harvesters.length <= this.memory.harvestPoints) {
                        this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
                        this.memory.spawns[0].memory.busy = Game.time;
                    }
                }
            } else if(harvestPerTick + HARVEST_POWER * harvester.workBodyparts < multiplier * HARVEST_POWER * sources.length * 3000 / 300) {
                if(harvesters.length < this.memory.harvestPoints) {
                    this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
                    this.memory.spawns[0].memory.busy = Game.time;
                }
            }
        }
    } else if(harvester) {
        if(this.memory.spawns.length > 0) {
            if(harvestPerTick + HARVEST_POWER * harvester.workBodyparts < multiplier * HARVEST_POWER * sources.length * 3000 / 300) {
                this.memory.spawns[0].createCreep(harvester.bodyparts, undefined, {role: 'harvester'});
                this.memory.spawns[0].memory.busy = Game.time;
            }
        }
    }
    this.memory.harvestPerTick = harvestPerTick;
    //console.log(this.memory.harvestPerTick);
};

module.exports = RoomHarvesterSpawn;
