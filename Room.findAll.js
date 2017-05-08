var RoomFindAll = function() {
    var found = {};
    found.activeSources = this.find(FIND_SOURCES_ACTIVE);
    found.droppedEnergy = this.find(FIND_DROPPED_ENERGY);
    found.flags = this.find(FIND_FLAGS);
    found.hostileCreeps = this.find(FIND_HOSTILE_CREEPS);
    found.hostileStructures = this.find(FIND_HOSTILE_STRUCTURES);
    found.myConstructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
    found.myCreeps = this.find(FIND_MY_CREEPS);
    found.mySpawns = this.find(FIND_MY_SPAWNS);
    found.sources = this.find(FIND_SOURCES);
    found.structures = this.find(FIND_STRUCTURES);
    found.links = _.filter(found.structures, {'structureType': STRUCTURE_LINK});
    found.towers = _.filter(found.structures, {'structureType': STRUCTURE_TOWER});
    this.memory.found = found;
};

module.exports = RoomFindAll;
