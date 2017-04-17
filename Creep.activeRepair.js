var CreepActiveRepair = function(input) {
    var creep = this;
    var constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    var repairTarget = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.hits < structure.hitsMax) {
                if(structure.hitsMax - structure.hits > REPAIR_POWER * creep.getActiveBodyparts(WORK)) {
                    if(structure.structureType == STRUCTURE_RAMPART) {
                        return false;
                    } else if(structure.structureType == STRUCTURE_CONTAINER) {
                        return true;
                    } else if(structure.structureType == STRUCTURE_STORAGE) {
                        return true;
                    }
                }
            }
        }
    });
    var closestConstructionSiteDistance = this.pos.getRangeTo(constructionSite);
    var closestRepairTargetDistance = this.pos.getRangeTo(repairTarget);
    var target;
    if (closestConstructionSiteDistance <= closestRepairTargetDistance) {
        target = constructionSite;
        if(target) {
            if(this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    } else {
        target = repairTarget;
        if(target) {
            if(this.repair(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    }
};

module.exports = CreepActiveRepair;
