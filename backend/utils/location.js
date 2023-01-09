exports.extractLocationQuery = (query) => {
    const locationQuery = {}

    if(query.coordinates) {
        query.maxDistance = query.maxDistance || 1000;
        locationQuery['location.coordinates'] = {
            $geoWithin: {
                $centerSphere: [query.coordinates, query.maxDistance/6378100]
            }
        }
    }

    if(query.country) {
        locationQuery['location.country'] = query.country
    }

    if(query.country_code) {
        locationQuery['location.country_code'] = query.country_code
    }

    if(query.region) {
        locationQuery['location.region'] = query.region
    }

    if(query.county) {
        locationQuery['location.county'] = query.county
    }

    if(query.city) {
        locationQuery['location.city'] = query.city
    }

    return locationQuery
}