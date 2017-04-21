var roleHarvester = function() {
    if (this.memory.harvesting) {
        if (this.carry.energy == this.carryCapacity) {
            this.memory.harvesting = false;
            this.say('Carrying');
        }
    } else {
        if (this.carry.energy == 0) {
            this.memory.harvesting = true;
            this.say('Harvesting');
        }
    }

    if (this.memory.harvesting) {
        var source = this.pos.findClosestByPath(FIND_SOURCES); //Inefficient
        if (this.harvest(source) == ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    } else {
        this.deposit({
            creepDepositing: false,
            structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
        });
        this.passiveRepair
    }
    //this.memory.lastPos = this.pos;
};

module.exports = roleHarvester;
