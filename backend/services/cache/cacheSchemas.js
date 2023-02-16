/**
 * @file
 * @author Ugo Balducci
 * @version 1.0.0
 */

// const { query } = require("../api/dbQuery")

const {Entity, Schema } = require('redis-om')




class TimeFrame extends Entity {
    get locationJSON() {
        return JSON.parse(this.location)
    }

    timeframe() {
        return {
            from: this.from,
            to: this.to,
            latency_count: this.latency_count,
            user_count: this.user_count,
        }
    }
}

// This is the schema for the timeFrame entity
// from and to are dates
// user_count and latency_count are numbers
// location is a string containing either coordinates or a location name
exports.timeFrameSchema = new Schema(TimeFrame, {
    from: { type: 'number' },
    to: { type: 'number' },
    latency_count: { type: 'number' },
    user_count: { type: 'number' },
    location: { type: 'string' }
})




class LocationQuery extends Entity {
    get locationJSON() {
        return JSON.parse(this.location)
    }

    userAtLocation() {
        return {
            user_id: this.user_id,
            location: this.locationJSON,
        }
    }
}

// This is the schema for the user location queries
// user_id is the id of the user
// location is the location the user queried
// queries is an array of queries that returned this user
exports.locationQuerySchema = new Schema(LocationQuery, {
    user_id: { type: 'string' },
    location: { type: 'string' },
    queries: { type: 'string[]' }
})




class UserQuery extends Entity {
    get latenciesJSON() {
        return this.latencies.map((latency) => {
            return JSON.parse(latency)
        })
    }

    get locationJSON() {
        return JSON.parse(this.location)
    }

    user() {
        return {
            user_id: this.user_id,
            latencies: this.latenciesJSON,
            location: this.locationJSON
        }
    }
}

// This is the schema for the user queries
// user_id is the id of the user
// latencies is an array of latencies for the query
// location is the location the user queried
exports.userQuerySchema = new Schema(UserQuery, {
    user_id: { type: 'string' },
    latencies: { type: 'string[]' },
    location: { type: 'string' },
})




class StreamQuery extends Entity {
    get latenciesJSON() {
        return this.latencies.map((latency) => {
            return JSON.parse(latency)
        })
    }

    get locationJSON() {
        return JSON.parse(this.location)
    }

    stream() {
        return {
            stream_id: this.stream_id,
            user_id: this.user_id,
            latencies: this.latenciesJSON,
            location: this.locationJSON
        }
    }
}

// This is the schema for the user queries
// stream_id is the id of the stream
// user_id is the id of the user
// latencies is an array of latencies for the query
// location is the location the user queried
exports.streamQuerySchema = new Schema(StreamQuery, {
    stream_id: { type: 'string' },
    user_id: { type: 'string' },
    latencies: { type: 'string[]' },
    location: { type: 'string' },
})