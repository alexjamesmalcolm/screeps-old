var CreepRoleSpawnKeeper = function() {
    console.log("this: "+this);
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
    if(this.memory.collecting) {
        console.log("Collecting");
        var target;
        var storage = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: function(structure) {
                if(structure.structureType === STRUCTURE_STORAGE) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        console.log("storage: "+storage);
        var droppedEnergy = this.room.find(FIND_DROPPED_ENERGY);
        if(droppedEnergy.length > 0 && droppedEnergy[0].amount > 50) {
            console.log("If");
            target = droppedEnergy[0];
            this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            if(this.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        } else {
            console.log("Else");
            Game.creeps["Skyler"].pos.findClosestByRange(FIND_MY_STRUCTURES, {});
            target = storage; //Game.getObjectById("5903f08c1fa9178039b33ca9");
            console.log("target.pos: "+target.pos);
            this.room.visual.circle(target.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
            console.log(this.withdraw(target, RESOURCE_ENERGY));
            if(this.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this.moveTo(target);
            }
        }
        console.log("target: "+target);
    } else {
        this.deposit({
            creepDepositing: false,
            structures: [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER]
        });
    }
};

module.exports = CreepRoleSpawnKeeper;
