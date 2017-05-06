var roleFighter = function() {
    var enemy = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    var enemyStructures = this.room.find(FIND_HOSTILE_STRUCTURES);
    var hostileFlags = _.filter(Game.flags, function(flag) {
        if(flag.color === COLOR_RED) {
            return true;
        }
    });
    if(enemy) {
        console.log(enemy);
        console.log(this.attack(enemy));
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
        var nearestFlag = this.pos.findClosestByPath(hostileFlags);
        this.moveTo(nearestFlag);
    } else {
        this.moveTo(new RoomPosition(25, 20, this.room.name));
        //creep.move(Math.floor(Math.random()*8+1));
    }
};

module.exports = roleFighter;
