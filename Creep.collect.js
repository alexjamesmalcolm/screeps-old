var CreepCollect = function(input) {
    var reusePath = 10;
    /*
    methods:
    grab from fullest of given structures
    grab from least full of given structures
    grab to even out given structures
    grab from closest
    grab from structures in a given priority
    grab dropped energy first
    */
    var target;
    var resource = input.resource;
    //var amount = this.carryCapacity - _.sum(this.carry);
    var amount = 50;
    var acceptableStructures = input.structures;
    var structures = this.room.memory.found.structures;
    structures = _.filter(structures, function(structure) {
        if(structure.structureType == STRUCTURE_CONTAINER && acceptableStructures.indexOf(STRUCTURE_CONTAINER) != -1) {
            return _.sum(structure.store) >= amount;
        } else if(structure.structureType == STRUCTURE_STORAGE && acceptableStructures.indexOf(STRUCTURE_STORAGE) != -1) {
            return _.sum(structure.store) >= amount;
        } else if(structure.structureType == STRUCTURE_EXTENSION && acceptableStructures.indexOf(STRUCTURE_EXTENSION) != -1) {
            return structure.energy >= amount;
        } else if(structure.structureType == STRUCTURE_SPAWN && acceptableStructures.indexOf(STRUCTURE_SPAWN) != -1) {
            return structure.energy >= amount;
        } else if(structure.structureType == STRUCTURE_TOWER && acceptableStructures.indexOf(STRUCTURE_TOWER) != -1) {
            return structure.energy >= amount;
        } else if(structure.structureType == STRUCTURE_LINK && acceptableStructures.indexOf(STRUCTURE_LINK) != -1) {
            return structure.energy >= amount;
        }
    });
    var closestStructure = this.pos.findClosestByPath(structures);
    var droppedEnergy = this.pos.findClosestByRange(this.room.memory.found.droppedEnergy);
    if(closestStructure) {
        var closestStructureDistance = this.pos.getRangeTo(closestStructure);
        if(droppedEnergy) {
            var droppedEnergyDistance = this.pos.getRangeTo(droppedEnergy);
            if(closestStructureDistance <= droppedEnergyDistance) {
                target = closestStructure;
                if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target, {
                        "reusePath": reusePath
                    });
                }
            } else {
                target = droppedEnergy;
                if(this.pickup(target) == ERR_NOT_IN_RANGE) {
                    this.moveTo(target,{
                        "reusePath": reusePath
                    });
                }
            }
        } else {
            target = closestStructure;
            if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, {
                    "reusePath": reusePath
                });
            }
        }
    } else {
        if(droppedEnergy) {
            target = droppedEnergy;
            if(this.pickup(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target, {
                    "reusePath": reusePath
                });
            }
        }
        
    }
    /*
    if(target) {
        if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target, {
                "reusePath": 10
            });
            return ERR_NOT_IN_RANGE;
        } else {
            return OK;
        }
    } else {
        this.say("No energy");
        return ERR_NOT_FOUND;
    }
    */
};

module.exports = CreepCollect;
