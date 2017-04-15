var roleFighter = {
    run: function(creep) {
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(enemy) {
            console.log(enemy);
            console.log(creep.attack(enemy));
            creep.say('F: Attack');
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy);
            }
        } else {
            creep.move(Math.floor(Math.random()*8+1));
        }
    }
};

module.exports = roleFighter;
