var CreepCycle = function(creepCount) {
    var stateRecycle = require('state.recycle');
    var creepCount = require('creepCount');
    var numberOfSick = _.filter(Game.creeps, (creep) => creep.memory.sick);
    if(!this.memory.sick) {
        if(numberOfSick < creepCount.sick) {
            if(this.ticksToLive < 500) {
                this.memory.sick = true;
            }
        } else {
            this.memory.sick = false;
        }
    }
    if(this.memory.sick) {
        this.sick();
    } else if(this.memory.recycle) {
        stateRecycle.run(this);
    } else if(this.memory.role == 'harvester') {
        this.roleHarvester();
    } else if(this.memory.role == 'builder') {
        this.roleBuilder();
    } else if(this.memory.role == 'upgrader') {
        this.roleUpgrader();
    } else if(this.memory.role == 'fighter') {
        this.roleFighter();
    } else if(this.memory.role == 'courier') {
        this.roleCourier();
    }
};

module.exports = CreepCycle;
