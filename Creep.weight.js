var CreepWeight = function() {
    //var move = this.getActiveBodyparts(MOVE);
    var work = this.getActiveBodyparts(WORK);
    var carry = this.getActiveBodyparts(CARRY);
    var attack = this.getActiveBodyparts(ATTACK);
    var ranged_attack = this.getActiveBodyparts(RANGED_ATTACK);
    var heal = this.getActiveBodyparts(HEAL);
    var tough = this.getActiveBodyparts(TOUGH);
    return work + carry + attack + ranged_attack + heal + tough;
};

module.exports = CreepWeight
