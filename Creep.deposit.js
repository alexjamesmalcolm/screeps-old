var CreepDeposit = function(input) {
    var creepDepositing = input.creepDepositing;
    var structures = input.structures;
    var amount = this.carry.energy;
    var target;
    var check = function(structure, structures, structureType) {
        return structure.structureType == structureType
        && structures.indexOf(structureType) != -1;
    }
    var closestStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
            if(check(structure, structures, STRUCTURE_EXTENSION)) {
                return structure.energyCapacity - structure.energy >= amount;
            } else if(check(structure, structures, STRUCTURE_SPAWN)) {
                return structure.energyCapacity - structure.energy >= amount;
            } else if(check(structure, structures, STRUCTURE_STORAGE)) {
                return structure.storeCapacity - _.sum(structure.store) >= amount;
            } else if(check(structure, structures, STRUCTURE_CONTAINER)) {
                return structure.storeCapacity - _.sum(structure.store) >= amount;
            }
        }
    });
    var closestCreep = this.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: function(creep) {
            if(creep.memory.needEnergy) {
                return true;
            }
        }
    });
    var closestStructureDistance = this.pos.getRangeTo(closestStructure);
    var closestCreepDistance = this.pos.getRangeTo(closestCreep);
    if(closestCreepDistance <= closestStructureDistance) {
        target = closestCreep;
    } else {
        target = closestStructure;
    }
    if(target) {
        if(this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(target);
        }
    }
};

module.exports = CreepDeposit;

/*
//Collect Code
this.collect({
    resource: RESOURCE_ENERGY,
    amount: this.carryCapacity,
    structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE]
});
//Courier Code
var target;
var closestStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function(structure) {
        if (structure.structureType == STRUCTURE_EXTENSION) {
            return structure.energy < structure.energyCapacity;
        } else if (structure.structureType == STRUCTURE_SPAWN) {
            return structure.energy < structure.energyCapacity;
        }
    }
});
var closestCreep = this.pos.findClosestByRange(FIND_CREEPS, {
    filter: function(creep) {
        if (creep.memory.needEnergy) {
            return true;
        }
    }
});
var closestStructureDistance = this.pos.getRangeTo(closestStructure);
var closestCreepDistance = this.pos.getRangeTo(closestCreep);
if (closestCreepDistance <= closestStructureDistance) {
    target = closestCreep;
} else {
    target = closestStructure
}
if(target) {
    if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
} else {
    this.moveTo(Game.flags.Flag1);
}
//Harvester Code
var target = this.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: function(structure) {
        if (structure.structureType == STRUCTURE_EXTENSION) {
            return structure.energy < structure.energyCapacity;
        } else if (structure.structureType == STRUCTURE_SPAWN) {
            return structure.energy < structure.energyCapacity;
        } else if (structure.structureType == STRUCTURE_CONTAINER) {
            return _.sum(structure.store) < structure.storeCapacity
        } else if (structure.structureType == STRUCTURE_STORAGE) {
            return structure.energy < strucutre.energyCapacity; //Incorrect, should be similar to container
        }
    }
});
if (target) {
    if (this.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.moveTo(target);
    }
}
*/
