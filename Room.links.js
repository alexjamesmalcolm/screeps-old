var RoomLink = function() {
    var links = this.memory.found.links;
    if(links.length >= 2) {
        var linkClosestToStorage = this.storage.pos.findClosestByRange(links, {
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
                if(linkClosestToStorage.energyCapacity > linkClosestToStorage.energy) {
                    var amount = linkClosestToStorage.energyCapacity - linkClosestToStorage.energy;
                    if(amount > link.energy) {
                        amount = link.energy;
                    }
                    link.transferEnergy(linkClosestToStorage, amount);
                }
            }
        }
    }
};

module.exports = RoomLink;
