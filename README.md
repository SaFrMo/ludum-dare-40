# ld40

> Vue.js game for Ludum Dare 40

## Todo
* Cache
* POST and PUT
* Timer
* Autogenerated rounds
* Stretch:
    * Authentication

## Objective
Serve up responses to requests as quickly as you can!

## Gameplay

### The Board
The board has three main areas: the request stage/response dump, a job queue/cache, and the file storage. Players must place requests into the job queue, attach the appropriate response, and drag back to the response dump.

### Requests
Requests are objects consisting of:
* Request line
    * Command
    * Path
* Headers
* Body

Responses are built like this:
* Status code
* Headers
* Body

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
