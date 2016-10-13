var expect = require('chai').expect;
var update = require('../').update;
var path = './test/patches';
var compile = require('../').compileJit;
var func;

describe('compileJit', function () {
    it('should returns a function', function () {
        func = compile({
            additionalProperties: false,
            required: ['p1'],
            properties: {
                p1: {
                    type: 'string'
                }
            }
        });
        expect(func).to.be.a('function');
    });

    it('should be valid with no errors', function () {
        var r = func({
            p1: '123'
        });
        expect(r.valid).to.be.true;
        expect(r.errors).to.be.null;
    });

    it('should be not valid with errors', function () {
        var r = func({
            p2: '123'
        });
        expect(r.valid).to.be.false;
        expect(r.errors).to.be.instanceof(Array);
        expect(r.errors.length).to.eql(1);
    });
});