var CreepBuild = function(input) {
    var constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    var creep = this;
    if(input.activeRepair) {
        var repairTarget = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if(structure.hits < structure.hitsMax) {
                    if(structure.hitsMax - structure.hits > REPAIR_POWER * creep.getActiveBodyparts(WORK)) {
                        if(input.structures.indexOf(structure.structureType) != -1) {
                            return true;
                        }
                    }
                }
            }
        });
    }
    var closestConstructionSiteDistance = this.pos.getRangeTo(constructionSite);
    var closestRepairTargetDistance = this.pos.getRangeTo(repairTarget);
    //console.log(closestConstructionSiteDistance);
    //console.log(closestRepairTargetDistance);
    var target;
    if(closestConstructionSiteDistance >= 0 && closestRepairTargetDistance >= 0) {
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
    } else if(closestConstructionSiteDistance >= 0) {
        target = constructionSite;
        if(target) {
            if(this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    } else if(closestRepairTargetDistance >= 0) {
        target = repairTarget;
        if(target) {
            if(this.repair(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
    }
};

module.exports = CreepBuild;
