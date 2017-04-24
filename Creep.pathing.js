var isCreepOnPath = function(creep, path) {
    var result = {};
    if(typeof path == 'string') {
        path = Room.deserializePath(path);
    }
    var closestPointOnPath = path[0];
    path.forEach(function(point) {
        var distance = creep.pos.getRangeTo(point);
        if(distance < creep.pos.getRangeTo(closestPointOnPath)) {
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
    //Is the creep already on the correct path?
    if(creepOnPath) {
        path = cachedPath;
    } else {
        path = cachedPath;
        midPath = Room.serializePath(creep.pos.findPathTo(closestPointOnPath));
    }
    this.creepOnPath = creepOnPath;
    this.midTarget = closestPointOnPath;
    this.path = path;
    this.targetId = givenTarget.id;
    this.startingPos = creep.pos;
}

var CreepPathing = function(givenTarget) {
    if(this.memory.pathingData) {
        if(givenTarget.id != this.memory.pathingData.targetId) {
            delete this.memory.pathingData;
        }
    }
    if(!this.memory.pathingData) {
        this.memory.pathingData = new PathingData(givenTarget, this);
    }
    var pathingData = {
        "creepOnPath":false,
        "midTarget":{"x":34,"y":21,"roomName":"sim"},
        "path":[{"x":34,"y":21,"dx":-1,"dy":0,"direction":7}],
        "target":"254ca3fefc0fe0a80b34672c",
        "startingPos":{"x":35,"y":21,"roomName":"sim"}
    };
    var pathingData = this.memory.pathingData;
    if(pathingData.creepOnPath) {
        this.moveByPath(pathingData.path);
    } else {
        if(isCreepOnPath())
        this.moveByPath(pathingData.path);
    }
    console.log(JSON.stringify(this.memory.pathingData));
};

module.exports = CreepPathing;
