var CreepPassiveRepair = function() {
    var workBodyparts = this.getActiveBodyparts(WORK);
    var repairTargets = this.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: function(structure) {
            if(structure.hits < structure.hitsMax) {
                if(structure.hitsMax - structure.hits > REPAIR_POWER * workBodyparts) {
                    return true;
                }
            }
        }
    });
    repairTargets.sort(function(a, b) {
        return (a.hits / a.hitsMax) - (b.hits / b.hitsMax);
    });
    if(repairTargets.length > 0) {
        this.repair(repairTargets[0]);
    }
};

module.exports = CreepPassiveRepair;
