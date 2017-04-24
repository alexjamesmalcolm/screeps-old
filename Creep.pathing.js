var getClosestPointOnPath = function(creep, path) {};
function PathingData(givenTarget, creep) {
    var closestLandmark, landmarksById, landmarks, cachedPath;
    landmarksById = creep.room.memory.landmarks;
    landmarks = landmarksById.map(function(id) {
        return Game.getObjectById(id);
    });
    closestLandmark = creep.pos.findClosestByRange(landmarks);
    cachedPath = creep.room.memory.paths[closestLandmark.id][givenTarget.id];
    //this.path = path;
    this.target = givenTarget;
    this.lastPos = creep.pos;
}

var CreepPathing = function(givenTarget) {
    if(!this.memory.pathingData) {
        this.memory.pathingData = new PathingData(givenTarget, this);
    }
    /*
    try {
        var path, start, landmarks, landmarksById, moving, target, midTarget;
        moving = false;
        start = this.memory.start;
        midTarget = this.memory.midTarget;
        target = this.memory.target;
        landmarksById = this.room.memory.landmarks;
        landmarks = landmarksById.map(function(id) {
            return Game.getObjectById(id);
        });
        if(this.memory.path) {
            if(typeof this.memory.path == 'string') {
                path = Room.deserializePath(this.memory.path);
            } else {
                path = this.memory.path;
                this.memory.path = Room.serializePath(this.memory.path);
            }
        }
    }
    catch(err) {console.log("Issue with initializing variables in Creep.pathing.js: "+err);}
    //Variables initialized
    if(this.pos.isNearTo(givenTarget)) {
        
    }
    
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
    */
};

module.exports = CreepPathing;
