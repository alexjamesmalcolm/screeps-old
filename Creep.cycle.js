var CreepCycle = function() {
    var sick = _.filter(Game.creeps, (creep) => creep.memory.sick);
    if(!this.memory.sick) {
        if(sick < creepCount.sick) {
            if(this.ticksToLive < 500) {
                this.memory.sick = true;
            }
        } else {
            this.memory.sick = false;
        }
    }
    if(this.memory.sick) {
        stateDying.run(this);
    } else if(this.memory.recycle) {
        stateRecycle.run(this);
    } else if(this.memory.role == 'harvester') {
        roleHarvester.run(this);
    } else if(this.memory.role == 'builder') {
        roleBuilder.run(this);
    } else if(this.memory.role == 'upgrader') {
        roleUpgrader.run(this);
    } else if(this.memory.role == 'fighter') {
        roleFighter.run(this);
    } else if(this.memory.role == 'courier') {
        roleCourier.run(this);
    }
};

module.exports = CreepCycle;
