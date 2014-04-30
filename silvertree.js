var data = {
passages:[
'There was a great silver tree that burst forth from the center of the field and its branches rose high into the night sky. Its leaves sparkled and seemed to merge with the twinkling stars. The field was spotted with tiny red flowers that glowed faintly in the moonlight, and the chorus of chirping betrayed the hundreds of frogs that nestled beneath the grasses and wildflowers.',
'She told me that the tree was a symbol for our people, but that it only had meaning as long as our people were alive. It was a kind of contract, she explained, where we shared part of our spirit with the tree, and in return the tree gave us a part of its power. The tree was gaurded by a family of white birds who lived in the crown. The village determines the rightness of their ways by looking for the birds. If the birds start making themselves visible to us, it is a bad sign and we must change our ways.',
'Once, a villager proclaimed himself shaman and declared that the red flowers that grew around the tree were medicine that could cure any illness. Despite the protests of our village elders, he set off to gather up the flowers. When he didn\'t return, a group of villagers set out to find him. They discovered his half eaten corpse lying in the field near the tree, a small bag of flowers still in his left hand.',
'She said that the rivers of warm and cold air moved over the earth as they followed the patterns etched into the sky by the stars. Its like a great blanket that wraps the world, and as the images of different animals flow over the land, the elements chase after them like swarms of faithful servants. As the wolf rises above the horizon in the west, the cold winds begin to howl.',
'The record keeping of the village is distributed between the artisans with one kind of record being integrated with one industry. The weavers weave dances and rituals into the tapestries that hang on the walls and on the bodies of the people. The flute carvers carve traditional poems and stories in a tight sprial around the flutes.The laws are etched by axe onto the beams that support the halls where councils are held. History is not recorded for they believe that their bodies themselves are a historical record, preserving the past and carrying it into the future.',
'When the image of the bird that protects the silver tree reached the center of the night sky the people would divert their water source to flood the courtyard in the center of the village. That night the stars would all be reflected in the water and it was impossible to differentiate the ground from the sky, except for the feeling of being held down to the one by gravity. The weavers would then lead the villagers in the traditional dance for the occasion, which had the effect of removing the feeling of gravity and making one feel as if she were floating in space.'
],
ids: ['The Tree','A Symbol','Falsehood','Stars','Records','Flood']
}

function createJumble() {
  var eraser = document.getElementById('jumble-box');
  if(eraser) { eraser.parentNode.removeChild(eraser); }

	var results = [];
	for(var i = 0; i<5 ; i++) {
    var choose = Math.floor(Math.random()*6);
    var passage = data.passages[choose];
		passage = passage.split('.');
		passage = noEmpty(passage);
		var select = Math.floor(Math.random() * passage.length);
		results.push(passage[select] + '. ');
  }

	var box = document.getElementById('bottom-box');
	var jumble = document.createElement('div');
  jumble.setAttribute('id', 'jumble-box');
  box.appendChild(jumble);

	forEach(results, function(line, i) {
		var current = document.createElement('span')
		current.setAttribute("id", i.toString())
    current.setAttribute("class", "jumbled-line")
		current.innerText = line;
    current.onmouseover = function() {
      this.style.color = "red";
      this.style.cursor = "pointer";
    }
    current.onmouseout = function() {
      this.style.color = "black"; 
    }
    current.onclick = function() {
      var text = this.innerText;
      var data = getNumber(text);
      var tags = document.querySelectorAll('p');
      forEach(tags, function(tag, i) {
        var num = tag.getAttribute('class');
        num = parseInt(num);
        if(i === data.passage && num === data.Index) {
          var addition = document.createElement('span');
          addition.innerText = text;
          tag.appendChild(addition);
          var newClass = (num+1).toString();
          tag.setAttribute('class', newClass);
        }
      })
    };
		jumble.appendChild(current);
	})
}

function makeList() {
	forEach(data.passages, function(passage, i) {
		var box = document.getElementById('top-box');
		tag = document.createElement('p');
    tag.setAttribute('class', '0');
		tag.innerText = data.ids[i]+': '
		box.appendChild(tag);
	})
}

function getNumber(line) {
  line = clean(line);
  var results = {passage: null, Index: null};
  forEach(data.passages, function(passage, i) {
    if(passage.indexOf(line) !== -1) {
      results.passage = i;
      passage = passage.split('.');
      passage = noEmpty(passage);
      forEach(passage, function(sentence, k) {
        sentence = clean(sentence);
        if(sentence == line) {
          results.Index = k;
          return;
        }
      })
    }
  })
  return results;
}

function forEach(array, fn) {
	for(var i = 0; i < array.length; i++) {
		fn(array[i], i);
	}
}

function clean(line) {
  if(!(/[A-Z]/).test(line[0])) {
    line = line.substring(1, line.length);
  }
  if(!(/[a-z]/).test(line[line.length-1])) {
    line = line.substring(0, line.length-1)
  }
  if(!(/[A-Z]/).test(line[0]) || !(/[a-z]/).test(line[line.length-1])) {
    return clean(line);
  } else {
    return line;
  }
}

function noEmpty(array) {
	var results = [];
	forEach(array, function(item) {
		if(item !== '' && item !== ' ') {
			results.push(item);
		}
	})
	return results;
}

window.onload = function() {
	makeList();
	createJumble();
  var switcher = document.getElementById('switch');
  switcher.onclick = function() {
    createJumble();
  }
}