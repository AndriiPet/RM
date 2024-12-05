# UsersGateway Documentation

## Overview

`UsersGateway` is a WebSocket gateway for managing user location updates and retrievals. It uses the `@nestjs/websockets` package and `socket.io` to handle real-time communication with connected clients.

## Gateway Initialization

### `afterInit(server: Server)`

This method is called after the WebSocket gateway is initialized.

- **Parameters**:
  - `server: Server` - The WebSocket server instance.

```typescript
afterInit(server: Server) {
  console.log('WebSocketGateway initialized');
}
```

## Client Connection Management

### `handleConnection(client: Socket, ...args: any[])`

- **Parameters**:
  - `client: Socket` - The connected client socket instance.
  - `...args: any[]` -Additional arguments.

```typescript
handleConnection(client: Socket, ...args: any[]) {
  console.log(`Client connected: ${client.id}`);
}
```

## Message Handlingt

### `handleUpdateUserLocation(@MessageBody() data: any, @ConnectedSocket() client: Socket)`

- **Parameters**:
  - `data: any - The data sent by the client.
  - `client: Socket - The client socket instance.

```typescript
@SubscribeMessage('updateUserLocation')
async handleUpdateUserLocation(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
  console.log('Received updateUserLocation event with data:', data);

  const [userId, lastLatitude, lastLongitude] = data;

  console.log('Parsed values:', { userId, lastLatitude, lastLongitude });
  try {
    const updatedUser = await this.userService.updateUserLocation(userId, lastLatitude, lastLongitude);
    const response = {
      id: updatedUser.id,
      lastLatitude: updatedUser.lastLatitude,
      lastLongitude: updatedUser.lastLongitude,
    };
    console.log(response.lastLatitude);
    client.emit('locationUpdated', response);
    return response;
  } catch (error) {
    client.emit('locationUpdated', { status: 'error', message: error.message });
  }
}
```

### `handleGetUserLocation(@MessageBody() data: any)`

**Parameters**: - `data: any - The data sent by the client.

```typescript
@SubscribeMessage('getUserLocation')
async handleGetUserLocation(@MessageBody() data: any) {
  console.log('Received getUserLocation event with data:', data);
  console.log('Parsed values:', { data });

  const user = await this.userService.getUserLocation(data);
  console.log(user);
  const response = { id: user.id, lastLatitude: user.lastLatitude, lastLongitude: user.lastLongitude };
  this.server.emit('userLocation', response);
  return response;
}
```

## Events

### updateUserLocation

This event is used to update a user's location.

- **Parameters**:

  - `userId`: The ID of the user.
  - `lastLatitude`: The new latitude of the user.
  - `lastLongitude`: The new longitude of the user.

- **Response**:
  - On success: Emits `locationUpdated` event with the updated location data.
  - On error: Emits `locationUpdated` event with an error message.

**Example**:

```javascript
const socket = io("http://your-server-url");

// Update user location
const userId = "user123";
const lastLatitude = 50.4501;
const lastLongitude = 30.5234;

socket.emit("updateUserLocation", [userId, lastLatitude, lastLongitude]);

// Listen for location updated event
socket.on("locationUpdated", (response) => {
  if (response.status === "error") {
    console.error("Error updating location:", response.message);
  } else {
    console.log("Location updated:", response);
  }
});
```

### getUserLocation

This event is used to retrieve a user's location.

- **Parameters**:

  - `userId: The ID of the user.

- **Response**:
  - Emits userLocation event with the user's current location data.

**Example**:

```javascript
const socket = io("http://your-server-url");

// Get user location
const userId = "user123";

socket.emit("getUserLocation", userId);

// Listen for user location event
socket.on("userLocation", (response) => {
  console.log("User location:", response);
});
```
