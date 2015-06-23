var piglatinator = function(input) {

	convertString = function(inputString) {
		
		var outputString = inputString;
		if ( !testEndString(inputString, 'way') ){
			if ( /[aeiou]/.test(inputString.charAt(0)) ) {
                outputString = inputString + 'way';
            } 
			else if ( /[bcdfghjklmnpqrstvxzwy]/.test(inputString.charAt(0)) ) {
                outputString = inputString.substr(1) + inputString.charAt(0) + 'ay';
            }
		}

		return outputString;
	};

	testEndString = function(inputString, word) {
		var last = inputString.substr(inputString.length - word.length);

		if (last === word){
			return true;
		} else {
			return false;
		}
	};

	restoreCase = function(inputString, originalString) {
		var outputString = inputString;
		var caseMap = getCaseMap(originalString);

		caseMap.forEach(function(isUpper, index) {
			if (isUpper) {
				outputString = charToUpper(outputString, index);
			}
		});

		return outputString;
	};

	getCaseMap = function(inputString) {
		var caseMap = [];
		var characters = inputString.split('');

		for (var i = 0; i < characters.length; i++) {
            if (characters[i] === characters[i].toUpperCase()
                 && characters[i] !== characters[i].toLowerCase()) {
                caseMap[i] = true;
            }
		}

		return caseMap;
	};

	charToUpper = function(inputString, index) {
		return inputString.substr(0, index) + inputString.charAt(index).toUpperCase() + inputString.substr(index + 1);
	};

	insertCharAt = function(inputString, character, index) {
		if (index > 0) {
			return inputString.substring(0, index) + character + inputString.substring(index, inputString.length);
		} else {
			return character + inputString;
        }
	};

	restorePunctuation = function(inputString, originalString) {
		var restoredString = inputString;
		var regExpMap = new RegExp('[^a-zA-Z\d\s:]');
		var regExpStrip = new RegExp('[^a-zA-Z\d\s:]', '\g');
		var punctuationMap = getPunctuationMap(originalString, regExpMap);
		var strippedString = inputString.replace(regExpStrip,'');
		var lengthDiff = strippedString.length - originalString.replace(regExpStrip,'').length;

		if (strippedString !== originalString) {
			punctuationMap.forEach(function(punctuation, index) {
				strippedString = insertCharAt(strippedString, punctuation, index + lengthDiff);
			});
			restoredString = strippedString;
		}

		return restoredString;
	};

	getPunctuationMap = function(inputString, regExp) {
        var punctuationMap = [];
		var characters = inputString.split('');

		characters.forEach(function(character, index) {
			if ( regExp.test(character) ) {
                punctuationMap[index] = character;
            }
		});

		return punctuationMap;
	};

	convert = function(inputString) {
		var outputString = null;
		var words = inputString.split(' ');

		words.forEach(function(word, index) {
			var strings = word.split('-');
			
			strings.forEach(function(string, index) {
				var originalString = string;
				string = convertString(string.toLowerCase());
				string = restoreCase(string, originalString);
				string = restorePunctuation(string, originalString);
				strings[index] = string;
			});

			words[index] = strings.join('-');	
		});

		outputString = words.join(' ');	
		return outputString;
	};

	return convert(input);
};

var in1 = prompt('type something');
alert(piglatinator(in1));