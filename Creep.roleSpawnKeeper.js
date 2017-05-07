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
            var a_energy, b_energy;
            if(a.structureType === STRUCTURE_LINK) {
                a_energy = a.energy;
            } else if(a.structureType === STRUCTURE_CONTAINER) {
                a_energy = a.store.energy;
            }
            if(b.structureType === STRUCTURE_LINK) {
                b_energy = b.energy;
            } else if(b.structureType === STRUCTURE_CONTAINER) {
                b_energy = b.store.energy;
            }
            return b_energy - a_energy;
        });
        targets = _.filter(targets, function(target) {
            var energy;
            if(target.structureType === STRUCTURE_LINK) {
                energy = target.energy;
            } else if(target.structureType === STRUCTURE_CONTAINER) {
                energy = target.store.energy;
            }
            var remainingEnergy = this.carryCapacity - _.sum(this.carry);
            if(energy > remainingEnergy * carryMultiplier) {
                return true;
            } else {
                return false;
            }
        });
        console.log(targets);
        console.log(targets.length);
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
            /*
            if(linkClosestToStorage && linkClosestToStorage.energy > 0) {
                target = linkClosestToStorage;
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                if(this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else if(storage && storage.store[RESOURCE_ENERGY] > storageAmount) {
            } else if(containers.length > 0) {
                target = containers[0];
                this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
                result = this.withdraw(target, RESOURCE_ENERGY);
                if(result === ERR_NOT_IN_RANGE) {
                    this.moveTo(target);
                }
            } else {
                this.memory.collecting = false;
            }
            */
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
