const {Entity, Schema } = reqire('redis-om')

class TimeFrame extends Entity {}

// This is the schema for the timeFrame entity
// from and to are dates
// user_count and latency_count are numbers
// location is a string containing either coordinates or a location name
exports.timeFrameSchema = new Schema(TimeFrame, {
    from: { type: 'date' },
    to: { type: 'date' },
    user_count: { type: 'number' },
    latency_count: { type: 'number' },
    location: { type: 'string' }
})

class User extends Entity {}

// This is the schema for the timeFrame entity
// from and to are dates
// user_count and latency_count are numbers
// location is a string containing either coordinates or a location name
exports.timeFrameSchema = new Schema(User, {
    id: { type: 'string' },
    queries: { type: 'array' }
})