# Test cases for getPersonNumberByType

Method returns an array of phone numbers of the given `type`belonging to given person with `firstname` and `lastname`.

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

## Tests

All tests use the default data

### Test 1: Leila Hökki and work;

returns

```json
["87654421", "0987654"]
```

### Test 2: Matt River and mobile

returns

```json
["07654420"]
```

### Test 3: Wrong type or name

test with values

- firstname: Matt, lastname: River, type:x
- firstname: Matt, lastname: x, type:mobile
- firstname: x, lastname: River, type:mobile

returns []

### Test 4: Parameter missing

1 parameter missing : `Matt`,`River`
2 parameter missing : `Matt`
All parameters missing

throws exception `missing parameter`
