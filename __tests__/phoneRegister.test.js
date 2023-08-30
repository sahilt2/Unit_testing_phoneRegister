'use strict';
const PhoneRegister = require('../phoneRegister');
const phones = require('../phones.json');

describe('Testing constructor',()=>{
    test('Missing parameter throws an exception',()=>{
        expect(()=>new PhoneRegister()).toThrow('phone data missing')
    })
    
});

describe(' Testing getType', ()=>{
    test('getType from default data json',()=>{
        const register = new PhoneRegister(phones);
        // const expectedResult = ["home", "work", "mobile"];
        // expect(register.getTypes()).toEqual(expectedResult);
        expect(register.getTypes()).toEqual(["home", "work", "mobile"]);
    });

    test('getType with empty type in modified data json',()=>{
        // we can also create a modified json file separately and require here
        const testData = [
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
          ];
          const expectedResult = ["home", "", "work"];
          const register=new PhoneRegister(testData);
          expect(register.getTypes()).toEqual(expectedResult);

    });

    test('Only home phones',()=>{
        const testData= [
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
          ];
          const register= new PhoneRegister(testData);
          expect(register.getTypes()).toEqual(["home"]);
    });

    test('Person have no phones',()=>{
        const testData=[
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
          ];
          const register=new PhoneRegister(testData);
          expect(register.getTypes()).toEqual([]);

    });
    
    test('No persons',()=>{
        // const testData =[];
        // const register=new PhoneRegister(testData);
        const register=new PhoneRegister([]);
        expect(register.getTypes()).toEqual([])
    })
});

describe('Testing getPersonNumberByType',()=>{
    const register = new PhoneRegister(phones);

    describe('Test 1-3',()=>{
    const testValues = [
        // fn      ln      type      expectedResult
        ['Leila','Hökki','work',['87654421', '0987654']]
        ['Matt','River','mobile',['07654420']],
        ['Matt','River','x',[]],
        ['Matt','x','mobile',[]],
        ['x','River','mobile',[]],
        ['Matt','River','',[]]
    ];

        test.each('%s,%s,%s returns %s', (fn, ln, type, expectedResult) => {
        expect(register.getPersonNumbersByType(fn,ln,type)).toEqual(expectedResult);
        });
    });

    test('should throw an exception when at least one parameter is missing', () => {
        expect(() => register.getPersonNumbersByType('Leila', 'Hökki')).toThrow('missing parameter');
        expect(() => register.getPersonNumbersByType('Leila')).toThrow('missing parameter');
        expect(() => register.getPersonNumbersByType()).toThrow('missing parameter');
    });
});
