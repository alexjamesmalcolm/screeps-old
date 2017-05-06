var roleBuilder = function() {
    if(this.memory.building && this.carry.energy === 0) {
        this.memory.building = false;
        this.memory.needEnergy = true;
        this.say('Need Energy');
    }
    if(!this.memory.building && this.carry.energy === this.carryCapacity) {
        this.memory.building = true;
        this.memory.needEnergy = false;
        this.say('Building');
    }
    if(this.memory.building) {
        var flags = this.room.memory.found.flags;
        var myConstructionSites = this.room.memory.found.myConstructionSites;
        var wipSpawns = _.filter(myConstructionSites, function(site) {
            if(site.structureType === STRUCTURE_SPAWN) {
                return true;
            }
        });
        var orangeFlags = _.filter(flags, function(flag) {
            if(flag.color === COLOR_ORANGE) {
                return true;
            }
        });
        if(wipSpawns.length > 0) {
            var spawn = wipSpawns[0];
            var result = this.build(spawn);
            if(result === ERR_NOT_IN_RANGE) {
                this.moveTo(spawn);
            }
        } else if(orangeFlags.length > 0) {
            this.moveTo(orangeFlags[0]);
        } else {
            var result = this.maintainBuild({
                activeRepair: true,
                structures: [
                    STRUCTURE_CONTAINER,
                    STRUCTURE_STORAGE,
                    STRUCTURE_ROAD
                ]
            });
            if(result == ERR_NOT_FOUND) {
                this.memory.recycle = true;
            }
            this.passiveRepair();
        }
    } else {
        if(this.room.storage) {
            this.collect({
                resource: RESOURCE_ENERGY,
                amount: this.carryCapacity,
                structures:[STRUCTURE_STORAGE]
            });
        } else {
            var sources = this.room.memory.found.sources;
            var source = this.pos.findClosestByPath(sources);
            var result = this.harvest(source);
            if(result === ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        }
    }
};

module.exports = roleBuilder;
