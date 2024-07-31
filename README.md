# Linguistic Roadmap to Darija
 This is a final version of my project in the course of Text Technology for the M.Sc. in Computational Linguistic. The course is taught by Prof. Dr. Kerstin Jung at the university of Stuttgart, Germany. 

This project is an Express.js application designed to handle various API endpoints for interacting with a MongoDB database containing Darija vocabulary and sentences. The application supports functionalities such as fetching vocabulary sentences with pagination, searching for vocabulary entries, and retrieving spelling statistics.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [GET /vocabulary/sentences](#get-vocabularysentences)
  - [GET /search](#get-search)
  - [GET /spelling-stats](#get-spelling-stats)
- [Starting the Server](#starting-the-server)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/darija-vocabulary-api.git
    cd darija-vocabulary-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Make sure you have a MongoDB instance running and update the connection URI in your environment configuration.

## Configuration

Create a `.env` file in the root directory and add your MongoDB connection string:

```env
MONGO_URI=mongodb://localhost:27017
PORT=3000
