"use strict";
const PhoneRegister = require("../phoneRegister");
const phones = require("../phones.json");

describe("Testing constructor", () => {
  test("Missing parameter throws an exception", () => {
    expect(() => new PhoneRegister()).toThrow("phone data missing");
  });
});

describe(" Testing getType", () => {
  test("getType from default data json", () => {
    const register = new PhoneRegister(phones);
    // const expectedResult = ["home", "work", "mobile"];
    // expect(register.getTypes()).toEqual(expectedResult);
    expect(register.getTypes()).toEqual(["home", "work", "mobile"]);
  });

  test("getType with empty type in modified data json", () => {
    // we can also create a modified json file separately and require here
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "87654421" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "0287604" }],
      },
    ];
    const expectedResult = ["home", "", "work"];
    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(expectedResult);
  });

  test("Only home phones", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "home", number: "12342468" }],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual(["home"]);
  });

  test("Person have no phones", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getTypes()).toEqual([]);
  });

  test("No persons", () => {
    // const testData =[];
    // const register=new PhoneRegister(testData);
    const register = new PhoneRegister([]);
    expect(register.getTypes()).toEqual([]);
  });
});

describe("Testing getPersonNumberByType", () => {
  const register = new PhoneRegister(phones);

  describe("Test 1-3", () => {
    const testValues = [
      // fn      ln      type      expectedResult
      ["Leila", "Hökki", "work", ["87654421", "0987654"]],
      ["Matt", "River", "mobile", ["07654420"]],
      ["Matt", "River", "x", []],
      ["Matt", "x", "mobile", []],
      ["x", "River", "mobile", []],
    ];

    test.each(testValues)(
      "%s, %s, %s returns %s",
      (fn, ln, type, expectedResult) => {
        expect(register.getPersonNumbersByType(fn, ln, type)).toEqual(
          expectedResult
        );
      }
    );
  });

  test("1 parameter missing", () => {
    expect(() => register.getPersonNumbersByType("Leila", "Hökki")).toThrow(
      "missing parameter"
    );
  });
  test("2 parameter missing", () => {
    expect(() => register.getPersonNumbersByType("Leila")).toThrow(
      "missing parameter"
    );
  });
  test("All parameters missing", () => {
    expect(() => register.getPersonNumbersByType()).toThrow(
      "missing parameter"
    );
  });

  describe("Test 5: testing empty string as type using modified data", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "87654421" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "0287604" }],
      },
    ];
    test('Test firstname:Leila, lastname:Hökki and type "" ', () => {
      const modifiedregister = new PhoneRegister(testData);
      expect(
        modifiedregister.getPersonNumbersByType("Leila", "Hökki", "")
      ).toEqual(["87654421"]);
    });
  });

  describe("Testing getAllNumbersByType", () => {
    describe("Test with default data", () => {
      const register = new PhoneRegister(phones);

      test("Testing type:work with default data", () => {
        const expectedResult = [
          {
            firstname: "Leila",
            lastname: "Hökki",
            number: { type: "work", tel: "87654421" },
          },
          {
            firstname: "Leila",
            lastname: "Hökki",
            number: { type: "work", tel: "0987654" },
          },
          {
            firstname: "Matt",
            lastname: "River",
            number: { type: "work", tel: "0287604" },
          },
        ];
        expect(register.getAllNumbersByType("work")).toEqual(expectedResult);
      });

      test("Testing type:mobile", () => {
        const expectedResult = [
          {
            firstname: "Matt",
            lastname: "River",
            number: { type: "mobile", tel: "07654420" },
          },
        ];

        expect(register.getAllNumbersByType("mobile")).toEqual(expectedResult);
      });

      test("Testing type:x", () => {
        expect(register.getAllNumbersByType("x")).toEqual([]);
      });

      test('Testing type: ""', () => {
        expect(register.getAllNumbersByType("")).toEqual([]);
      });

      test("Testing missing parameter", () => {
        expect(() => register.getAllNumbersByType()).toThrow(
          "missing parameter"
        );
      });
    });
  });

  describe("Testing with modified data", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "87654421" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "0287604" }],
      },
    ];

    test('Testing type " "', () => {
      const register = new PhoneRegister(testData);
      const expectedResult = [
        {
          firstname: "Leila",
          lastname: "Hökki",
          number: { type: "", tel: "87654421" },
        },
      ];

      expect(register.getAllNumbersByType("")).toEqual(expectedResult);
    });
  });
});

describe("Test cases of getAllNumbers", () => {
  test("Testing with default data", () => {
    const register = new PhoneRegister(phones);
    expect(register.getAllNumbers()).toEqual(phones);
  });

  test("Testing some phones missing", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "87654421" },
          { type: "work", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "87654421" },
          { type: "work", number: "0987654" },
        ],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual(expectedResult);
    // expect(register.getAllNumbers()).toEqual(testData[0]);
  });

  test("Testing some phones missing 2", () => {
    const testData = [
      {
        firstname: "Vera",
        lastname: "River",
        phones: [],
      },
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "87654421" },
          { type: "work", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "work", number: "87654421" },
          { type: "work", number: "0987654" },
        ],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual(expectedResult);
  });

  test("Testing all phones missing", () => {
    const testData = [
      {
        firstname: "Vera",
        lastname: "River",
        phones: [],
      },
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [],
      },
    ];

    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual([]);
  });

  test("Testing all persons missing", () => {
    const register = new PhoneRegister([]);
    expect(register.getAllNumbers()).toEqual([]);
  });

  test("Testing with empty type", () => {
    const testData = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "87654421" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Vera",
        lastname: "River",
        phones: [],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "0287604" }],
      },
    ];
    const expectedResult = [
      {
        firstname: "Leila",
        lastname: "Hökki",
        phones: [
          { type: "home", number: "12345678" },
          { type: "", number: "87654421" },
          { type: "home", number: "0987654" },
        ],
      },
      {
        firstname: "Matt",
        lastname: "River",
        phones: [{ type: "work", number: "0287604" }],
      },
    ];
    const register = new PhoneRegister(testData);
    expect(register.getAllNumbers()).toEqual(expectedResult);
  });
});

describe("Test cases of getName", () => {
  const register = new PhoneRegister(phones);

  test('Test getName for number "12345678"', () => {
    expect(register.getName("12345678")).toEqual({
      "firstname": "Leila",
      "lastname": "Hökki",
    });
  });

  const testValues = [
    //number         expectedResult
    ["0987654", { "firstname": "Leila", "lastname": "Hökki" }],
    ["0287604", { "firstname": "Matt", "lastname": "River" }],
  ];

  test.each(testValues)("number %s returns %p", (number, expectedResult) => {
    expect(register.getName(number)).toEqual(expectedResult);
  });

  test("testing wrong number", () => {
    expect(register.getName("0000")).toBeNull();
  });

  test("testing missing parameter", () => {
    expect(register.getName()).toBeNull();
  });
});
