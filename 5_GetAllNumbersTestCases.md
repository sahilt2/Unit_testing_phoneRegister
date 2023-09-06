# Test cases of getAllnumbers

### **getAllNumbers()**

Returns all phone numbers in an array, each as an object of form:

```json
{
  "firstname": "",
  "lastname": "",
  "phones": []
}
```

The phone object in phones array is of form:

```json
{ "type": "", "number": "" }
```

If a person doesn't have a phone (the phone field is an empty array), then the person is not added into the result array. If all persons are missing an empty arary is returned.

## Tests

### Testing with default data

returns same array that was used to create the register

### Testing some phones missing

testData:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "work", "number": "87654421" },
      { "type": "work", "number": "0987654" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": []
  }
]
```

returns:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "work", "number": "87654421" },
      { "type": "work", "number": "0987654" }
    ]
  }
]
```

### Testing some phones missing 2

testData:

```json
[
  {
    "firstname": "Vera",
    "lastname": "River",
    "phones": []
  },
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "work", "number": "87654421" },
      { "type": "work", "number": "0987654" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": []
  }
]
```

returns:

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "work", "number": "87654421" },
      { "type": "work", "number": "0987654" }
    ]
  }
]
```

### Testing all phones missing

testData:

```json
[
  {
    "firstname": "Vera",
    "lastname": "River",
    "phones": []
  },
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

returns []

### Testing all persons missing

Testdata is an empty array []
returns []

### Testing with empty type

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
    "firstname": "Vera",
    "lastname": "River",
    "phones": []
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": [{ "type": "work", "number": "0287604" }]
  }
]
```
