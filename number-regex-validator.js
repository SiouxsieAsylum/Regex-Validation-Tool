(function(){///////////////////////////////// START AND END OF STRING /////////////////////////////

  // Regex should start with ^ end with $ to ensure the entirety of input is valid
     console.log(regex + " starts with ^ - " + regex.startsWith("^"))
     console.log(regex + " ends with $ - " + regex.endsWith("$"))

  ///////////////////////////////// BRACKET / PARENS ///////////////////////////////////

  // Brackets and parens need to match in count to ensure capture groups, limits and character classes are closed 
    var acceptableBrackets = {
      "\\(": "\\)",
      "\\[": "\\]",
      "\\{": "\\}"
    };

    var bracketsMatch = true;

    var startBrackets = Object.keys(acceptableBrackets);
    var bracketCounter = {}

    for (var starter of startBrackets) {
      var startReg = new RegExp(starter, "g");
    // Save for later in the process when we need to validate limits
      if (starter === '\\{') limitReg = startReg;
      var starterSet = regex.match(startReg);
      bracketCounter[starter] = starterSet && starterSet.length || 0;

      var partner = acceptableBrackets[starter];
      var endReg = new RegExp(partner, "g");
      var enderSet = regex.match(endReg)
      bracketCounter[partner] = enderSet && enderSet.length || 0;

      if (bracketCounter[partner] !== bracketCounter[starter]) bracketsMatch = false;
    }

    console.log(regex + " has matching brackets - " + bracketsMatch)
  /////////////////////////////////////// DIGITS ////////////////////////////

  // regexes should have a digit in them
    console.log(regex + " includes at least one \\d - " + regex.includes("\\d"))

   // . is regex for any character, so it much be escaped into an actual decimal point 
    var periodWasEscaped = false;
    var periodIndex = regex.indexOf(".");
    if (!periodIndex) { 
      periodWasEscaped = 'not applicable'; 
    } else {
      var escapedPeriod = regex.slice(periodIndex - 1, periodIndex + 1);
      periodWasEscaped = periodIndex && !!escapedPeriod.match(/^\\.$/);
      console.log(regex + " escapes the period - " +  periodWasEscaped)
    }


  if (escapedPeriod) {
    var periodInsideParens = false;
    var precedingPeriod = regex.substring(periodIndex - 3, periodIndex - 1);
    if (precedingPeriod === "0]") {
      periodInsideParens = true
    } else if (precedingPeriod[1] === "(") {
      periodInsideParens = true
    }
    console.log(regex + " . should be inside parenthases - " + periodInsideParens);

    var followedByDigit = false;
    var followingPeriod = regex.substring(periodIndex + 1, periodIndex + 3);

    if (followingPeriod === '\\d') followedByDigit = true;
    console.log(regex + " . should only precede digits - " + followedByDigit)

  }

  ///////////////////////////// LIMITS ON NUM OF DIGITS ///////////////////////////
  var limitMatch;
  while ((limitMatch = limitReg.exec(regex)) !== null) {
    // should only limit digits
    var precededByDigit = false; 
    var limitIndex = limitMatch.index; 
    var precedingLimit = regex.substring(limitIndex - 2, limitIndex);
    if (precedingLimit === '\\d') precededByDigit = true;
    console.log(regex + " should only limit digits - " + precededByDigit)

    //if a limit doesn't start with zero it won't allow you to type
    var followedByZero = false;
    var startOfLimit = regex.substring(limitIndex + 1, limitIndex + 2);
    if (parseInt(startOfLimit) === 0) followedByZero = true;
    console.log(regex + " limit should start with zero - " + followedByZero)

  };


  ///////////////////////////// OPTIONAL CRITERIA  /////////////////////////////////////

    // the only selectors that can be optional are: -, which means negative numbers, or a caturing group in parens (  ), such as an optional decimal
    var questionMarkMatch = /\?/g;
    var questionMatch;
    while ((questionMatch = questionMarkMatch.exec(regex)) !== null) {
      let questionMarkIdx = questionMatch.index;
      let markAndPrevChar = regex.slice(questionMarkIdx - 1, questionMarkIdx + 1);
      let isValidUse = false;
      if (markAndPrevChar[0] === ")" || markAndPrevChar[0] === "-" ) isValidUse = true;
      console.log(regex + " uses ? to make capture groups or negatives optional - " + isValidUse)
    }
  })(input)


