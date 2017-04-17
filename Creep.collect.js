var CreepCollect = function(input) {
    var resource = input.resource;
    var amount = input.amount;
    var structures = input.structures;
    var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType == STRUCTURE_CONTAINER && structures.indexOf(STRUCTURE_CONTAINER) != -1) {
                return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_STORAGE && structures.indexOf(STRUCTURE_STORAGE) != -1) {
                return _.sum(structure.store) >= amount;
            } else if(structure.structureType == STRUCTURE_EXTENSION && structures.indexOf(STRUCTURE_EXTENSION) != -1) {
                return structure.energy >= amount;
            } else if(structure.structureType == STRUCTURE_SPAWN && structures.indexOf(STRUCTURE_SPAWN) != -1) {
                return structure.energy >= amount;
            }
        }
    });
    
    if(target) {
        if(this.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    } else {
        this.say("Can't collect");
    }
};

module.exports = CreepCollect;
