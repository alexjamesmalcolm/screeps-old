var CreepRoleSpawnKeeper = function() {
    var creep = this;
    var carryMultiplier = 0.05;
    var startTime = 19040828;
    var rate = 0.75;
    var storageAmount = Math.floor(rate * (Game.time - startTime) + 2534);
    var structures = this.room.memory.found.structures;
    if(storageAmount > 100000) {
        storageAmount = 100000;
    }
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
    var storage = this.room.storage;
    var droppedEnergy = _.filter(this.room.memory.found.droppedEnergy, function(energy) {
        if(energy.amount > creep.carryCapacity * carryMultiplier) {
            return true;
        }
    });
    if(this.memory.collecting) {
        var target, result;
        var links = this.room.memory.found.links;
        var linkClosestToStorage;
        if(links.length > 0) {
            linkClosestToStorage = this.room.storage.pos.findClosestByRange(links);
        }
        var containers = _.filter(structures, function(structure) {
            if(structure.structureType === STRUCTURE_CONTAINER) {
                if(structure.store.energy > 0) {
                    return true;
                }
            }
        });
        var targets = containers.concat([linkClosestToStorage]);
        targets.sort(function(a, b) {
            var a_energyPercent, b_energyPercent;
            if(a.structureType === STRUCTURE_LINK) {
                a_energyPercent = a.energy / a.energyCapacity;
            } else if(a.structureType === STRUCTURE_CONTAINER) {
                a_energyPercent = a.store.energy / a.storeCapacity;
            }
            if(b.structureType === STRUCTURE_LINK) {
                b_energyPercent = b.energy / b.energyCapacity;
            } else if(b.structureType === STRUCTURE_CONTAINER) {
                b_energyPercent = b.store.energy / b.storeCapacity;
            }
            return b_energyPercent - a_energyPercent;
        });
        console.log(this+targets[0]);
        var remainingEnergy = this.carryCapacity - _.sum(this.carry);
        targets = _.filter(targets, function(structure) {
            if(structure) {
                var energy;
                if(structure.structureType === STRUCTURE_LINK) {
                    energy = structure.energy;
                } else if(structure.structureType === STRUCTURE_CONTAINER) {
                    energy = structure.store.energy;
                }
                if(energy > remainingEnergy * carryMultiplier) {
                    return true;
                } else {
                    return false;
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
            if(targets.length > 0) {
                target = targets[0];
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                result = this.withdraw(target, RESOURCE_ENERGY);
                if(result === ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else if(storage && storage.store[RESOURCE_ENERGY] > storageAmount) {
                target = storage;
                var amount = Math.floor(storage.store[RESOURCE_ENERGY] - storageAmount - rate * 50);
                if(amount > this.carryCapacity - this.carry.energy) {
                    amount = this.carryCapacity - this.carry.energy;
                }
                if(amount > 0) {
                    this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                    result = this.withdraw(target, RESOURCE_ENERGY, amount);
                    if(result === ERR_NOT_IN_RANGE) {
                        this.moveTo(target);
                    }
                } else {
                    this.memory.collecting = false;
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
            if(storage) {
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
            } else {
                this.deposit({
                    creepDepositing: false,
                    structures: [STRUCTURE_SPAWN]
                });
            }
        }
    }
};

module.exports = CreepRoleSpawnKeeper;
