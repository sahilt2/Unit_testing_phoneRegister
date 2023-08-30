# Phone API

## data

Data will be in a json file. A person can be in the data array only once. Names are unique. So for example Leila Hökki can't exist twice in the json. Phone number is unique and can be only once in the json file. We also assume that the json file is valid and no field is missing.

### phones.json

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "phones": [
      { "type": "home", "number": "12345678" },
      { "type": "work", "number": "87654421" },
      { "work": "work", "number": "0987654" }
    ]
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "phones": [
      { "type": "home", "number": "12342468" },
      { "type": "mobile", "number": "07654420" },
      { "work": "work", "number": "0287604" }
    ]
  }
]
```

## Class PhoneRegister

### **constructor(data)**

Phones json array is passed as a parameter `data`. If parameter is missing, throws an exception `phone data missing`.

### **getTypes()**

returns all phone types in an array. The type is added to the result array only once. If there are no phones or no persons, an empty array [] is returned.

For example:

```json
["home", "work", "mobile"]
```

### **getPersonNumbersByType(firstname,lastname,type)**

Method returns an array of phone numbers of the given `type` belonging to given person with `firstname` and `lastname`.

For example Leila Hökki and work:

```json
["87654421", "0987654"]
```

Matt River and mobile:

```json
["07654420"]
```

if no person with given name is found, an empty array [] is returned.
if no number with given type is found, an empty array [] is returned.
if at least one parameter is missing, an exception `missing parameter` is thrown.

### **getAllNumbersByType(type)**

Returns an array of objects consisting of names and numbers of given type. If no number of given type is found, an empty array [] is returned.
If a person have multiple numbers of same type, each of them will be in it's own object.

If a parameter is missing, the method throws an exception `missing parameter`.

The format of the returned object is:

```json
{ "firstname": "", "lastname": "", "number": { "type": "", "tel": "" } }
```

#### Example

`type` work

```json
[
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "number": { "type": "work", "tel": "87654421" }
  },
  {
    "firstname": "Leila",
    "lastname": "Hökki",
    "number": { "type": "work", "tel": "0987654" }
  },
  {
    "firstname": "Matt",
    "lastname": "River",
    "number": { "type": "work", "tel": "0287604" }
  }
]
```

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

### **getName(number)**

The method searches the given phone number from the registery. If the number is found, method returns the owner of that number as an object:

```json
{ "firstname": "", "lastname": "" }
```

If no phone with given number is found, the method returns `null`.
If the parameter is missing, `null` is also returned.
