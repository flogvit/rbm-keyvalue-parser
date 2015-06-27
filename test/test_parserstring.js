/**
 * Created by flogvit on 2015-06-25.
 *
 * @copyright Cellar Labs AS, 2015, www.cellarlabs.com, all rights reserved
 * @file
 * @license GPL-3.0
 * @author Vegard Hanssen <Vegard.Hanssen@cellarlabs.com>
 *
 */

require('should');
require('assert');
var _ = require('underscore');

var ParserString = require('../index.js');

describe('Check ParserString', function () {
  var its = {
    'foo': [
      ['foo', undefined]
    ],
    'foo.list': [
      ['foo.list', undefined]
    ],
    'foo-bar.list': [
      ['foo-bar.list', undefined]
    ],
    'foo-bar.list-bar': [
      ['foo-bar.list-bar', undefined]
    ],
    'foo_bar.list': [
      ['foo_bar.list', undefined]
    ],
    'foo.list add': [
      ['foo.list', undefined],
      ['add', undefined]
    ],
    'foo.list add=bar': [
      ['foo.list', undefined],
      ['add', 'bar']
    ],
    'foo.list add-foo=bar': [
      ['foo.list', undefined],
      ['add-foo', 'bar']
    ],
    'foo.list add.foo=bar': [
      ['foo.list', undefined],
      ['add.foo', 'bar']
    ],
    'foo.list add_foo=bar': [
      ['foo.list', undefined],
      ['add_foo', 'bar']
    ],
    'foo.list add_foo=bar.bar': [
      ['foo.list', undefined],
      ['add_foo', 'bar.bar']
    ],
    'foo.list add_foo=bar-bar': [
      ['foo.list', undefined],
      ['add_foo', 'bar-bar']
    ],
    'foo.list add_foo=bar_bar': [
      ['foo.list', undefined],
      ['add_foo', 'bar_bar']
    ],
    'foo.list add_foo="bar bar"': [
      ['foo.list', undefined],
      ['add_foo', 'bar bar']
    ],
   'foo list=foo,bar': [
      ['foo', undefined],
      ['list', ['foo', 'bar']]
    ],
    'foo list="foo bar","bar bar"': [
      ['foo', undefined],
      ['list', ['foo bar', 'bar bar']]
    ],
    'list=foo bar foo=bar - list=bar': [
      ['list', 'foo'],
      ['bar', undefined],
      ['foo', 'bar'],
      ['-', undefined],
      ['list', 'bar']
    ],
    'list=foo bar foo=bar bar bar=foo + list=bar bar foo=foo': [
      ['list', 'foo'],
      ['bar', undefined],
      ['foo', 'bar'],
      ['bar', undefined],
      ['bar', 'foo'],
      ['+', undefined],
      ['list', 'bar'],
      ['bar', undefined],
      ['foo', 'foo']
    ],
    'Little brown="and yellow" fox=1 jumps over=lazy dog': [
      ['Little', undefined],
      ['brown', 'and yellow'],
      ['fox', '1'],
      ['jumps', undefined],
      ['over', 'lazy'],
      ['dog', undefined]
    ],
    'foo list="foo bar","bar bar" fox="bar,bar" fox=1 foo=bar,foo fox="bar bar",foo fox=foo,"bar bar" foo,bar foo,bar="test test",bar': [
      ['foo', undefined],
      ['list', ['foo bar', 'bar bar']],
      ['fox', 'bar,bar'],
      ['fox', '1'],
      ['foo', ['bar', 'foo']],
      ['fox', ['bar bar', 'foo']],
      ['fox', ['foo', 'bar bar']],
      ['foo', undefined],
      ['bar', undefined],
      ['foo', ['test test', 'bar']],
      ['bar', ['test test', 'bar']]]
  }

  _.keys(its).forEach(function (parse) {
    it('should understand "' + parse + '"', function (done) {
      var ans = its[parse];
      var ps = new ParserString(parse);
      ps.getParts().should.eql(ans);
      done();
    })
  })

});
