var RoomFindAll = function() {
    var found = {};
    found.sources = this.find(FIND_SOURCES);
    found.myCreeps = this.find(FIND_MY_CREEPS);
    found.mySpawns = this.find(FIND_MY_SPAWNS);
    found.structures = this.find(FIND_STRUCTURES);
    found.links = _.filter(found.structures, {'structureType': STRUCTURE_LINK});
    found.towers = _.filter(found.structures, {'structureType': STRUCTURE_TOWER});
    this.memory.found = found;
};

module.exports = RoomFindAll;
