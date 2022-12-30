## TEST 1 - General Node/JS Knowledge

### 1. How can you call asynchronous code on JavaScript?

with callbacks, and to avoid callback hell we can convert the code to a promise and use either then-catch blocks or await-async depending if we want a blocking or non blocking exceution



### 2. How can you listen on port 80 using only Node?

node have a builtin server already, most people uses frameworks like express.
We can use the http library of node to create a server and listen on a certain port.
```javascript
http.createServer(...).listen(80)
```

### 3. What tools can be used to assure consistent style? Why is it important? Which tools did you use before, which do you prefer and why?

- Each team can agree on a coding style as a standard in the company. We can use tools like, eslint, prettier and others. 

- Some uses prettier for formatting only, and eslint for other standards and even to avoid security issues.

- Having a coding style is very important, to assure a good code quality and readability. I believe teams should agree on many things including naming conventions, function structures and complexity. having all of this in place makes it easier to write clean code, reduce bugs, and make bug fixing easier to any team member.

- Coding standards including, structure, error handling practices, comments (when needed) and documentations, ..

- i used many tools since tslint, and i prefer using both prettier and eslint for different purposes, and other tools for error handling, comments and server implementation (handling of processes)



### 4. What's your favourite tech stack and why?
- I love MERN tech stack, easy and beautiful
- Easy to learn
- Faster to implement any type of project
- Great for MVP because building is always faster
- JS everywhere
- I like working with libraries and not frameworks because i can define my own style, tools and implementations.


### 5. What's your least favourite tech stack and why?

I didnt use many different tech stacks. the most i used are MERN and MEAN. 
I like both and i prefer MERN. Since React is a library and not a framework like angular, it gives me the freedom to implement my project the way i prefer and need. Also, 1 file components makes more sense than having 2 files. I think jsx files are better than having a file for ts and another one for html. I understand that in angular we can have both in a template section in one ts file but it is not the same feeling and less readable.


### 6. Can you access DOM in Node?
No, Node is a server side library and have no access to browser DOM


### 7. Explain the differences between var, let and const.

From the top of my head, var can be created without initialisation like let, can be redeclared not like let.

- So var can be created without initialisation, updated and redeclared.

- let can be created without initialisation, updated but not redeclared.

- const cannot be updated or redeclared and should be initialised with a value.

- all of them are only access within their scope where they are declared.


### 8. Explain the differences between normal functions and arrow functions

- I only know that the syntax is of course different
- Arrow functions can have a return without using the return key. 
- i also think there is a different in arguments access, and this bindings but not sure. like 
```javascript

function test(a, b) {
    console.log(arguments) // <-- returns an array of args
}

const test = (a, b) => {
    console.log(arguments) // <== do not work
}

const test = (a, b) => a + b // no need for return key

```

### 9. How would you design an event driven system? How the communication between the parts would look? How the resource access would look?

- Each event driven system should have 3 actors, an emitter, a listener and an event handler.
- The emitter will emit an event that should have a type or a topic name, the listener will listen to every event and call the right event handler based on the event type.

```javascript
  let emitter = new EventEmitter()
  emitter.on('event type', ({data}) => event handler)
  emitter.emit('event type', {data})
```



