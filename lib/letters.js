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
    index = this.items.length + (index % this.items.length);
  }
  return this.items[index]
}

//http://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
letters.shuffle = function(letters){
  var a = letters.split(""),
  n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

module.exports = letters;
