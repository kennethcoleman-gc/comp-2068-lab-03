# COMP 2068 - Lab 3 - APIs and Nappies

## Objective

"To demonstrate the ability to setup a Node/Express application, create routes, and deliver JSON formatted responses."

## Description

This lab is an Node/Express App that implements full CRUD operations by read/writing JSON via the local filesystem, rather than just the read access required in the assignment.

## Usage

- Clone / download app and run via npm (requires node / npm)
- App will listen for HTTP requests on port 4000

## API Endpoints

|HTTP Request | URI | parameters | Function|
|:---:|:---:|:---:|:---:|
|GET|/people|-|Returns all people|
|GET|/people/(id)|-|Returns person by integer id number provided in URI|
|POST|/people|name, age (Integer), likesBacon (Boolean)|Stores and returns person|
|POST|/people/update|id (Integer), name, age (Integer), likesBacon (Boolean)|Updates person with provided information, all fields optional except id|
|POST|/people/destroy|id (Integer)|Deletes person by id #|
|POST|/people/reset|-|Resets the user list to the initial 4 factory default entries (in case you add Cletus a few too many times)|

## Limitations
In the interests of time given the API extends beyond the requirements, error checking covers many cases but is not 100% bulletproof.

The correct parameters and types must be provided for proper function.