var roleCourier = function() {
    var collectionTypes = [STRUCTURE_CONTAINER, STRUCTURE_LINK];
    var depositTypes = [STRUCTURE_STORAGE, STRUCTURE_TOWER];
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
        var result = this.collect({
            structures: collectionTypes
        });
    } else {
        var repositories = this.getRepositories(collectionTypes);
        var result = this.deposit({
            creepDepositing: false,
            structures: depositTypes
        });
        if(result === ERR_NOT_FOUND) {
            this.memory.collecting = false;
        }
    }
};

module.exports = roleCourier;
