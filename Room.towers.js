var RoomTowers = function() {
    /*If hostiles deal with those, if not hostiles then heal creeps, if not that, then repair structures*/
    var towers, hostiles, hurtCreeps, damagedStructures, i, tower;
    towers = this.find(FIND_MY_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType == STRUCTURE_TOWER) {
                return true;
            }
        }
    });
    hostiles = this.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        hostiles.sort(function(a, b) {
            //F = 2 * (W - M)
            var a_fatigue = 2 * (a.weight() - a.getActiveBodyparts(MOVE));
            var b_fatigue = 2 * (b.weight() - b.getActiveBodyparts(MOVE));
            return a_fatigue - b_fatigue;
        });
    } else {
        hurtCreeps = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                return creep.hitsMax - creep.hits > 0;
            }
        });
        if(hurtCreeps.length > 0) {
            hurtCreeps.sort(function(a, b) {
                var a_percent = a.hits / a.hitsMax;
                var b_percent = b.hits / b.hitsMax;
                return a_percent - b_percent;
            });
        } else {
            damagedStructures = this.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hitsMax - structure.hits > 0;
                }
            });
            if(damagedStructures.length > 0) {
                damagedStructures.sort(function(a, b) {
                    var a_percent = a.hits / a.hitsMax;
                    var b_percent = b.hits / b.hitsMax;
                    return a_percent - b_percent;
                });
            } else {
                return;
            }
        }
    }
    for(i = 0; i < towers.length; i++) {
        tower = towers[i];
        var energyPercent = tower.energy / tower.energyCapicity;
        if(hostiles.length > 0) {
            tower.attack(hostiles[0]);
        } else if(hurtCreeps.length > 0) {
            tower.heal(hurtCreeps[0]);
        } else if(damagedStructures.length > 0) {
            if(energyPercent > 0.9) {
                tower.repair(damagedStructures[0]);
            }
        }
    }
};

module.exports = RoomTowers;