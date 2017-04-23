var CreepPathing = function(target) {
    var path, start, landmarks, landmarksById, end;
    if(this.memory.path) {
        if(typeof this.memory.path == 'string') {
            path = Room.deserializePath(this.memory.path);
        } else {
            path = this.memory.path;
        }
        end = new RoomPosition(path[path.length-1].x, path[path.length-1].y, this.room.name);
        if(target.pos.x != end.x || target.pos.y != end.y) {
            for(var i = 0; i < path.length; i++) {
                console.log(JSON.stringify(path[i]));
            }
            delete this.memory.path;
        }
    }
    if(!this.memory.path) {
        landmarksById = this.room.memory.landmarks;
        landmarks = landmarksById.map(function(id) {
            return Game.getObjectById(id);
        });
        start = this.pos.findClosestByRange(landmarks);
        if(start.pos == target.pos) {
            path = this.pos.findPathTo(target);
        } else {
            if(this.pos.isNearTo(start)) {
                path = this.room.memory.paths[start.id][target.id];
            } else {
                path = this.pos.findPathTo(start);
            }
        }
        this.memory.path = path;
    }
    this.moveByPath(this.memory.path);
};

module.exports = CreepPathing;
