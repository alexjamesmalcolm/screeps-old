var CreepRoleSpawnKeeper = function() {
    var creep = this;
    var startTime = 19040828;
    var rate = 0.75
    var storageAmount = Math.floor(rate * (Game.time - startTime) + 2534);
    if(storageAmount > 100000) {
        storageAmount = 100000;
    }
    console.log(storageAmount);
    //y = (x-t)*r + 2000
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
        if(energy.amount > creep.carryCapacity * 0.05) {
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
        var containers = _.filter(this.room.memory.found.structures, function(structure) {
            if(structure.structureType === STRUCTURE_CONTAINER) {
                if(structure.store.energy > 0) {
                    return true;
                }
            }
        });
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
            } else if(storage.store[RESOURCE_ENERGY] > storageAmount) {
                target = storage;
                var amount = Math.floor(storage.store[RESOURCE_ENERGY] - storageAmount - rate * 50);
                if(amount > this.carryCapacity - this.carry.energy) {
                    amount = this.carryCapacity - this.carry.energy;
                }
                if(amount > 0) {
                    this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                    var result = this.withdraw(target, RESOURCE_ENERGY, amount);
                    if(result === ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }
                } else {
                    this.memory.collecting = false;
                }
            } else if(containers.length > 0) {
                target = this.pos.findClosestByRange(containers);
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                var result = this.withdraw(target, RESOURCE_ENERGY);
                if(result === ERR_NOT_IN_RANGE) {
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
