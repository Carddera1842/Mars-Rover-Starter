const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

  test("constructor sets position and default values for mode and generatorWatts", function() {
    let checkRoverPosition = new Rover(98382);
    expect(checkRoverPosition.mode).toBe('NORMAL');
    expect(checkRoverPosition.generatorWatts).toBe(110)
  });

  test("response returned by receiveMessage contains the name of the message" , function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message" , function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);
    let checkRoverResponse = rover.receiveMessage(message);
    let results = checkRoverResponse.results;
    expect(results.length).toBe(2);
  });

  test('responds correctly to the status check command', function () {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message for STATUS_CHECK', commands);
    let rover = new Rover(98382);
    let checkRoverStatus = rover.receiveMessage(message).results;
    expect(checkRoverStatus[0].roverStatus.mode).toBe("NORMAL");
    expect(checkRoverStatus[0].roverStatus.generatorWatts).toBe(110);
    expect(checkRoverStatus[0].roverStatus.position).toBe(98382);
  });

  test('responds correctly to the mode change command', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message for MODE_CHANGE', commands);
    let rover = new Rover(98382);
    let checkRoverMode = rover.receiveMessage(message).results;
    expect(checkRoverMode[0].completed).toBe(true);
  });

  test('responds with a false completed value when attempting to move in LOW_POWER mode', function () {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 1000)];
    let message = new Message('Test message for MOVE', commands);
    let rover = new Rover(98382);
    let checkRoverMove = rover.receiveMessage(message).results;
    console.log(rover.receiveMessage(message).results)
    expect(checkRoverMove[1].completed).toBe(false);
  });

  test('responds with the position for the move command', function () {
    let commands = [new Command('MOVE', 1000)];
    let message = new Message('Test message for MOVE', commands);
    let rover = new Rover(1000);
    let checkRoverMove = rover.receiveMessage(message).results;
    expect(checkRoverMove[0].completed).toBe(true);
  });

  
});