var RoomFindAll = function() {
    var found = {};
    found.sources = this.find(FIND_SOURCES);
    found.myCreeps = this.find(FIND_MY_CREEPS);
    found.links = this.find(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structure === STRUCTURE_LINK) {
                return true;
            } else {
                return false;
            }
        }
    });
    this.memory.found = found;
};

module.exports = RoomFindAll;
