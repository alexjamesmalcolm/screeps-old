var roleBuilder = function() {
    var say = function(text) {
        this.say('B: '+text);
    }
    if(this.memory.building && this.carry.energy == 0) {
        this.memory.building = false;
        this.memory.needEnergy = true;
        say('harvesting');
    }
    if(!this.memory.building && this.carry.energy == this.carryCapacity) {
        this.memory.building = true;
        this.memory.needEnergy = false;
        say('building');
    }
    if(this.memory.building) {
        var target = this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target) {
            if(this.build(target) == ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
        this.passiveRepair();
    } else {
        this.collect({
            resource: RESOURCE_ENERGY,
            amount: this.carryCapacity,
            structures:[STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_SPAWN]
        });
    }
};

module.exports = roleBuilder;
