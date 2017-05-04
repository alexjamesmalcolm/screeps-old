var RoomLink = function() {
    var linkClosestToStorage = this.storage.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType === STRUCTURE_LINK) {
                return true;
            } else {
                return false;
            }
        }
    });
    var links = this.find(FIND_STRUCTURES, {
        filter: function(structure) {
            if(structure.structureType === STRUCTURE_LINK) {
                return true;
            } else {
                return false;
            }
        }
    });
    for(var i = 0; i < links.length; i++) {
        var link = links[i];
        if(link.id !== linkClosestToStorage.id) {
            if(link.energy <= linkClosestToStorage.energyCapacity - linkClosestToStorage.energy) {
                link.transferEnergy(linkClosestToStorage);
            }
        }
    }
};

module.exports = RoomLink;
