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
var RoomRoadBuilder = function(start) {
    var numberOfConstructionSites, id, paths, room, bigPath, end, path, i, point, result;
    delete this.memory.paths;
    this.paths();
    numberOfConstructionSites = 0;
    for(id in Game.constructionSites) {
        if(Game.constructionSites[id]) {
            //var site = Game.constructionSites[id];
            numberOfConstructionSites = numberOfConstructionSites + 1;
        }
    }
    if(numberOfConstructionSites < 100) {
        paths = this.memory.paths;
        room = this;
        if(!this.memory.bigPath) {
            this.memory.bigPath = [];
        }
        bigPath = this.memory.bigPath;
        for(end in paths) {
            if(paths[end]) {
                path = Room.deserializePath(paths[start][end]);
                for(i = 0; i < path.length; i++) {
                    point = new RoomPosition(path[i].x, path[i].y, room.name);
                    this.memory.bigPath.push(point);
                }
            }
        }
        bigPath = dedupe(bigPath);
        if(bigPath.length != numberOfConstructionSites) {
            for(i = 0; i < bigPath.length; i++) {
                point = bigPath[i];
                result = new RoomPosition(point.x, point.y, this.name).createConstructionSite(STRUCTURE_ROAD);
                if(result == ERR_FULL) {
                    break;
                }
            }
        }
    }
};

module.exports = RoomRoadBuilder;
