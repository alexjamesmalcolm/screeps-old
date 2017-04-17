var roleBuilder = function() {
    if(this.memory.building && this.carry.energy == 0) {
        this.memory.building = false;
        this.memory.needEnergy = true;
        this.say('Need Energy');
    }
    if(!this.memory.building && this.carry.energy == this.carryCapacity) {
        this.memory.building = true;
        this.memory.needEnergy = false;
        this.say('Building');
    }
    if(this.memory.building) {
        var target;
        var constructionSite = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        var repairTarget = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if(structure.hits < structure.hitsMax) {
                    if(structure.hitsMax - structure.hits > REPAIR_POWER * this.getActiveBodyparts(WORK)) {
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
        if (closestConstructionSiteDistance <= closestRepairTargetDistance) {
            target = constructionSite;
        } else {
            target = repairTarget;
        }
        if(target) {
            if(this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
        this.passiveRepair();
    } else {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: this.carryCapacity,
            structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
        });
    }
};

module.exports = roleBuilder;
