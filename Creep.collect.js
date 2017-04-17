var CreepCollect = function() {};

module.exports = CreepCollect


var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function(structure) {
        if(structure.structureType == STRUCTURE_CONTAINER) {
            //console.log(_.sum(structure.store));
            return _.sum(structure.store) >= 50;
        } else if(structure.structureType == STRUCTURE_STORAGE) {
            //console.log(_.sum(structure.store));
            return _.sum(structure.store) >= 50;
        } else if(structure.structureType == STRUCTURE_EXTENSION) {
            //console.log(structure.energy);
            //return structure.energy > 50;
            return false; //This is so the spawn can still heal creeps that are dying.
        } else if(structure.structureType == STRUCTURE_SPAWN) {
            //console.log(structure.energy);
            return structure.energy >= 50;
        }
    }
});

if(target) {
    //console.log(target);
    //console.log(creep.withdraw(target, RESOURCE_ENERGY));
    //console.log(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE);
    if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //console.log(creep.moveTo(target));
        creep.moveTo(target);
    }
}
