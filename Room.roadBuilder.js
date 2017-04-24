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
    var numberOfConstructionSites = 0;
    for(var id in Game.constructionSites) {
        var site = Game.constructionSites[id];
        numberOfConstructionSites = numberOfConstructionSites + 1;
    }
    if(numberOfConstructionSites < 100) {
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
        if(bigPath.length != numberOfConstructionSites) {
            for(var i = 0; i < bigPath.length; i++) {
                var point = bigPath[i];
                var result = new RoomPosition(point.x, point.y, this.name).createConstructionSite(STRUCTURE_ROAD);
                if(result == ERR_FULL) {
                    break;
                }
            }
        }
    }
};

module.exports = RoomRoadBuilder;
