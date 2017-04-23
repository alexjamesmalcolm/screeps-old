function Path(start, end) {
    this.start = start;
    this.end = end;
    //this.path...
}
var RoomPaths = function() {
    /*
    Paths should exist in the memory of the room. Paths should reference the object that they lead to. Paths should be checked and contain information concerning whether there is a hostile creep threatening the path. If the hostile creep is neutral then check if the path is actually in danger of agro. If the hostile creep is of another player then this problem should probably be handled by a different method.
    Paths should be saved in the memory of the room
    Paths should reference the objects that they connect.
    Paths should be catagorized as safe or unsafe.
    */
    var paths = this.memory.paths;
    if(paths) {
    } else {
        this.memory.paths = [];
    }
};

module.exports = RoomPaths;
