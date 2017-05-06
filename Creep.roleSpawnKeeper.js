var CreepRoleSpawnKeeper = function() {
    var creep = this;
    var storageAmount = 2000;
    if(this.memory.collecting) {
        if(this.carry.energy === this.carryCapacity) {
            this.memory.collecting = false;
            this.say('Delivering');
        }
    } else {
        if(this.carry.energy === 0) {
            this.memory.collecting = true;
            this.say('Collecting');
        }
    }
    var droppedEnergy = _.filter(this.room.memory.found.droppedEnergy, function(energy) {
        if(energy.amount > creep.carryCapacity * 0.1) {
            return true;
        }
    });
    var links = this.room.memory.found.links;
    var linkClosestToStorage = this.room.storage.pos.findClosestByRange(links);
    var storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType === STRUCTURE_STORAGE) {
                return true;
            } else {
                return false;
            }
        }
    });
    if(this.memory.collecting) {
        var target;
        if(droppedEnergy.length > 0) {
            target = droppedEnergy[0];
            this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            if(this.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            if(linkClosestToStorage.energy > 0) {
                target = linkClosestToStorage;
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                if(this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else if(storage.store[RESOURCE_ENERGY] > storageAmount + this.carryCapacity) {
                target = storage;
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                if(this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else {
                this.memory.collecting = false;
            }
        }
    } else {
        if(droppedEnergy.length > 0) {
            this.deposit({
                creepDepositing: false,
                structures: [STRUCTURE_STORAGE]
            });
        } else {
            if(storage.store[RESOURCE_ENERGY] > storageAmount) {
                this.deposit({
                    creepDepositing: false,
                    structures: [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION]
                });
            } else {
                this.deposit({
                    creepDepositing: false,
                    structures: [STRUCTURE_STORAGE]
                });
            }
        }
    }
};

module.exports = CreepRoleSpawnKeeper;
