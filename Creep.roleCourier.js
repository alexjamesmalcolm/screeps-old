var roleCourier = function() {
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
        var containers = this.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                if(structure.structureType === STRUCTURE_CONTAINER) {
                    var amount = _.sum(structure.store);
                    if(amount > 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        });
        containers.sort(function(a, b) {
            var a_amount = _.sum(a.store);
            var b_amount = _.sum(b.store);
            return b - a;
        });
        var result = this.withdraw(containers[0], RESOURCE_ENERGY);
        if(result === ERR_NOT_IN_RANGE) {
            this.moveTo(containers[0]);
        }
    } else {
        var result = this.deposit({
            creepDepositing: false,
            structures: [STRUCTURE_STORAGE, STRUCTURE_TOWER]
        });
        if(result === ERR_NOT_FOUND) {
            this.memory.collecting = false;
        }
    }
};

module.exports = roleCourier;
