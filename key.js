var Letters   = require('./letters');
var Signature = require('./signature');
var opts = require('./config');

Letters  = new Letters(opts.letters);

var key = function(){
  this.numbers = Letters.rand(10, {unique: true});
  this.tail    = Letters.rand(opts.tail_length, {exclude: this.numbers});
  this.secret  = this.numbers+this.tail;
  this.letters = Letters;
}

key.prototype.sign = function(message){
  var signature = new Signature(this);
  return signature.string+obscure(message, signature)
}

key.prototype.decode = function(str){
  var signature = new Signature(this);
  signature.read(str);
  return decode(str, signature);
}

key.FromSecret = function(secret){
  var key = new Key();
  key.numbers = secret.substr(0, 10);
  key.tail = secret.substr(10, secret.length);
  key.secret = secret;
  return key
}

function decode(message, signature){
  var msg = message.substr(signature.letter_width+3, message.length - signature.letter_width-3);
  var letters = [];
  while(letters.length < msg.length / signature.letter_width){
    letters.push(
      value_of(msg.substr(signature.letter_width*letters.length, signature.letter_width), signature, letters.length)
    );
  }
  return letters.join(''); 
}

function value_of(msg, sig, internal_offset){
  var relevant_character = msg.charAt(sig.relevant_character);
  return Letters.translate(Letters.indexOf(relevant_character)-sig.offset - internal_offset)
}

function obscure(message, signature){
  var result = '';
  var item;
  var loc;
  for(letter in message){
    item = '';
    // find the location of this letter in the shared alphabet
    loc = Letters.indexOf(message[letter]); 
    // offset the letter by the translation in the config
    loc = loc+signature.offset+parseInt(letter);
    // find the letter that corresponds to the offset
    loc = Letters.translate(loc);

    // pad the letter with noise if desired
    if(signature.letter_width>1){
      item = Letters.rand(signature.letter_width-1);
    }

    // add the translated letter to the result
    result += item.slice(0, signature.relevant_character) +
      loc +
      item.slice(signature.relevant_character);
  }

  // return the result
  return result;
}

module.exports = key;
