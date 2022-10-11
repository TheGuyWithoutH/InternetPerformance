/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

class Position {
    constructor([long, lat]) {
        this.long = long
        this.lat = lat
    }

    /**
     * 
     * @param {Position} other 
     */
    distanceTo(other) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.#deg2rad(other.lat - this.lat);  // deg2rad below
        var dLon = this.#deg2rad(other.long - this.long); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.#deg2rad(this.lat)) * Math.cos(this.#deg2rad(other.lat)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    #deg2rad(deg) {
        return deg * (Math.PI/180)
      }
}

module.exports = Position