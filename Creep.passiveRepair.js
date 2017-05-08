var CreepPassiveRepair = function() {
    var workBodyparts = this.getActiveBodyparts(WORK);
    var structures = this.room.memory.found.structures;
    var repairTargets = this.pos.findInRange(structures, 1, {
        filter: function(structure) {
            if(structure.hits < structure.hitsMax) {
                if(structure.hitsMax - structure.hits > REPAIR_POWER * workBodyparts) {
                    if(structure.structureType === STRUCTURE_RAMPART) {
                        if(structure.hits > 100000) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
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
