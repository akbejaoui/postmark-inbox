## TEST 3 - JS CODING STYLES

```javascript
function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
}
```

- It is hard to understand what the function does unless you run it or debug it. I would change the name of the function to addZerosToNumber or fillLeadingZeros or addLeadingZeros or a full name like addZerosToTheBeginningOfTheNumber. The most important thing is not the name but for other people to see it and understand what it does without checking the code.

- I would change the width argument name to totalNumberLength or totalStringLength which is a lot less confusing that width

- I would add a check if number and width are actually numbers and do not have other types

- Since the width should represent the entire string length i would change the condition in line 4 to (/\./.test(number) ? 1 : 0) and move it to line 2. width -= number.toString().length - (/\./.test(number) ? 1 : 0)

- Line 2 missing a check if the number is negative, we should not only check for the '.' sign but also for the '-' sign.

- Line 3, the join function is misleading, an empty array of 2 will result in a string of 1, i would fill the array with 0 and join with an empty string like => new Array(width).fill('0').join()

- Line 6 the return statement can be a string interpolation like `${number}` or even better String(number)

- I would prefer a simpler implementation like the following
(make use of String functions)

```javascript
function addZerosBeforeNumber(number, stringLength) {
    if (isNaN(number) || isNaN(stringLength)) throw new Error('Invalid addZerosBeforeNumber arguments, should both have type number')

    if (number < 0) return `-${String(number).slice(1).padStart(stringLength - 1, '0')}`

    return String(number).padStart(stringLength, '0')
}
```

