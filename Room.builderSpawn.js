var optimalBuilder = function(room) {
    var carryBodyparts, workBodyparts, moveBodyparts, creepCost, bodyparts, progressPerTick;
    carryBodyparts = 1;
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
    for(var i = 0; i < workBodyparts; i++) {
        bodyparts.push(WORK);
    }
    for(var i = 0; i < carryBodyparts; i++) {
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
    var constructionProjects = this.find(FIND_CONSTRUCTION_SITES);
    var progressTotal = 0;
    var progress = 0;
    constructionProjects.forEach(function(constructionProject) {
        progressTotal = progressTotal + constructionProject.progressTotal;
        progress = progress + constructionProject.progress;
    });
    var remainingProgress = progressTotal - progress;
    var builders = this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            if(creep.memory.recycle) {
                return false;
            } else if(creep.memory.role == 'builder') {
                return true;
            }
        }
    });
    builders.sort(function(a, b) {
        var a_work = a.getActiveBodyparts(WORK);
        var b_work = b.getActiveBodyparts(WORK);
        return a_work < b_work;
    });
    var builder = optimalBuilder(this);
    var buildPerTick = 0;
    builders.forEach(function(creep) {
        buildPerTick = buildPerTick + UPGRADE_CONTROLLER_POWER * creep.getActiveBodyparts(WORK);
    });
    var timeToBuild;
    if(buildPerTick > 0) {
        timeToBuild = remainingProgress / buildPerTick;
    }
    if(builders.length > 0) {
        if(builder) {
            if(builder.workBodyparts > builders[0].getActiveBodyparts(WORK)) {
                builders[0].memory.recycle = true;
                this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});
            } else if(//) {this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});}
        }
    } else {
        if(builder) {
            this.memory.spawns[0].createCreep(builder.bodyparts, undefined, {role: 'builder'});
        }
    }
};

module.exports = RoomBuilderSpawn;

/*
var RoomUpgraderSpawn = function() {
    if(this.memory.spawns.length) {
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
            this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
        } else if(upgradePerTick < 30) {
            this.memory.spawns[0].createCreep(upgrader.bodyparts, undefined, {role: 'upgrader'});
        } else if(upgradePerTick > 35) {
            upgraders[0].memory.recycle = true;
        }
    }
};
module.exports = RoomUpgraderSpawn;

*/
