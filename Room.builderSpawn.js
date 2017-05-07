var optimalBuilder = function(room) {
    var carryBodyparts, workBodyparts, moveBodyparts, creepCost, bodyparts, progressPerTick;
    carryBodyparts = 2;
    //x = 1
    workBodyparts = Math.floor((2 * room.energyAvailable - (2 * BODYPART_COST[CARRY] + BODYPART_COST[MOVE]) * carryBodyparts) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    //y = (2 * t - (2 * c + m) * x) / (m + 2 * w);
    moveBodyparts = Math.floor((carryBodyparts + workBodyparts) / 2);
    //z = (x + y) / 2
    //W = x + y
    creepCost = carryBodyparts * BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK] + moveBodyparts * BODYPART_COST[MOVE];
    //t = x * c + y * w + z * m
    bodyparts = [];
    for(var i = 0; i < moveBodyparts; i++) {
        bodyparts.push(MOVE);
    }
    for(i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(i = 0; i < carryBodyparts; i++) {
        bodyparts.push(CARRY);
    }
    if(workBodyparts > 0 && moveBodyparts > 0 && carryBodyparts > 0) {
        return {
            carryBodyparts: carryBodyparts,
            workBodyparts: workBodyparts,
            moveBodyparts: moveBodyparts,
            creepCost: creepCost,
            bodyparts: bodyparts,
            progressPerTick: progressPerTick
        };
    }
};
var RoomBuilderSpawn = function() {
    var multiplier = 0.25;
    var constructionProjects = this.memory.found.myConstructionSites;
    var progressTotal = 0;
    var progress = 0;
    constructionProjects.forEach(function(constructionProject) {
        progressTotal = progressTotal + constructionProject.progressTotal;
        progress = progress + constructionProject.progress;
    });
    var remainingProgress = progressTotal - progress;
    var structures = this.memory.found.structures;
    var hitsTotal = 0;
    var hits = 0;
    structures.forEach(function(structure) {
        if(structure.hitsMax > 0 && structure.hits) {
            hitsTotal = hitsTotal + structure.hitsMax;
            hits = hits + structure.hits;
        }
    });
    var repairNeeded = hitsTotal - hits;
    //console.log("hitsTotal: "+hitsTotal);
    //console.log("hits: "+hits);
    //REPAIR_POWER
    //console.log("remainingProgress: "+remainingProgress);
    var creeps = this.memory.found.myCreeps;
    var builders = _.filter(creeps, function(creep) {
        if(creep.memory.recycle) {
            return false;
        } else if(creep.memory.role == 'builder') {
            return true;
        }
    });
    builders.sort(function(a, b) {
        var a_work = a.getActiveBodyparts(WORK);
        var b_work = b.getActiveBodyparts(WORK);
        return a_work - b_work;
    });
    var builder = optimalBuilder(this);
    var workBodyparts = 0;
    builders.forEach(function(creep) {
        workBodyparts = workBodyparts + creep.getActiveBodyparts(WORK);
    });
    var buildPerTick = workBodyparts * BUILD_POWER;
    var repairPerTick = workBodyparts * REPAIR_POWER;
    var timeToFinish;
    var timeToBuild;
    if(buildPerTick > 0) {
        timeToBuild = remainingProgress / buildPerTick;
    }
    var timeToRepair;
    if(repairPerTick > 0) {
        timeToRepair = repairNeeded / repairPerTick;
    }
    if(buildPerTick > 0) {
        if(repairPerTick > 0) {
            timeToFinish = timeToBuild + timeToRepair;
        } else {
            timeToFinish = timeToBuild;
        }
    } else {
        if(repairPerTick > 0) {
            timeToFinish = timeToRepair;
        }
    }
    if(builders.length > 0) {
        if(this.memory.spawns.length > 0) {
            if(builder) {
                if(this.memory.energyPercent === 1) {
                    if(builder.workBodyparts > builders[0].getActiveBodyparts(WORK)) {
                        builders[0].memory.recycle = true;
                        this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});
                        this.memory.spawns[0].memory.busy = Game.time;
                    } else if(timeToFinish > 720) {
                        if(buildPerTick + builder.workBodyparts * BUILD_POWER < this.memory.harvestPerTick * multiplier) {
                            this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});
                            this.memory.spawns[0].memory.busy = Game.time;
                        }
                    }
                }
            }
        }
    } else {
        if(this.memory.spawns.length > 0) {
            if(builder) {
                this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});
                this.memory.spawns[0].memory.busy = Game.time;
            }
        }
    }
    this.memory.buildPerTick = buildPerTick;
    this.memory.remainingProgress = remainingProgress;
};

module.exports = RoomBuilderSpawn;
