var CreepPathing = function(target) {
    var path, start, landmarks, landmarksById, end, moving;
    moving = false;
    if(this.memory.path) {
        if(typeof this.memory.path == 'string') {
            path = Room.deserializePath(this.memory.path);
        } else {
            path = this.memory.path;
        }
        end = new RoomPosition(path[path.length-1].x, path[path.length-1].y, this.room.name);
        if(target.pos.x != end.x || target.pos.y != end.y) {
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
                if(path[0].x != this.pos.x || path[0].y != this.pos.y) {
                    this.moveTo(path[0].x, path[0].y);
                    moving = true;
                }
            } else {
                path = this.pos.findPathTo(start);
            }
        }
        this.memory.path = path;
    }
    if(!moving) {
        this.moveByPath(this.memory.path);
    }
    moving = true;
};

module.exports = CreepPathing;
