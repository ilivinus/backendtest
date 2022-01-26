
# Backend developer test task

### Endpoints
- For POST Request 
```
local POST: http://localhost:3000/org

online POST: https://viveo.herokuapp.com/org?name=black banana&page=1&pageSize=100
```
- For Get Request
```
local GET: http://localhost:3000/org?name=black banana&page=1&pageSize=100

online GET: https://viveo.herokuapp.com/org?name=black banana&page=1&pageSize=100
```

### Tech stack used
- Node.js with express.js
- MySQL database
- Docker
- heroku SAAS
- Typescript


### Solution to Questions in the task

4. Think about the performance and be prepared to discuss on it:

- a) Could this service perform well even with up to 100K relations per one organization? 

#### Answer 

- The service will definitely crash due to the recursive function (`buildRelationshipQuery()`) used in `src/controllers/organisation.ts` exceeding its call limit which will lead to stack overflow. 
- Nodejs POST request body may exceed Node's heap limit.

b) What would you change in architecture if 1M relations support is needed?


#### Answer
- Open up a stream and process the request in steps.
- Convert the recursion (memory intensive process) to loop (time intensive process)
- Use indexing in the best possible way in the database to reduce disk I/O.
<hr>

### Organization Relationships
The goal of this task it to create a RESTful service that stores organisations with relations (parent to child relation). Organization name is unique. One organisation may have multiple parents and daughters. All relations and organisations are inserted with one request (endpoint 1). API has a feature to retrieve all relations of one organization (endpoint 2). This endpoint response includes all parents, daughters and sisters of a given organization. Good luck!

### Service Endpoints

- REST API endpoint that would allow to add many organization with relations in one POST request:

```
{
    "org_name": "Paradise Island",
    "daughters": [
        {
            "org_name": "Banana tree",
            "daughters": [
                {
                    "org_name": "Yellow Banana"
                },
                {
                    "org_name": "Brown Banana"
                },
                {
                    "org_name": "Black Banana"
                }
            ]
        },
        {
            "org_name": "Big banana tree",
            "daughters": [
                {
                    "org_name": "Yellow Banana"
                },
                {
                    "org_name": "Brown Banana"
                },
                {
                    "org_name": "Green Banana"
                },
                {
                    "org_name": "Black Banana",
                    "daughters": [
                        {
                            "org_name": "Phoneutria Spider"
                        }
                    ]
                }
            ]
        }
    ]
}
```

- REST API endpoint that returns relations of one organization (queried by name). All organization daughters, sisters and parents are returned as one list. List is ordered by name and one page may return 100 rows at max with pagination support. For example if you query relations for organization “Black Banana”, you will get:
```
[
    {
    "relationship_type": "parent",
    "org_name": "Banana tree"
    },
    {
    "relationship_type": "parent",
    "org_name": "Big banana tree"
    },
    {
    "relationship_type": "sister",
    "org_name": "Brown Banana"
    },
    {
    "relationship_type": "sister",
    "org_name": "Green Banana"
    },
    {
    "relationship_type": "daughter",
    "org_name": "Phoneutria Spider"
    },
    {
    "relationship_type": "sister",
    "org_name": "Yellow Banana"
    }
]
```


#### Author : Livinus Umeaduma