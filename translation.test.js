const LambdaTester = require('lambda-tester');
const lambda = require('./index');
const expect = require('expect');

test('should return translation', () => {
return LambdaTester( lambda.handler )
    .event({text: 'mom', target:'ko'})
    .expectResult( result => {
        expect( result.translation.length ).toEqual(1);
    });
});

test('should return multiple translation', () => {
return LambdaTester( lambda.handler )
    .event({text: ['supercalifragilisticexpialidocious','help','mom','아빠', '엄마'], target: 'ko'})
    .expectResult( result => {
        expect( result.translation.length ).toEqual(5);
    });
});

test('should fail without target language', () => {
return LambdaTester( lambda.handler )
    .event({text: ''})
    .expectError( result => {
        expect(result.message).toBeDefined();
    });
});