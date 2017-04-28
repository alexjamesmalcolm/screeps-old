var CreepWeight = function() {
    var work, carry, attack, ranged_attack, heal, tough;
    work = this.getActiveBodyparts(WORK);
    carry = this.getActiveBodyparts(CARRY);
    attack = this.getActiveBodyparts(ATTACK);
    ranged_attack = this.getActiveBodyparts(RANGED_ATTACK);
    heal = this.getActiveBodyparts(HEAL);
    tough = this.getActiveBodyparts(TOUGH);
    return work + carry + attack + ranged_attack + heal + tough;
};

module.exports = CreepWeight;
