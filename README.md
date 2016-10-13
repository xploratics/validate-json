[![Build Status](https://travis-ci.org/xploratics/xp-validate-json.svg)](https://travis-ci.org/xploratics/xp-validate-json)
[![dependencies Status](https://david-dm.org/xploratics/xp-validate-json/status.svg)](https://david-dm.org/xploratics/xp-validate-json)
[![devDependencies Status](https://david-dm.org/xploratics/xp-validate-json/dev-status.svg)](https://david-dm.org/xploratics/xp-validate-json?type=dev) 

# xp-validate-json
Validate json using [ajv](https://github.com/epoberezkin/ajv) and allow to 
throws [http errors](https://github.com/jshttp/http-errors) if the validation fail.

## Installation

```bash
npm install xp-validate-json
```

## Usage

Validate and remove extra properties directly

```js
var validateJson = require('xp-validate-json');

// validation rules, see ajv
var schema = {
    additionalProperties: false,
    required: ['p1'],
    properties: {
        p1: {
            type: 'string'
        }
    }
};

// compile the schema
var validate = validateJson.compileJit(schema);

// validate and throw http 400 error if the schema is not correct;
validate({ p1: '123' }).throwErrorsIfAny();
```


## License
[The MIT License](./License)