var sourceAvailability = function(source) {
    var room = source.room;
    for(var i = -1; i < 2; i++) {
        for(var j = -1; j < 2; j++) {
            if(i * j != i + j) {
                var pos = new RoomPosition(source.pos.x + i, source.pos.y + j, room.name);
                var wallAtPosition = pos.lookFor(LOOK_TERRAIN)[0] === 'wall';
                var creepAtPosition;
                if(pos.lookFor(LOOK_CREEPS).length > 0) {
                    creepAtPosition = true;
                } else {
                    creepAtPosition = false;
                }
                if(!wallAtPosition) {
                    if(!creepAtPosition) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

var roleHarvester = function() {
    if(this.memory.harvesting) {
        if(this.carry.energy === this.carryCapacity) {
            this.memory.harvesting = false;
            this.say('Carrying');
        }
    } else {
        if(this.carry.energy === 0) {
            this.memory.harvesting = true;
            this.say('Harvesting');
        }
    }
    if(this.memory.harvesting) {
        var foundStructures = this.room.found.structures;
        var inRangeStructures = this.pos.findInRange(foundStructures, 1);
        var repositories = _.filter(inRangeStructures, function(structure) {
            var viableRepositories = [
                STRUCTURE_SPAWN,
                STRUCTURE_EXTENSION,
                STRUCTURE_LINK,
                STRUCTURE_STORAGE,
                STRUCTURE_TOWER,
                STRUCTURE_TERMINAL,
                STRUCTURE_CONTAINER
            ];
            if(viableRepositories.indexOf(structure.structureType) > -1) {
                return true;
            }
        });
        var creep = this;
        var source;
        var activeSources = this.room.memory.found.activeSources;
        activeSources.forEach(function(s) {
            if(s.pos.isNearTo(creep)) {
                source = s;
            }
        });
        if(!source) {
            var availableSources = _.filter(activeSources, function(source) {
                return sourceAvailability(source);
            });
            source = this.pos.findClosestByRange(availableSources);
        }
        if(source) {
            //this.room.visual.circle(source.pos, {fill: 'transparent', radius: 0.55, stroke: 'blue'});
            if(this.harvest(source) == ERR_NOT_IN_RANGE) {
                this.moveTo(source);
            }
        } else {
            var sources = this.room.memory.found.sources;
            sources.sort(function(a, b) {
                return a.ticksToRegeneration - b.ticksToRegeneration;
            });
            source = sources[0];
            this.moveTo(source);
        }
    } else {
        var links = this.room.memory.found.links;
        var link = this.pos.findClosestByRange(links, {filter: function(structure) {
            if(structure.structureType === STRUCTURE_LINK) {
                return true;
            } else {
                return false;
            }
        }});
        if(link && this.pos.inRangeTo(link, 2)) {
            var result = this.transfer(link, RESOURCE_ENERGY);
            if(result === ERR_NOT_IN_RANGE) {
                this.moveTo(link);
            }
        } else {
            try {
                this.deposit({
                    creepDepositing: false,
                    structures: [STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_EXTENSION, STRUCTURE_SPAWN]
                });
            } catch(err) {console.log(err+": Creep.roleHarvester.js this.deposit()");}
        }
        try {this.passiveRepair();} catch(err) {console.log(err+": Creep.roleHarvester.js this.passiveRepair()");}
    }
};

module.exports = roleHarvester;
