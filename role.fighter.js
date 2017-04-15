var roleFighter = {
    run: function(creep) {
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        console.log(enemy);
        if(enemy) {
            console.log(creep.attack(enemy));
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.move(Math.floor(Math.random()*8+1));
        }
    }
};

module.exports = roleFighter;
