var roleHarvester = function() {
    if (this.memory.harvesting) {
        if (this.carry.energy == this.carryCapacity) {
            this.memory.harvesting = false;
            this.say('Carrying');
        }
    } else {
        if (this.carry.energy == 0) {
            this.memory.harvesting = true;
            this.say('Harvesting');
        }
    }

    if (this.memory.harvesting) {
        var source = this.pos.findClosestByPath(FIND_SOURCES); //Inefficient
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    } else {
        var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if (structure.structureType == STRUCTURE_EXTENSION) {
                    return structure.energy < structure.energyCapacity;
                } else if (structure.structureType == STRUCTURE_SPAWN) {
                    return structure.energy < structure.energyCapacity;
                } else if (structure.structureType == STRUCTURE_CONTAINER) {
                    return _.sum(structure.store) < structure.storeCapacity
                } else if (structure.structureType == STRUCTURE_STORAGE) {
                    return structure.energy < strucutre.energyCapacity; //Incorrect, should be similar to container
                }
            }
        });
        if (target) {
            if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
        this.passiveRepair
    }
    //this.memory.lastPos = this.pos;
};

module.exports = roleHarvester;
