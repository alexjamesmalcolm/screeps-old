var optimalBuilder = function(room, constructionProject) {
    var carryBodyparts, workBodyparts, moveBodyparts, creepCost, bodyparts, progressPerTick;
    creepCost = carryBodyparts * BODYPART_COST[CARRY] + workBodyparts * BODYPART_COST[WORK] + moveBodyparts * BODYPART_COST[MOVE];
    bodyparts = [];
    return {
        carryBodyparts: carryBodyparts,
        workBodyparts: workBodyparts,
        moveBodyparts: moveBodyparts,
        creepCost: creepCost,
        bodyparts: bodyparts,
        progressPerTick: progressPerTick
    };
};
/*
var optimalUpgrader = function(room) {
    var carryBodyparts = 1;
    var workBodyparts = Math.floor(-(BODYPART_COST[MOVE] - 2 * room.energyAvailable + 2 * carryBodyparts * BODYPART_COST[CARRY]) / (BODYPART_COST[MOVE] + 2 * BODYPART_COST[WORK]));
    var moveBodyparts = Math.floor((workBodyparts + carryBodyparts) / 2);
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
*/
var RoomBuilderSpawn = function() {
    var constructionProjects = this.find(FIND_CONSTRUCTION_SITES);
    var aProgressTotal = 0;
    var aProgress = 0;
    constructionProjects.forEach(function(constructionProject) {
        aProgressTotal = aProgressTotal + constructionProject.progressTotal;
        aProgress = aProgress + constructionProject.progress;
    });
    var builders = this.find(FIND_MY_CREEPS, {
        filter: function(creep) {
            if(creep.memory.recycle) {
                return false;
            } else if(creep.memory.role == 'builder') {
                return true;
            }
        }
    });
    var cProgressPerTick = 0;
    builders.forEach(function(creep) {
        cProgressPerTick = cProgressPerTick + UPGRADE_CONTROLLER_POWER * creep.getActiveBodyparts(WORK);
    });
    
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