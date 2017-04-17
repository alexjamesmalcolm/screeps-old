var CreepPassiveRepair = function() {
    var repairTargets = this.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: function(structure) {
            return structure.hits < object.hitsMax
            && object.hitsMax - object.hits > REPAIR_POWER * this.getActiveBodyparts(WORK);
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
