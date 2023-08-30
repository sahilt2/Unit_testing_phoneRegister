# Test cases for gettypes

## **getTypes()**

returns all phone types in an array. The type is added to the result array only once. If there are no phones or no persons, an empty array [] is returned.

For example:

```json
["home", "work", "mobile"]
```

## Test 1: getType from default data json.

Create register with default data.

```js
const register = new PhoneRegister(defaultData);
... register.getTypes();
```

returns

```json
["home", "work", "mobile"]
```

## Test 2: getType with empty type modified data json

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "", "number": "87654421" },
      { "type": "home", "number": "0987654" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": [{ "type": "work", "number": "0287604" }]
  }
]
```

Create register with modified data.

```js
const register = new PhoneRegister(defaultData);
... register.getTypes();
```

returns

```json
["home", "", "work"]
```

## Test 3: Only home phones

Test data:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "home", "number": "0987654" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": [{ "type": "home", "number": "12342468" }]
  }
]
```

Create register with test data.

```js
const register = new PhoneRegister(testData);
... register.getTypes();
```

returns

```json
["home"]
```

## Test 4: Person have no phones

Test data:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": []
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": []
  }
]
```

Create register with test data.

```js
const register = new PhoneRegister(testData);
... register.getTypes();
```

returns an empty array []

## Test 5: No persons

Create register with empty data.

```js
const register = new PhoneRegister([]);
... register.getTypes();
```
