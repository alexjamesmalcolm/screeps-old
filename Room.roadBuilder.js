function dedupe(arr) {
    return arr.reduce(function (p, c) {
        var key = [c.x, c.y].join('|');
        if (p.temp.indexOf(key) === -1) {
            p.out.push(c);
            p.temp.push(key);
        }
        return p;
    }, { temp: [], out: [] }).out;
}
var RoomRoadBuilder = function() {
    var paths = this.memory.paths;
    var room = this;
    if(!this.memory.bigPath) {
        this.memory.bigPath = [];
    }
    var bigPath = this.memory.bigPath;
    var start = this.controller.id;
    for(var end in paths) {
        var path = Room.deserializePath(paths[start][end]);
        for(var i = 0; i < path.length; i++) {
            var point = new RoomPosition(path[i].x, path[i].y, room.name);
            this.memory.bigPath.push(point);
        }
    }
    bigPath = dedupe(bigPath);
    bigPath.forEach(function(point) {
        //console.log(JSON.stringify(point));
        try {
            point.createConstructionSite(STRUCTURE_ROAD);
        } catch(err) {console.log(err+": There's a bullshit error");}
        finally {
            Game.rooms.sim.createConstructionSite(point.x, point.y, STRUCTURE_ROAD);
        }
    });
};

try {module.exports = RoomRoadBuilder;} catch(err) {console.log(err+": hurp durp");}
