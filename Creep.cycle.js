var CreepCycle = function(creepCount) {
    var role = {
        harvester: require('role.harvester'),
        builder: require('role.builder'),
        upgrader: require('role.upgrader'),
        fighter: require('role.fighter'),
        courier: require('role.courier')
    };
    var stateDying = require('state.dying');
    var stateRecycle = require('state.recycle');
    var creepCount = require('creepCount');
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
        role.harvester.run(this);
    } else if(this.memory.role == 'builder') {
        role.builder.run(this);
    } else if(this.memory.role == 'upgrader') {
        role.upgrader.run(this);
    } else if(this.memory.role == 'fighter') {
        role.fighter.run(this);
    } else if(this.memory.role == 'courier') {
        role.courier.run(this);
    }
};

module.exports = CreepCycle;
