class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;

   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: []
      }
      let messageCommands = message.commands;
      for (let i = 0; i < messageCommands.length; i++){
         if (messageCommands[i].commandType === "STATUS_CHECK"){
            response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         } else if (messageCommands[i].commandType === "MODE_CHANGE") {
            response.results.push({completed: true})
            this.mode = messageCommands[i].value
         } else if (messageCommands[i].commandType === "MOVE") {
            if (this.mode !== "NORMAL"){
               response.results.push({completed: false})
            } else {
               response.results.push({completed: true})
               this.position = messageCommands[i].value
            } 
         }
      }
      return response;
   }   
};

module.exports = Rover;