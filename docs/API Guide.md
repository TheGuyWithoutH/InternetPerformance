---
layout: default
title: API Guide
nav_order: 4
---

<style>
    blockquote {
        margin: 10px 0;
        margin-block-start: 0;
        margin-inline-start: 0;
        padding-left: 15px;
        border-left: 3px solid #eeebee;
        display: block;
        margin-block-end: 1em;
        margin-inline-end: 40px;
    }
    
    
    p.warning, blockquote.warning {
        background: rgba(247, 126, 126, 0.2);
        border-left: 4px solid #dd2e2e;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    blockquote.warning, blockquote.important, blockquote.note-title {
        margin-left: 0;
        margin-right: 0;
    }

    p.note, blockquote.note {
        background: rgba(114, 83, 237, 0.2);
        border-left: 4px solid #381885;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.highlight, blockquote.highlight {
        background: rgba(255, 235, 130, 0.2);
        border-left: 4px solid #e7af06;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.important, blockquote.important {
        background: rgba(44, 132, 250, 0.2);
        border-left: 4px solid #183385;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.note-title, blockquote.note-title {
        background: rgba(114, 83, 237, 0.2);
        border-left: 4px solid #381885;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.note-title > p:first-child, blockquote.note-title > p:first-child {
        margin-top: 0;
        margin-bottom: 0;
        color: #381885;
        display: block;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.75em;
        padding-bottom: 0.125rem;
    }
</style>

# API Structure

The NodeJS backend exposes API endpoints to retrieve data from the dataset. It has been built to support both full parameter searches for external clients (endpoints `/api/query`) and optimized worflow of the website (endpoints `api/services`). Here you will find the different endpoints of the API, how to use them and what type of JSON they return.

## Types

Some of the types described below might be ambiguous, so here is a quick reminder of the conventions we use in this project.

<br>

#### **Coordinates**
According to GeoJSON standards used in MongoDB, the **coordinates** must be specified via an **array of floats** :

```json
<field>: [<longitude>, <latitude> ]
```

Valid longitude values are between `-180` and `180`, both inclusive. <br>
Valid latitude values are between `-90` and `90`, both inclusive.

<br>

#### **Timestamp**

The time metrics we use in this project are the **timestamps** or namely the **Unix epoch** (or Unix time or POSIX time or Unix timestamp). It is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z). The value is stored in an **`Integer`** field.

<blockquote class="warning">
    <p>Using time can be tricky sometimes as javascript <code>Date</code> represents *local time*. We thus need to make sure to first convert the date to UTC time zone to get the right requested date. <br> If at some point this convention needs to be changed, do not forget to adapt the module <code>utils/parseDate.js</code> in the backend.</p>
</blockquote>

<br>

#### **IDs**

As we use MongoDB as database system, we use the default `_id` field to identify each document. It is a **12-byte value** represented by a *24-character hexadecimal `string`*. It's uniqueness for each document enables us to query for a specific document, and help link multiple databases together - as a foreign key field would do in SQL -.

<br>

## 1. Geographic Queries

#### Endpoint : `/api/query/spatial`

### Request

Arguments for the request :

- **`coordinates`** (Float, Float) : coordinates of the center of the target zone, format for the array is `long,lat`, no default.
- **`maxDistance`** (Int) : the radius in meters of the target zone, centered at `(long, lat)`, default at `1000`.
- **`country`** (String) : the country of the requests wanted, see also `country_code`, no default.
- **`country_code`** (String) : the country code (Alpha-2) of the requests wanted, see also `country`, no default.
- **`region`** (String) : the region of the requests wanted, no default.
- **`county`** (String) : the county of the requests wanted, no default.
- **`city`** (String) : the city of the requests wanted, no default.

&rarr; Can be combined with time queries

The good practice with these arguments is to either use coordinates or geographic places.

Options for the response :

- **`streamId`** (String) : enables `stream_id` information for each latency, either `on` or `off`, default is `off`.
- **`latencyOnly`** (String) : disables users informations and gather latencies in same array, either `on` or `off`, default is `off`.

<br>

### Response

```json
{
	"stats": {
		"mean": FLOAT,
		"sd": FLOAT,
		"quartile1": INTEGER,
		"median": INTEGER,
		"quartile3": INTEGER,
		"10%": INTEGER,
		"90%": INTEGER,
		"99%: INTEGER
	},
	"users": {
		"user_id1": {
			"latencies": [(TIMESTAMP, latency1 /*, stream_id1 */), ..., (TIMESTAMP, latencyN /*, stream_idN */)],
			"location": {
				"coordinates": [FLOAT, FLOAT],
				"country": STRING,
				"country_code": ISO2_STRING,
				"region": STRING,
				"county": STRING,
				"city": STRING
			}
		},
		...,
		"user_id1": {
			"latencies": [(TIMESTAMP, latency1 /*, stream_id1 */), ..., (TIMESTAMP, latencyN /*, stream_idN */)],
			"location": {
				"coordinates": [FLOAT, FLOAT],
				"country": STRING,
				"country_code": ISO2_STRING,
				"region": STRING,
				"county": STRING,
				"city": STRING
			}
		}
	},
	/*      **For** *latency-only* **mode**
	"latencies": [(TIMESTAMP, latency1), ..., (TIMESTAMP, latencyN)]
	*/
}
```

<br>

## 2. Time Queries

#### Endpoint : `/api/query/time`

### Request

Arguments for the request :

- **`from`** (Int) : retrieve latencies starting from this timestamp, default at `0`.
- **`to`** (Int) : retrieve latencies until this timestamp, default at `∞`.
- **`from`** (Int) : retrieve latencies starting from this year, default at `0`.
- **`to`** (Int) : retrieve latencies until this year, default at `∞`.
- **`from`** (String) : retrieve latencies starting from this month, default at `0`, format for the string is `yyyy-mm` (month-year).
- **`to`** (String) : retrieve latencies until this month, default at `∞`, format for the string is `yyyy-mm` (month-year).
- **`from`** (String) : retrieve latencies starting from this date, default at `0`, format for the string is `yyyy-mm-dd`.
- **`to`** (String) : retrieve latencies until this date, default at `∞`, format for the string is `yyyy-mm-dd`.

&rarr; Can be combined with spatial queries

Options for the response :

- **`streamId`** (String) : enables `stream_id` information for each latency, either `on` or `off`, default is `off`.
- **`latencyOnly`** (String) : disables users informations and gather latencies in same array, either `on` or `off`, default is `off`.

<br>

### Response

```json
{
	"stats": {
		"mean": FLOAT,
		"sd": FLOAT,
		"quartile1": INTEGER,
		"median": INTEGER,
		"quartile3": INTEGER,
		"10%": INTEGER,
		"90%": INTEGER
	},
	"users": {
		"user_id1": {
			"latencies": [(TIMESTAMP, latency1 /*, stream_id1 */), ..., (TIMESTAMP, latencyN /*, stream_idN */)],
			"location": {
				"coordinates": [FLOAT, FLOAT],
				"country": STRING,
				"country_code": ISO2_STRING,
				"region": STRING,
				"county": STRING,
				"city": STRING
			}
		},
		...,
		"user_idn": {
			"latencies": [(TIMESTAMP, latency1 /*, stream_id1 */), ..., (TIMESTAMP, latencyN /*, stream_idN */)],
			"location": {
				"coordinates": [FLOAT, FLOAT],
				"country": STRING,
				"country_code": ISO2_STRING,
				"region": STRING,
				"county": STRING,
				"city": STRING
			}
		}
	},
	/*      **For** *latency-only* **mode**
	"latencies": [(TIMESTAMP, latency1), ..., (TIMESTAMP, latencyN)]
	*/
}
```

<br>

## 3. User/Stream Queries (Less Used)

### User Request

#### Endpoint : `/api/query/user`

Arguments for the request :

- **`id`** (Int) : user id of the requested user, no default.

Options for the response :

- **`streamId`** (String) : enables `stream_id` information for each latency, either `on` or `off`, default is `off`.
- **`latencyOnly`** (String) : disables users informations and gather latencies in same array, either `on` or `off`, default is `off`.

### User Response

```json
{
	"stats": {
		"mean": FLOAT,
		"sd": FLOAT,
		"quartile1": INTEGER,
		"median": INTEGER,
		"quartile3": INTEGER,
		"10%": INTEGER,
		"90%": INTEGER
	},
	"user": {
		"user_id": user_id,
		"latencies": [(TIMESTAMP, latency1 /*, stream_id1 */), ..., (TIMESTAMP, latencyN /*, stream_idN */)],
		"location": {
			"coordinates": [FLOAT, FLOAT],
			"country": STRING,
			"country_code": ISO2_STRING,
			"region": STRING,
			"county": STRING,
			"city": STRING
		}
	}
	/*      **For** *latency-only* **mode**
	"latencies": [(TIMESTAMP, latency1), ..., (TIMESTAMP, latencyN)]
	*/
}
```

<br>

### Stream Request

#### Endpoint : `/api/query/stream`

Arguments for the request :

- **`id`** (Int) : stream id of the requested stream, no default.

Options for the response :

- **`latencyOnly`** (String) : disables users informations and gather latencies in same array, either `on` or `off`, default is `off`.

### Stream Response

```json
{
	"stats": {
		"mean": FLOAT,
		"sd": FLOAT,
		"quartile1": INTEGER,
		"median": INTEGER,
		"quartile3": INTEGER,
		"10%": INTEGER,
		"90%": INTEGER
	},
	"stream": {
		"stream_id": stream_id,
		"user_id": user_id,
		"latencies": [(TIMESTAMP, latency1), ..., (TIMESTAMP, latencyN)],
		"location": {
			"coordinates": [FLOAT, FLOAT],
			"country": STRING,
			"country_code": ISO2_STRING,
			"region": STRING,
			"county": STRING,
			"city": STRING
		}
	}
	/*      **For** *latency-only* **mode**
	"latencies": [(time1, latency1), ..., (timeN, latencyN)]
	*/
}
```

<br>

## 4. Time Frame Query

#### Endpoint : `/api/services/timeframe`

Arguments for the request :

- **`coordinates`** (Float, Float) : coordinates of the center of the target zone, format for the array is `long,lat`, no default.
- **`maxDistance`** (Int) : the radius in meters of the target zone, centered at `(long, lat)`, default at `1000`.
- **`country`** (String) : the country of the requests wanted, see also `country_code`, no default.
- **`country_code`** (String) : the country code (Alpha-2) of the requests wanted, see also `country`, no default.
- **`region`** (String) : the region of the requests wanted, no default.
- **`county`** (String) : the county of the requests wanted, no default.
- **`city`** (String) : the city of the requests wanted, no default.
- **`from`** (Int) : retrieve latencies starting from this timestamp, default at `0`.
- **`to`** (Int) : retrieve latencies until this timestamp, default at `∞`.
- **`frame`** (Int) : number of seconds per frame

<br>

### Response

```json
[
	{
		"from": TIMESTAMP,
		"to": TIMESTAMP,
		"user_count": INTEGER,
		"latency_count": INTEGER
	},
	{
		"from": TIMESTAMP,
		"to": TIMESTAMP,
		"user_count": INTEGER,
		"latency_count": INTEGER
	},
]
```

<br>

## 5. Table Query

#### Endpoint : `/api/services/table`

Arguments for the request :

- **`coordinates`** (Float, Float) : coordinates of the center of the target zone, format for the array is `long,lat`, no default.
- **`maxDistance`** (Int) : the radius in meters of the target zone, centered at `(long, lat)`, default at `1000`.
- **`country`** (String) : the country of the requests wanted, see also `country_code`, no default.
- **`country_code`** (String) : the country code (Alpha-2) of the requests wanted, see also `country`, no default.
- **`region`** (String) : the region of the requests wanted, no default.
- **`county`** (String) : the county of the requests wanted, no default.
- **`city`** (String) : the city of the requests wanted, no default.
- **`from`** (Int) : retrieve latencies starting from this timestamp, default at `0`.
- **`to`** (Int) : retrieve latencies until this timestamp, default at `∞`.
- **`limit`** (Int) : give the maximum of users to return.
- **`skip`** (Int) : give the number of data points to skip.
- ***`**sortBy**`** (String) : the name of the field to sort the results by.
- **`**sortOrder**`** (Int) : the order of the sorting, `1` for ascending order, `-1` for descending order.

<br>

### Response

```json
[
	{
		"user_id": ID,
		"stream_id": ID,
		"location":  {
			"coordinates": [FLOAT, FLOAT],
			"country": STRING,
			"country_code": ISO2_STRING,
			"region": STRING,
			"county": STRING,
			"city": STRING
		},
		"latency": INTEGER,
		"timestamp": TIMESTAMP
	},
	{
		"user_id": ID,
		"stream_id": ID,
		"location":  {
			"coordinates": [FLOAT, FLOAT],
			"country": STRING,
			"country_code": ISO2_STRING,
			"region": STRING,
			"county": STRING,
			"city": STRING
		},
		"latency": INTEGER,
		"timestamp": TIMESTAMP
	},
]
```

<p class='note'>
    The field <code>county</code> might be removed in the future, regarding its low accuracy.
</p>