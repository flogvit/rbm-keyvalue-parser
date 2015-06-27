/**
 * Created by flogvit on 2015-06-25.
 *
 * @copyright Cellar Labs AS, 2015, www.cellarlabs.com, all rights reserved
 * @file
 * @license GPL-3.0
 * @author Vegard Hanssen <Vegard.Hanssen@cellarlabs.com>
 *
 */

/**
 *
 * @class
 * @classdesc
 */
function ParserString(text) {
  this.originalText = text;
  this.parts = this.parse(text);
}

ParserString.prototype.parse = function(text) {
  text += ' '; // Easy way of hitting that char===' ' as last and not needing to check after for loop
  var result = [];
  var inKey = true;
  var inQuote = false;
  var params = [''];
  var keys = undefined;
  for(var pos=0;pos<text.length;pos++) {
    var char = text.charAt(pos);
    if (inQuote && char!=='"') {
      params[params.length-1] += char;
      continue;
    }
    if (char==='"') {
      inQuote = !inQuote;
      continue;
    }
    if (char===',') {
      params.push('');
      continue;
    }

    if (char==='=') {
      keys = params;
      inKey = false;
      params = [''];
      continue;
    }
    if (char===' ') {
      if (inKey) {
        keys = params;
        params = undefined;
      }
      if (params && params.length===1)
        params = params[0];
      if (keys) {
        keys.forEach(function(key) {
          result.push([key,params]);
        })
      }
      params = [''];
      inKey = true;
      keys = undefined;
      continue;
    }

    params[params.length-1] += char;
  }
  return result;
}

ParserString.prototype.next = function() {
  return this.parts.length>0 ? this.parts.shift() : null;
}

ParserString.prototype.peek = function() {
  return this.hasNext() ? this.parts[0] : null;
}

ParserString.prototype.hasNext = function() {
  return this.parts.length>0;
}

ParserString.prototype.getParts = function() {
  return this.parts;
}

ParserString.prototype.text = function() {
  return this.originalText;
}

module.exports = ParserString;
