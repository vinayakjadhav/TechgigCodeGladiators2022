process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var output = [];
var cache = {};
process.stdin.on('data', function(data) {
  input_stdin += data;
});

process.stdin.on('end', function() {
  var packets;
  input_stdin_array = input_stdin.split("\r\n");
  // /// console.log(input_stdin_array)
  const started = Date.now();
  //Write code here
  var noOfPackets = input_stdin_array[0];
  var packets = input_stdin_array[1].split(" ").map(a => +a);

  /// console.log("noOfPackets ", noOfPackets);
  /// console.log("packets ", packets);

  for (var i = 0; i < packets.length; i++) {
    var plausibleGroups = getFactors(packets[i]);
    output[i] = getMoves(packets[i], plausibleGroups);
    //  console.log("now cache  ", cache);
  }

  function getMoves(balls, groups) {
    /// console.log("groups for ", balls, groups);
    if (!groups.length) {
      return 1;
    }
    if (cache[balls]) {
      //    console.log("cache hit ", balls, cache[balls])
      return cache[balls];
    }

    var total = 0;
    var m = [];

    for (var i = 0; i < groups.length; i++) {
      let a = 1;
      /// console.log("cache is ", cache)
      //  for (var j = 0; j < (balls / groups[i]); j++) {
      //    /// console.log("for j ", j)
      let gp = getFactors(groups[i]);
      a = a + ((balls / groups[i]) * getMoves(groups[i], gp));
      //  console.log("now a  ", a)
      //  }
      m[i] = a; //- groups[i];
      //    cache[groups[i]] = a;
    }
    //    console.log("m ", m);
    total = Math.max(...m);
    //    console.log("total", total);
    cache[balls] = total;
    return total;
  }

  function getFactors(number) {
    var factors = [];
    if (number == 1) return factors;
    for (var i = 1; i ** 2 <= number; i++) {
      if (number % i == 0) {
        factors.push(i);
        if (number / i !== i && number / i != number)
          factors.push(number / i);
      }
    }
    return factors.sort();
  }

  /// console.log("output ", output);
  output = output.reduce((total, num) => total + Math.round(num));
  /// console.log(output);
  process.stdout.write("" + output + "");
  const gone = Date.now() - started;
  //  console.log("\n\nTime taken", gone / 1000, 's.');
});