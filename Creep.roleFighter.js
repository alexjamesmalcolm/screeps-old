var roleFighter = function() {
    var enemy = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (enemy) {
        console.log(enemy);
        console.log(this.attack(enemy));
        this.say('F: Attack');
        if (this.attack(enemy) == ERR_NOT_IN_RANGE) {
            this.moveTo(enemy);
        }
    } else {
        this.moveTo(new RoomPosition(25, 20, 'W94S6'));
        //creep.move(Math.floor(Math.random()*8+1));
    }
};

module.exports = roleFighter;
