'use strict';

module.exports = class PhoneRegister{
    #register
    constructor(data){
        if(!data) throw new Error('phone data missing');
        this.#register=data;

    }

    getTypes(){
        const foundTypes =[];
        for(const person of this.#register){
            for(const phone of person.phones){
                if(!foundTypes.includes(phone.type)){
                    foundTypes.push(phone.type);
                }

            }
        }
        return foundTypes;

    }

    getPersonNumbersByType(firstname,lastname,type){
        if(arguments.length<3){
            throw new Error('missing parameter');
        }
        // if(firstname && lastname && (type || type:""){
            const numbersFound =[];
            for(const person of this.#register){
                if(person.firstname===firstname && person.lastname===lastname){
                    for(const phone of person.phones){
                        if(phone.type===type){
                            numbersFound.push(phone.number)
                        }
                    }
                }
            }
            return numbersFound;
        // } else{
        //     throw new Error('missing parameter')
        // }
    }
    getAllNumbersByType(type){
        if(arguments.length<1){
            throw new Error('missing parameter');
        }
        const numbersFound = [];

        for(const person of this.#register){
            for(const phone of person.phones){
                if(phone.type===type){
                    numbersFound.push({
                        firstname:person.firstname,
                        lastname:person.lastname,
                        number:{
                            type:phone.type,
                            tel:phone.number
                        }
                    });
                }
            }
        }
        return numbersFound;

    };
}