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
        /*
        this.deposit({
            creepDepositing: true,
            structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
        });
        */
        this.deposit({
            creepDepositing:true,
            structures: {
                STRUCTURE_CONTAINER: 1,
                STRUCTURE_STORAGE: 3,
                STRUCTURE_EXTENSION: 2,
                STRUCTURE_SPAWN: 2
            }
        });
        this.passiveRepair
    }
    //this.memory.lastPos = this.pos;
};

module.exports = roleHarvester;
