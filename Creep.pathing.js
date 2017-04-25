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
            if(point.lookFor(LOOK_CREEPS).length == 0) {
                closestPointOnPath = point;
            }
            
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
    try {
    var closestLandmark, landmarksById, landmarks, cachedPath, arrayPath, creepOnPath, path, midPath, closestPointOnPath;
    landmarksById = creep.room.memory.landmarks;
    landmarks = landmarksById.map(function(id) {
        return Game.getObjectById(id);
    });
    closestLandmark = creep.pos.findClosestByRange(landmarks);
    cachedPath = creep.room.memory.paths[closestLandmark.id][givenTarget.id];
    arrayPath = Room.deserializePath(cachedPath);
    try {creepOnPath = isCreepOnPath(creep, arrayPath).creepOnPath;} catch(err) {console.log(err+": Creep.pathing.js creepOnPath = isCreepOnPath()");}
    try {closestPointOnPath = isCreepOnPath(creep, arrayPath).closestPointOnPath;} catch(err) {console.log(err+": Creep.pathing.js closestPointOnPath = isCreepOnPath()");}
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
    } catch(err) {
        console.log('target');
        console.log(givenTarget);
        console.log('creep');
        console.log(JSON.stringify(creep));
        console.log(err+": PathingData");
    }
}

var CreepPathing = function(givenTarget) {
    if(this.fatigue == 0) {
        if(this.pos.getRangeTo(givenTarget) < 4) {
            this.moveTo(givenTarget);
        } else {
            if(JSON.stringify(this.memory.lastPos) == JSON.stringify(this.pos)) {
                this.memory.still = this.memory.still + 1;
            } else {
                this.memory.still = 0;
                this.memory.lastPos = this.pos;
            }
            if(this.memory.pathingData) {
                if(givenTarget.id != this.memory.pathingData.targetId) {
                    delete this.memory.pathingData;
                }
            }
            if(!this.memory.pathingData) {
                var pathingData;
                pathingData = new PathingData(givenTarget, this);
                this.memory.pathingdata = pathingData;
            }
            var pathingData = this.memory.pathingData;
            //console.log(this.memory.still);
            if(this.memory.still > 0) {
                this.moveTo(givenTarget);
            } else {
                if(pathingData.creepOnPath) {
                    console.log(this.moveByPath(pathingData.path));
                } else {
                    try {var creepOnPath = isCreepOnPath(this, pathingData.path).creepOnPath;} catch(err) {console.log(err+": Creep.pathing.js creepOnPath = isCreepOnPath()");}
                    if(creepOnPath) {
                        this.memory.pathingData.creepOnPath = true;
                        console.log(this.moveByPath(pathingData.path));
                    } else {
                        console.log(this.moveByPath(pathingData.midPath));
                    }
                }
            }
        }
    //console.log(JSON.stringify(this.memory.pathingData));
    }
};

module.exports = CreepPathing;
//fuck you noodle
//this is the only thing iknow how to do in java - Roscoe
