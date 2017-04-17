var CreepPassiveRepair = function() {
    var creep = this;
    var repairTargets = creep.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: function(structure) {
            return structure.hits < object.hitsMax
            && object.hitsMax - object.hits > REPAIR_POWER * creep.getActiveBodyparts(WORK);
        }
    });
    repairTargets.sort(function(a, b) {
        return (a.hits / a.hitsMax) - (b.hits / b.hitsMax);
    });
    if(repairTargets.length > 0) {
        creep.repair(repairTargets[0]);
    }
};

module.exports = CreepPassiveRepair;
