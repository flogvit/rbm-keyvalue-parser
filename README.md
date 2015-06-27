# rbm-keyvalue-parser

Easy string parser of keys/values

[![Build Status](https://travis-ci.org/flogvit/rbm-keyvalue-parser.png)](https://travis-ci.org/flogvit/rbm-keyvalue-parser)

Usage:

```javascript
var Parser = require('rbm-keyvalue-parser');

var ps = new Parser('your text');
console.log(ps.getParts());
// output
var res = [ 
  ['your', undefined], 
  ['text', undefined] 
]

```

You also have some other methods you can use

```javascript
var ps = new Parser('your text');
ps.next() // ['your', undefined] and we slurp the entry
ps.next() // ['text', undefined] we get the next one

var ps = new Parser('your text');
ps.peek() // ['your', undefined]; we don't slurp the entry
ps.next() // ['your', undefined]; we get the same
```

The module parses key/value with multiple keys and values.
So you can do

```javascript
var ps = new Parser('foo,bar="your text",bar');
console.log(ps.getParts());
// output
var res = [ 
  ['foo', ['your text', 'bar'] ], 
  ['bar', ['your text', 'bar'] 
]

```

Other parses

```javascript
//Little brown="and yellow" fox=1 jumps over=lazy dog
var res = [ 
  [ 'Little', undefined ],
  [ 'brown', 'and yellow' ],
  [ 'fox', '1' ],
  [ 'jumps', undefined ],
  [ 'over', 'lazy' ],
  [ 'dog', undefined ] 
]
  
//foo list="foo bar","bar bar" fox="bar,bar" fox=1 foo=bar,foo fox="bar bar",foo fox=foo,"bar bar" foo,bar foo,bar="test test",bar
var res = [ 
  [ 'foo', undefined ],
  [ 'list', [ 'foo bar', 'bar bar' ] ],
  [ 'fox', 'bar,bar' ],
  [ 'fox', '1' ],
  [ 'foo', [ 'bar', 'foo' ] ],
  [ 'fox', [ 'bar bar', 'foo' ] ],
  [ 'fox', [ 'foo', 'bar bar' ] ],
  [ 'foo', undefined ],
  [ 'bar', undefined ],
  [ 'foo', [ 'test test', 'bar' ] ],
  [ 'bar', [ 'test test', 'bar' ] ] 
]

// foo bar" bar,"foo bar"=1 bar,"foo bar"=bar,"foo bar"
var res = [
  ['foo bar', undefined],
  ['bar', '1'],
  ['foo bar', '1'],
  ['bar', ['bar', 'foo bar']],
  ['foo bar', ['bar', 'foo bar']]
]
```
