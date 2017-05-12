var CreepGetRepositories = function(blacklist) {
    if(!blacklist) {
        blacklist = [];
    }
    var foundStructures = this.room.memory.found.structures;
    var inRangeStructures = this.pos.findInRange(foundStructures, 1);
    var viableRepositories = [
        STRUCTURE_SPAWN,
        STRUCTURE_EXTENSION,
        STRUCTURE_LINK,
        STRUCTURE_STORAGE,
        STRUCTURE_TOWER,
        STRUCTURE_CONTAINER
    ];
    
    var repositories = _.filter(inRangeStructures, function(structure) {
        var type = structure.structureType
        var amount;
        if(blacklist.indexOf(type) === -1) {
            if(viableRepositories.indexOf(type) > -1) {
                if(type === STRUCTURE_STORAGE || type === STRUCTURE_CONTAINER) {
                    amount = structure.storeCapacity - structure.store.energy;
                } else {
                    amount = structure.energyCapacity - structure.energy;
                }
                return amount > 0;
            }
        }
    });
    return repositories;
};

module.exports = CreepGetRepositories
