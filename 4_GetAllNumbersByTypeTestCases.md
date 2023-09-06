## **getAllNumbersByType(type)**

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

## Tests

### Testing type:work with default data

returns

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

### type: mobile

returns

```json
[
  {
    "firstname": "Matt",
    "lastname": "River",
    "number": { "type": "mobile", "tel": "07654420" }
  }
]
```
