var CreepPassiveRepair = function() {
    var creep = this;
    var repairTargets = this.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: function(structure) {
            if(structure.structureType == STRUCTURE_RAMPART) {
                return false;
            } else {
                if(structure.hits < structure.hitsMax) {
                    if(structure.hitsMax - structure.hits > REPAIR_POWER * creep.getActiveBodyparts(WORK)) {
                        return true;
                    }
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
