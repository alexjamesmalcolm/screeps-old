var RoomFindAll = function() {
    var found = {};
    found.sources = this.find(FIND_SOURCES);
    found.myCreeps = this.find(FIND_MY_CREEPS);
    this.memory.found = found;
};

module.exports = RoomFindAll;
