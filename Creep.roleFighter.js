var roleFighter = function() {
    var hostileCreeps = this.room.memory.found.hostileCreeps;
    var hostileStructures = this.room.memory.found.hostileStructures;
    var enemy = this.pos.findClosestByPath(hostileCreeps);
    var enemyStructures = this.room.find(hostileStructures);
    var hostileFlags = _.filter(Game.flags, function(flag) {
        if(flag.color === COLOR_RED) {
            return true;
        }
    });
    if(enemy) {
        this.say('F: Attack');
        if(this.attack(enemy) == ERR_NOT_IN_RANGE) {
            this.moveTo(enemy);
        }
    } else if(enemyStructures.length > 0) {
        var structure = enemyStructures[0];
        if(this.attack(structure) == ERR_NOT_IN_RANGE)  {
            this.moveTo(structure);
        }
    } else if(hostileFlags.length > 0) {
        var flag = hostileFlags[0];
        this.moveTo(flag);
    } else {
        this.memory.recycle = true;
        creep.move(Math.floor(Math.random()*8+1));
    }
};

module.exports = roleFighter;
