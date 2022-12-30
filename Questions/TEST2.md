## TEST 2 - Asynchronous code

### 1. What's wrong with the code snippet?

```javascript
new Promise((resolve, reject) => {
  throw new Error("error");
}).then(console.log);
```

- an absence of a catch block. and the unused reject method. this code will crash

```javascript
new Promise((resolve, reject) => {
  reject(new Error("error"));
}).then(console.log).catch(console.error);

```


### 2. How would you change the code bellow to get the value of the promises that passed as well as the failed promises?

```javascript
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3),
  Promise.resolve(4)
])
  .then(results => console.log(reuslts))
  .catch((err, data) => console.error(err, data));
```


- i will use the allSettled function, or other tools to get the response aggregated as well the errors aggregated without blocking the execution. Libraries like p-promise and p-map, i can set the concurrency level and parallel or not.

```javascript
Promise.allSettled([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3),
  Promise.resolve(4)
])
  .then(results => console.log(results))
  .catch((err, data) => console.error(err, data));
```

### 3. Change ONLY the code on function run to not use a callback but a promise, consider that the code will run on Node

```javascript
function asyncSum(a, b, cb) {
  setTimeout(() => {
    cb(a + b);
  }, 100);
}
function run() {
  asyncSum(1, 2, result => {
    console.log("The sum of 1 and 2 is " + result);
  });
}

// promise function

async function run() {

  // example 1
  const result = await new Promise((resolve, reject) => {
    try {
        async(1, 2, resolve)
    } catch (error) {
        reject(error)
    }
  })

  // example 2
  const result = await new Promise((resolve, _reject) => async(1, 2, resolve))

  console.log("The sum of 1 and 2 is " + result);
}
```
