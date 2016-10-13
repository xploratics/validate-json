var httpError = require('http-errors');
var ajv = require('ajv')({
    allErrors: true,
    removeAdditional: true
});

exports.compile = function (schema) {
    var validator = ajv.compile(schema);

    return function validateSchema(data) {
        var valid = validator(data);
        return new AjvValidationResult(valid, validator.errors);
    };
};

exports.compileJit = function (schema) {
    var validator;

    return function validateSchema(data) {
        if (!validator)
            validator = exports.compile(schema);
        return validator(data);
    }
};

function AjvValidationResult(valid, errors) {
    this.valid = valid;
    this.errors = errors;
}

AjvValidationResult.prototype.throwErrorsIfAny = function () {
    if (!this.valid) {
        var msg = '';

        for (var i = 0; i < this.errors.length; i++)
            msg += '\n' + this.errors[i].message;

        throw httpError(400, msg.trim());
    }
};