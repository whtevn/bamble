var letters = function(items){
  this.items = items;
}

letters.prototype.choose = function(opts){
  var chosen = this.items.charAt(Math.floor(Math.random() * this.items.length));
  if(opts && opts.exclude && opts.exclude.indexOf(chosen) >= 0){
    return this.choose(opts)
  }else{
    return chosen
  }
}

letters.prototype.indexOf = function(letter){
  return this.items.indexOf(letter);
}

letters.prototype.rand = function(length, opts){
  var str = '';
  while(str.length < length){
    if(opts && opts.unique){
      opts.exclude = str;
    }
    str+=this.choose(opts);
  }
  return str;
}

letters.prototype.translate = function(index){
  if(index >= this.items.length){
    index =  index % this.items.length;
  }
  if(index < 0){
    index = index + this.items.length;
  }
  return this.items[index]
}

module.exports = letters;
