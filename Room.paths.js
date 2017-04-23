function Path(room, start, end) {
    this.start = start;
    this.end = end;
    this.path = room.findPath(start.pos, end.pos, {
        serialize: true,
        ignoreCreeps: true
    });
}
var RoomPaths = function() {
    var landmarks, structures, sources, spawns, controller, sites, paths, start, end;
    /*
    Paths should exist in the memory of the room. Paths should reference the object that they lead to. Paths should be checked and contain information concerning whether there is a hostile creep threatening the path. If the hostile creep is neutral then check if the path is actually in danger of agro. If the hostile creep is of another player then this problem should probably be handled by a different method.
    Paths should be saved in the memory of the room
    Paths should reference the objects that they connect.
    Paths should be catagorized as safe or unsafe.
    */
    landmarks = [];
    structures = this.find(FIND_MY_STRUCTURES);
    sources = this.find(FIND_SOURCES);
    spawns = this.find(FIND_MY_SPAWNS);
    controller = [this.controller];
    sites = this.find(FIND_CONSTRUCTION_SITES);
    landmarks = landmarks.concat(structures, sources, spawns, controller, sites);
    landmarks = landmarks.map(function(object) {
        return object.id;
    });
    if(this.memory.paths) {
        /*
        var landmarks = [];
        var structures = this.find(FIND_MY_STRUCTURES);
        var sources = this.find(FIND_SOURCES);
        var spawns = this.find(FIND_MY_SPAWNS);
        var controller = [this.controller];
        var sites = this.find(FIND_CONSTRUCTION_SITES);
        landmarks = landmarks.concat(structures, sources, spawns, controller, sites);
        landmarks = landmarks.map(function(object) {
            return object.id;
        });
        this.memory.landmarks = landmarks;
        */
        
    } else {
        //this.memory.landmarks = landmarks;
        paths = {};
        for(var i = 0; i < landmarks.length; i++) {
            start = landmarks[i];
            paths[start] = {};
            for(var j = 0; j < landmarks.length; j++) {
                end = landmarks[j];
                paths[start][end] = this.findPath(Game.getObjectById(start).pos, Game.getObjectById(end).pos);
            }
        }
        this.memory.paths = paths;
    }
};

module.exports = RoomPaths;
