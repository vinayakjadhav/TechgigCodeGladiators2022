process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var output;

var primeNumbers = [];
var noOfPhases;
var noOfStates;

// var myArgs = process.argv.slice(2);
// // console.log('myArgs: ', myArgs);
var timeTaken = 0;
process.stdin.on('data', function(data) {
  input_stdin += data;
  //  startTime = Date.now();
});


process.stdin.on('end', function() {
  input_stdin_array = input_stdin.replace(/\r/g, '').split("\n");

  //  // console.log(input_stdin_array);

  //Write code here
  var noOfTestCases = input_stdin_array[0];
  output = new Array(+noOfTestCases);
  var testCases = [];
  input_currentline = 1;
  for (var i = 0; i < noOfTestCases; i++) {
    var [l, r] = input_stdin_array[input_currentline].split(" ");
    testCases.push({
      L: +l,
      R: +r
    });
    input_currentline++;
  }

  // console.log("testCases ", testCases);

  for (var k = 0; k < noOfTestCases; k++) {
    findPrimeNumbers(k, testCases[k].L, testCases[k].R)
  }

  for (var i = 0; i < primeNumbers.length; i++) {
    var l = primeNumbers[i].length;
    switch (l) {
      case 0:
        output[i] = -1;
        break;
      case 1:
        output[i] = 0;
        break;
      default:
        output[i] = primeNumbers[i][l - 1] - primeNumbers[i][0];
    }


  }


  //// console.log(output);
  process.stdout.write("" + output.join("\n") + "\n");
  // timeTaken = Date.now() - startTime;
  // // console.log(timeTaken, " ms timeTaken");


  function findPrimeNumbers(testCaseNo, start, end) {
    primeNumbers[testCaseNo] = [];
    for (var j = start; j <= end; j++) {
      var isPrime = isPrimeNumber(j);
      if (isPrime) {
        primeNumbers[testCaseNo].push(j);
        for (var k = end; k > j; k--) {
          var isPrime = isPrimeNumber(k);
          if (isPrime) {
            primeNumbers[testCaseNo].push(k);
            break;
          }
        }
        return primeNumbers[testCaseNo];
      }
    }
    return primeNumbers[testCaseNo];
  }

  function isPrimeNumber(number) {
    for (var i = 2; i < number; i++) {
      if (number % i == 0) return false;
    }
    return true;
  }

});