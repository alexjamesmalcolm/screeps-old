var roleHarvester = function() {
    if(this.memory.harvesting) {
        if(this.carry.energy === this.carryCapacity) {
            this.memory.harvesting = false;
            this.say('Carrying');
        }
    } else {
        if(this.carry.energy === 0) {
            this.memory.harvesting = true;
            this.say('Harvesting');
        }
    }

    if(this.memory.harvesting) {
        var source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE); //Inefficient
        if(source) {
            if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        } else {
            var sources = this.room.find(FIND_SOURCES);
            sources.sort(function(a, b) {
                return a.ticksToRegeneration - b.ticksToRegeneration;
            });
            source = sources[0];
            this.moveTo(source);
        }
    } else {
        var links = this.room.memory.found.links;
        var link = this.pos.findClosestByRange(links, {filter: function(structure) {
            if(structure.structureType === STRUCTURE_LINK) {
                return true;
            } else {
                return false;
            }
        }});
        if(link && this.pos.inRangeTo(link, 2)) {
            var result = this.transfer(link, RESOURCE_ENERGY);
            if(result === ERR_NOT_IN_RANGE) {
                this.moveTo(link);
            }
        } else {
            try {
                this.deposit({
                    creepDepositing: false,
                    structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
                });
            } catch(err) {console.log(err+": Creep.roleHarvester.js this.deposit()");}
        }
        try {this.passiveRepair();} catch(err) {console.log(err+": Creep.roleHarvester.js this.passiveRepair()");}
    }
};

module.exports = roleHarvester;
