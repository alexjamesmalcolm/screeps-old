var CreepPassiveRepair = function() {};

module.exports = CreepRepair;

/*
var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
    filter: function(object) {
        return object.hits < object.hitsMax
        && object.hitsMax - object.hits > REPAIR_POWER;
    }
});
repairTargets.sort(function (a,b) {
    return ((a.hits / a.hitsMax) - (b.hits / b.hitsMax))
});
if(repairTargets.length > 0) {
    creep.repair(repairTargets[0]);
}
*/
