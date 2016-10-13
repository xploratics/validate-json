var expect = require('chai').expect;
var update = require('../').update;
var path = './test/patches';
var compile = require('../').compileJit;

var func = compile({
    additionalProperties: false,
    required: ['p1'],
    properties: {
        p1: {
            type: 'string'
        }
    }
});

describe('throwErrorsIfAny', function () {
    it('should not throw if no errors', function () {
        func({ p1: '123' }).throwErrorsIfAny();
    });

    it('should throw 400 (bad request errors)', function () {
        var ex;
        try {
            func({ p2: '123' }).throwErrorsIfAny();
        } catch (e) {
            ex = e;            
        }

        expect(ex.status).to.eql(400);
        expect(ex.message).to.be.a('string');
    });
});