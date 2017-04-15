var roleFighter = {
    run: function(creep) {
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if(enemy) {
            if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
};

module.exports = roleFighter;
