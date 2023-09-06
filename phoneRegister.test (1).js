'use strict';

const PhoneRegister = require('../phoneRegister');
const phones = require('../phones.json');

describe('Testing constructor', ()=>{
    test('Missing parameter throws an exception', ()=>{
        expect(() => new PhoneRegister()).toThrow('phone data missing');
    });
});

describe('Testing getTypes', ()=>{
    test('getType from default data json',()=>{
        const register=new PhoneRegister(phones);
        expect(register.getTypes()).toEqual(['home','work','mobile']);
    });

    test('getType from default data json', () => {
        const register = new PhoneRegister(phones);
        const expectedResult = ['home', 'work', 'mobile'];

        expect(register.getTypes()).toEqual(expectedResult);
    });

    test('getType with empty type in modified data json',()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "", "number": "87654321" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "work", "number": "2468159" }
                ]
            }
        ];
        const expectedResult = ["home", "", "work"];
        const register=new PhoneRegister(testData);
        expect(register.getTypes()).toEqual(expectedResult);
    });

    test('Only home phones', ()=>{
        const testData = [
            {
                "firstname": "Leila",
                "lastname": "Hökki",
                "phones": [
                    { "type": "home", "number": "12345678" },
                    { "type": "home", "number": "05040302" }
                ]
            },
            {
                "firstname": "Matt",
                "lastname": "River",
                "phones": [
                    { "type": "home", "number": "2468159" }
                ]
            }
        ];

        const register=new PhoneRegister(testData);
        expect(register.getTypes()).toEqual(['home']);
    });

    test('person have no phones',()=>{
        const testData = [
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
        const register=new PhoneRegister([]);
        expect(register.getTypes()).toEqual([]);
    });
});

describe('Testing getPersonsNumbersByType',()=>{
    const register=new PhoneRegister(phones);

    describe('Tests 1-3',()=>{
        const testValues=[
            //fn        ln       type       result
            ['Leila', 'Hökki', 'work', ["87654321", "05040302"]],
            ['Matt', 'River', 'mobile', ["040981265"]],
            ['Matt', 'River', 'x', []],
            ['Matt', 'x', 'mobile', []],
            ['x', 'River', 'mobile', []]
        ];

        test.each(testValues)('%s, %s, %s returns %s',(fn,ln,type,result)=>{
            expect(register.getPersonsNumbersByType(fn,ln,type)).toEqual(result);
        });
    });

    
});