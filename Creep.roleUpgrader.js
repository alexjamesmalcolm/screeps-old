var roleUpgrader = function() {
    if(this.memory.upgrading) {
        if(this.carry.energy === 0) {
            this.memory.upgrading = false;
            this.memory.needEnergy = true;
            this.say('Need Energy');
        }
    } else {
        if(this.carry.energy === this.carryCapacity) {
            this.memory.upgrading = true;
            this.memory.needEnergy = false;
            this.say('Upgrading');
        }
    }
    if(this.memory.upgrading) {
        if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
            this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            //try {this.pathing(this.room.controller);} catch(err) {console.log(err+": Creep.roleUpgrader.js this.pathing(this.room.controller)");}
        }
    } else {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: 50,
            structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
        });
    }
    this.passiveRepair();
};

module.exports = roleUpgrader;
