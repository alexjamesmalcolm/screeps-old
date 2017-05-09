var CreepGetRepositories = function() {
    var foundStructures = this.room.found.structures;
    var inRangeStructures = this.pos.findInRange(foundStructures, 1);
    var repositories = _.filter(inRangeStructures, function(structure) {
        var viableRepositories = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_LINK,
            STRUCTURE_STORAGE,
            STRUCTURE_TOWER,
            STRUCTURE_TERMINAL,
            STRUCTURE_CONTAINER
        ];
        if(viableRepositories.indexOf(structure.structureType) > -1) {
            return true;
        }
    });
    return repositories;
};

module.exports = CreepGetRepositories
