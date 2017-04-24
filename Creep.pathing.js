var isCreepOnPath = function(creep, path) {
    var distance;
    var result = {};
    if(typeof path == 'string') {
        path = Room.deserializePath(path);
    }
    var closestPointOnPath = new RoomPosition(path[0].x, path[0].y, creep.room.name);
    path.forEach(function(point) {
        point = new RoomPosition(point.x, point.y, creep.room.name);
        distance = creep.pos.getRangeTo(point);
        if(distance <= creep.pos.getRangeTo(closestPointOnPath)) {
            closestPointOnPath = point;
        }
    });
    if(closestPointOnPath.x == creep.pos.x && closestPointOnPath.y == creep.pos.y) {
        result['creepOnPath'] = true;
    } else {
        result['creepOnPath'] = false;
    }
    closestPointOnPath = new RoomPosition(closestPointOnPath.x, closestPointOnPath.y, creep.room.name);
    result['closestPointOnPath'] = closestPointOnPath;
    return result;
};

function PathingData(givenTarget, creep) {
    var closestLandmark, landmarksById, landmarks, cachedPath, arrayPath, creepOnPath, path, midPath, closestPointOnPath;
    landmarksById = creep.room.memory.landmarks;
    landmarks = landmarksById.map(function(id) {
        return Game.getObjectById(id);
    });
    closestLandmark = creep.pos.findClosestByRange(landmarks);
    cachedPath = creep.room.memory.paths[closestLandmark.id][givenTarget.id];
    arrayPath = Room.deserializePath(cachedPath);
    creepOnPath = isCreepOnPath(creep, arrayPath).creepOnPath;
    closestPointOnPath = isCreepOnPath(creep, arrayPath).closestPointOnPath;
    if(creepOnPath) {
        path = cachedPath;
    } else {
        path = cachedPath;
        midPath = Room.serializePath(creep.pos.findPathTo(closestPointOnPath));
    }
    this.midPath = midPath;
    this.creepOnPath = creepOnPath;
    this.midTarget = closestPointOnPath;
    this.path = path;
    this.targetId = givenTarget.id;
    this.startingPos = creep.pos;
}

var CreepPathing = function(givenTarget) {
    if(this.pos.getRangeTo(givenTarget) < 2) {
        this.moveTo(givenTarget);
    } else {
        if(this.memory.pathingData) {
            if(givenTarget.id != this.memory.pathingData.targetId) {
                delete this.memory.pathingData;
            }
        }
        if(!this.memory.pathingData) {
            this.memory.pathingData = new PathingData(givenTarget, this);
        }
        var pathingData = this.memory.pathingData;
        if(pathingData.creepOnPath) {
            this.moveByPath(pathingData.path);
        } else {
            if(isCreepOnPath(this, pathingData.path).creepOnPath) {
                this.memory.pathingData.creepOnPath = true;
                this.moveByPath(pathingData.path);
            } else {
                this.moveByPath(pathingData.midPath);
            }
        }
    }
    //console.log(JSON.stringify(this.memory.pathingData));
};

module.exports = CreepPathing;
//fuck you noodle
//this is the only thing iknow how to do in java - Roscoe
