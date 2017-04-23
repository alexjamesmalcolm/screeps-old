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
    landmarks = [];
    structures = this.find(FIND_MY_STRUCTURES, {
        filter: function(structure) {
            //console.log(structure);
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
