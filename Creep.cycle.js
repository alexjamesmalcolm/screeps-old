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
        try {this.sick();} catch(err) {console.log(err+": Creep.cycle.js this.sick()");}
    } else if(this.memory.recycle) {
        try {stateRecycle.run(this);} catch(err) {console.log(err+": Creep.cycle.js stateRecycle.run(this)");}
    } else if(this.memory.role == 'harvester') {
        try {this.roleHarvester();} catch(err) {console.log(err+": Creep.cycle.js this.roleHarvester()");}
    } else if(this.memory.role == 'builder') {
        try {this.roleBuilder();} catch(err) {console.log(err+": Creep.cycle.js this.roleBuilder()");}
    } else if(this.memory.role == 'upgrader') {
        try {this.roleUpgrader();} catch(err) {console.log(err+": Creep.cycle.js this.roleUpgrader()");}
    } else if(this.memory.role == 'fighter') {
        try {this.roleFighter();} catch(err) {console.log(err+": Creep.cycle.js this.roleFighter()");}
    } else if(this.memory.role == 'courier') {
        try {this.roleCourier();} catch(err) {console.log(err+": Creep.cycle.js this.roleCourier()");}
    }
};

module.exports = CreepCycle;
