# API Documentation

## User Endpoints

### Get All Users

- **Endpoint:** `GET /users`
- **Description:** Retrieves all users registered in the system.

### User Signup/Login

- **Endpoint:** `POST /users/signup`
- **Description:** Creates a new user if the username doesn't exist, otherwise logs in the existing user.
- **Request:**
  ```json
  {
    "username": "newuser"
  }
  ```

### Get User By Id

- **Endpoint:** `GET /users/:id`
- **Description:** Retrieves details of a specific user by their ID.
- **Request:**
  - `id` (query param) : ID of the user

## Message Endpoints

### Get All Messages

- **Endpoint:** `GET /messages`
- **Description:** Retrieves all messages available in the system.

## SocketIO Events

### Client to Server Events

#### `create_message`

- **Event:** `create_message`
- **Description:** Sent by the client to create a new message.

#### `edit_message`

- **Event:** `edit_message`
- **Description:** Sent by the client to edit an existing message.

#### `delete_message`

- **Event:** `delete_message`
- **Description:** Sent by the client to delete one of their previous messages.

### Server to Client Events

#### `receive_message`

- **Event:** `receive_message`
- **Description:** Sent by the server to notify clients about a new message.

#### `message_edited`

- **Event:** `message_edited`
- **Description:** Sent by the server to notify clients about an edited message.

#### `message_deleted`

- **Event:** `message_deleted`
- **Description:** Sent by the server to notify clients about a deleted message.
