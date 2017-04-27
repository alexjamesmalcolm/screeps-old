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
    if(hostiles.length === 0) {
        hurtCreeps = this.find(FIND_MY_CREEPS, {
            filter: function(creep) {
                return creep.hitsMax - creep.hits > 0;
            }
        });
        if(hurtCreeps.length === 0) {
            damagedStructures = this.find(FIND_STRUCTURES, {
                filter: function(structure) {
                    return structure.hitsMax - structure.hits > 0;
                }
            });
        }
    }
    if(hostiles.length > 0) {
        for(i = 0; i < towers.length; i++) {
            tower = towers[i];
            tower.attack(hostiles[0]);
        }
    } else if(hurtCreeps.length > 0) {
        for(i = 0; i < towers.length; i++) {
            tower = towers[i];
            tower.heal(hurtCreeps[0]);
        }
    } else if(damagedStructures.length > 0) {
        for(i = 0; i < towers.length; i++) {
            tower = towers[i];
            tower.repair(damagedStructures[0]);
        }
    }
};

module.exports = RoomTowers;
