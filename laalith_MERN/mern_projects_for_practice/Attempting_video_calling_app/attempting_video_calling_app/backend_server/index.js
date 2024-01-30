const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});
/*
1.) const express = require('express');: This line imports the Express.js framework, 
which is a popular Node.js web application framework for building web applications and APIs.
2.) const app = express();: This line creates an instance of the Express application. app represents your Express web server, 
and you will define routes and middleware to handle HTTP requests and responses using this app object.
3.) const http = require('http');: This line imports Node.js's built-in HTTP module, which allows you to create an HTTP server.
4.) const server = http.createServer(app);: This code creates an HTTP server using the app created by Express. In other words, 
it wraps your Express application in an HTTP server. This is a common practice when you want to use both HTTP and WebSocket 
communication in your application, as it allows you to use the same port for both.
5.) const { Server } = require("socket.io");: This line imports the Server class from the "socket.io" module. 
Socket.io is a library for enabling real-time, bidirectional communication between clients and a server using WebSockets.
6.) const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
Here's what's happening in this line:
io is an instance of the Socket.io Server class, which represents the WebSocket server.

new Server(server, { cors: { origin: "http://localhost:5173" } }) initializes a new Socket.io server, passing the previously 
created HTTP server server as its first argument. This binds Socket.io to the existing HTTP server, allowing it to handle WebSocket 
communication alongside HTTP communication.

The second argument is an options object, and it specifies the CORS (Cross-Origin Resource Sharing) configuration for WebSocket connections. 
In this case, it allows connections from the origin "http://localhost:5173," meaning that WebSocket connections from that specific origin are permitted.
*/
const rooms = {};
const users = {};

//let us understand .on functions
/*
In JavaScript, the .on() function, often referred to as a method, 
is commonly used in event-driven programming to register event handlers for specific events. 
This method allows you to specify a function (callback) that should be executed when a particular event occurs. 
The usage of .on() depends on the context in which it is used, and it's commonly associated with libraries and 
frameworks that implement event handling. I'll provide a general explanation:

Event Registration:

.on(event, callback): This method is used to register an event handler for a specific event. It takes two main parameters:
event: This is a string representing the name of the event you want to listen for. It could be a built-in event like 
"click", "change", "keyup" or a custom event name defined in your code.(check the the frontend to see the user defined events we created)
callback: This is a function that gets executed when the specified event occurs. 
The callback function is often referred to as the event handler.

Event Handling:
When the specified event occurs, the registered callback function is called, and any necessary logic within that function is executed.
The event object, which contains information about the event (e.g., the target element, event type, mouse coordinates, etc.), 
is often passed as an argument to the callback function.
we will see how to send event objects later on while working in the frontend.
*/

/*
we know that they are some built in events and user defined events. Now two important events which are built in are:-
i. connection
ii. disconnect

"connection" event:

When a user (a client) successfully connects to a Socket.io server, the server emits a "connection" event.
You can listen for this event on the server side to perform actions when a new user connects.

"disconnect" event:

When a user disconnects from the Socket.io server, either intentionally (e.g., closing a browser tab) or due to a loss of 
connection, the server emits a "disconnect" event.
You can listen for this event on the server side to handle disconnections. 
This is a good place to clean up resources, remove the user's presence from rooms, or perform any necessary teardown tasks.
*/

io.on('connection', (socket) => {
  /*
  Sets up a callback function to handle events when a user connects to the WebSocket server. This is where the main logic for handling WebRTC signaling occurs.

  Here whenever a user connects to the server this callback function will be called for that particular user
  and inside the callback function the variable socket represents that particular user who caused the invocation of the 
  particular cycle of this callback function.
  */
  console.log('a user connected ' + socket.id);

  //the below event disconnect is a built in event.
  socket.on("disconnect", () => {
    Object.keys(rooms).map(roomId => {
      rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id)
    })
    delete users[socket.id];
  })

  //the below event join is a user defined event for which we wrote the code in the frontend. and in the event object we sent an
  //object which has the room id.
  socket.on("join", (params) => {
    const roomId = params.roomId;
    users[socket.id] = {
      roomId: roomId
    }
    if (!rooms[roomId]) {
      rooms[roomId] = {
        roomId,
        users: []
      }
    }
    rooms[roomId].users.push(socket.id);
    console.log("user added to room " + roomId);
  });
  /*
  //Note:- To learn working of web sockets in detail visit the chatgpt link in description.txt
  here in the below event handler we have socket.on, by now we know for each client connected to the server
  we will have a descrete socket id and a different instance of this callback function is called with the respective 
  socket id stored in every instance of socket variable in this function
  when a particular event is emitted by a particular socket id then the event handler associated with only that socket id will 
  listen. i.e. in simple words other clients will not acknowledge this.
  let us understand with an example
  imagine io as the server, there are two sockets which are connected to this server with respective socket id's a and b
  now if there is an event handler in the backend as socket.on and if socket a emitted an event then in the backend
  socket.on will get executed and the important thing is, here the instance of socket represents a socket id
  so b is not having info of it.
  if there is an event handler as io.on then the server will listen to the events.
  

  even servers can emit events like this io.emit(...)
  in this case all instances of sockets will listen to this event and handle it with their own event handlers.

  if the server or a particular socket wants a specific event to be handled by a particular other socket's event handler
  then we use .to() function
  for example imagine a server io and two sockets connected to it a and b
  and there is a an event handler in the backend socket.on(...)
  if an event should be emitted by socket a to b then:-
  socket_id_of_a.to(socket_id_of_b).emit(...) 
  this is how you do it
  if a server wants to emit an event to a specific socket and not all sockets:-
  io.to(socket_id_of_b).emit(...)
  */
  socket.on("localDescription", (params) => {
    let roomId = users[socket.id].roomId;
    
    let otherUsers = rooms[roomId].users;
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("localDescription", {
            description: params.description
        })
        //here we are emitting localDescription event which will be handled by the event handler of socket
        //with socket id stored in otherUser variable.
      }
    })
  })

  socket.on("remoteDescription", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("remoteDescription", {
            description: params.description
        })
      }
    })
  });

  socket.on("iceCandidate", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidate", {
          candidate: params.candidate
        })
      }
    })
  });


  socket.on("iceCandidateReply", (params) => {
    let roomId = users[socket.id].roomId;    
    let otherUsers = rooms[roomId].users;

    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) {
        io.to(otherUser).emit("iceCandidateReply", {
          candidate: params.candidate
        })
      }
    })
  });

});

server.listen(3001, () => {
  console.log('listening on *:3001');
});