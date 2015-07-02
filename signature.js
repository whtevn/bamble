var Letters = require('./letters');
var opts = require('./config');
var Key    = require('./key');

Letters  = new Letters(opts.letters);

var sig = function(key){
  this.letter_width       = opts.letter_width;
  this.relevant_character = Math.floor(Math.random() * this.letter_width);
  this.offset             = Math.floor(Math.random() * 10);
  this.string             = obscure(this, key);
  this.numbers            = key.numbers;
}

sig.prototype.read = function(signature){
  var relevant_character = signature.substr(this.letter_width, 1);
  var offset = signature.substr(this.letter_width+2, 1);

  this.offset = this.numbers.indexOf(offset);
  this.relevant_character = this.numbers.indexOf(relevant_character);

  return this
}

function obscure(signature, key){
  var begin_signature = key.letters.rand(signature.letter_width, {
              exclude: key.numbers
            }) 

  var relevant_character = key.numbers[signature.relevant_character];
  var offset = key.numbers[signature.offset];

  return begin_signature +
      relevant_character    +
      key.letters.rand(1)    +
      offset
}



module.exports = sig;
