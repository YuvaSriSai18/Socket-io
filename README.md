# A simple code to understand how Socket.io work

## Common Socket.IO Methods

### Connection Methods
- **`socket.connect()`**: Establishes a new connection to the server.
- **`socket.disconnect()`**: Disconnects the socket from the server.

### Event Handling Methods
- **`socket.on(event, callback)`**: Listens for the specified event and executes the callback when the event occurs.
- **`socket.off(event, callback)`**: Removes the event listener for the specified event and callback.
- **`socket.once(event, callback)`**: Listens for the specified event but only once. After the event occurs, the listener is automatically removed.

### Emitting Events
- **`socket.emit(event, ...args)`**: Emits the specified event with optional arguments to the server or other clients.
- **`socket.send(data)`**: Sends a message to the server using the default event (`'message'`).

### Room Methods
- **`socket.join(room)`**: Joins a specific room, allowing the socket to receive messages sent to that room.
- **`socket.leave(room)`**: Leaves a specific room.

### Namespace Methods
- **`socket.to(room).emit(event, ...args)`**: Emits the event to all sockets in the specified room except the sender.
- **`socket.in(room).emit(event, ...args)`**: Emits the event to all sockets in the specified room including the sender.
- **`socket.nsp`**: Returns the namespace the socket is connected to.

### Handling Acknowledgements
- **`socket.emit(event, ...args, ack)`**: Emits the event with arguments and an optional acknowledgement callback. The callback is called with the server's response.
- **`socket.on(event, (data, ack) => { ... })`**: Listens for the event and provides an acknowledgement callback that can be called to send a response back to the client.

## Example Usage

### Connection and Disconnection
```javascript
const socket = io('http://localhost:8080');

// Connect to the server
socket.connect();

// Disconnect from the server
socket.disconnect();


###Event Handling

// Listen for 'message' event
socket.on('message', (data) => {
  console.log(data);
});

// Remove the listener for 'message' event
socket.off('message');

// Listen for 'message' event but only once
socket.once('message', (data) => {
  console.log(data);
});

### Emmitting Events

// Emit an event to the server
socket.emit('send_message', { message: 'Hello, server!' });

// Send a message using the default event
socket.send('Hello, server!');


### Room Methods

// Join a room
socket.join('room1');

// Leave a room
socket.leave('room1');


### Namespace Methods

// Emit an event to all sockets in a room except the sender
socket.to('room1').emit('send_message', { message: 'Hello, room1!' });

// Emit an event to all sockets in a room including the sender
socket.in('room1').emit('send_message', { message: 'Hello, room1!' });


### Handling Acknowledgements

// Emit an event to all sockets in a room except the sender
socket.to('room1').emit('send_message', { message: 'Hello, room1!' });

// Emit an event to all sockets in a room including the sender
socket.in('room1').emit('send_message', { message: 'Hello, room1!' });
