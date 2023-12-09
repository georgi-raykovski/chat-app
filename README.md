# Chat App

A simple chat application using React, Node.js, and TypeScript.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

This project is a chat application built with React for the frontend, Node.js for the backend, and TypeScript for type safety. The project is organized as a monorepo using Yarn Workspaces, and it leverages Lerna for managing dependencies.

## Features

- Real-time chat functionality
- Ability to update/delete messages in real time
- Responsive design

## Project Structure

The project is organized as follows:

/packages
- **client**: Contains the React app.
- **server**: Contains the Node.js server.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
2. Install dependencies
   ```bash
   yarn install

## Usage
To start the project use the following command in the root directory:
```bash
yarn start
```
This will concurrently start the React app and the Node.js server.

Visit http://localhost:3000 to access the chat app in your browser.
