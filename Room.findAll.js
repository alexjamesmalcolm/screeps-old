var RoomFindAll = function() {
    var found = {};
    found.flags = this.find(FIND_FLAGS);
    found.sources = this.find(FIND_SOURCES);
    found.activeSources = this.find(FIND_SOURCES_ACTIVE);
    found.myCreeps = this.find(FIND_MY_CREEPS);
    found.myConstructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
    found.mySpawns = this.find(FIND_MY_SPAWNS);
    found.structures = this.find(FIND_STRUCTURES);
    found.droppedEnergy = this.find(FIND_DROPPED_ENERGY);
    found.links = _.filter(found.structures, {'structureType': STRUCTURE_LINK});
    found.towers = _.filter(found.structures, {'structureType': STRUCTURE_TOWER});
    this.memory.found = found;
};

module.exports = RoomFindAll;
