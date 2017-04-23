var createPaths = function(room, landmarks) {
    var paths, i, j, start, end;
    paths = {};
    for(i = 0; i < landmarks.length; i++) {
        start = landmarks[i];
        paths[start] = {};
        for(j = 0; j < landmarks.length; j++) {
            end = landmarks[j];
            paths[start][end] = room.findPath(Game.getObjectById(start).pos, Game.getObjectById(end).pos, {
                serialize: true,
                ignoreCreeps: true
            });
        }
    }
    return paths;
};

var RoomPaths = function() {
    var landmarks, structures, sources, spawns, controller, sites, paths, start, end, i, j;
    /*
    Paths should exist in the memory of the room. Paths should reference the object that they lead to. Paths should be checked and contain information concerning whether there is a hostile creep threatening the path. If the hostile creep is neutral then check if the path is actually in danger of agro. If the hostile creep is of another player then this problem should probably be handled by a different method.
    Paths should be saved in the memory of the room
    Paths should reference the objects that they connect.
    Paths should be catagorized as safe or unsafe.
    */
    landmarks = [];
    structures = this.find(FIND_MY_STRUCTURES, {
        filter: function(structure) {
            console.log(structure);
            return true;
        }
    });
    sources = this.find(FIND_SOURCES);
    spawns = this.find(FIND_MY_SPAWNS);
    controller = [this.controller];
    sites = this.find(FIND_CONSTRUCTION_SITES);
    landmarks = landmarks.concat(structures, sources, spawns, controller, sites);
    landmarks = landmarks.map(function(object) {
        return object.id;
    });
    this.memory.landmarks = landmarks;
    paths = this.memory.paths;
    if(paths) {
        var pathDoesNotExist = false;
        for(i = 0; i < landmarks.length; i++) {
            var landmarkId = landmarks[i];
            if(!paths[landmarkId]) {
                pathDoesNotExist = true;
            }
        }
        if(pathDoesNotExist) {
            this.memory.paths = createPaths(this, landmarks);
        } else {
            var landmarkDoesNotExist = false;
            for(start in paths) {
                if(landmarks.indexOf(start) == -1) {
                    landmarkDoesNotExist = true;
                }
            }
            if(landmarkDoesNotExist) {
                this.memory.paths = createPaths(this, landmarks);
            }
        }
    } else {
        this.memory.paths = createPaths(this, landmarks);
    }
};

module.exports = RoomPaths;
