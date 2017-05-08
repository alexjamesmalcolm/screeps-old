var CreepBuild = function(input) {
    var constructionSite, creep, repairTarget;
    var workBodyparts = this.getActiveBodyparts(WORK);
    var myConstructionSites = this.room.memory.found.myConstructionSites;
    var foundStructures = this.room.memory.found.structures;
    constructionSite = this.pos.findClosestByRange(myConstructionSites);
    if(input.activeRepair) {
        repairTarget = this.pos.findClosestByRange(foundStructures, {
            filter: function(structure) {
                if(structure.hits < structure.hitsMax) {
                    if(structure.hitsMax - structure.hits > REPAIR_POWER * workBodyparts) {
                        if(input.structures.indexOf(structure.structureType) != -1) {
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
    if(target) {
        return OK;
    } else {
        return ERR_NOT_FOUND;
    }
};

module.exports = CreepBuild;
