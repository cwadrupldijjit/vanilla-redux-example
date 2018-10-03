# Vanilla Redux Example

This is a simple redux example that is used in Node and doesn't use any other packages than Redux.

In this example, more of an explanation about redux is found inside of the `index.js` file.  However, using the code is fairly simple and will be explained here.

## Setup:

- `npm i`

## Running:

- `node index.js`

## Interaction:

This program runs for only 20 seconds and then kills itself.  During that time, it accepts user input.  If there is no input, it ignores it and it kills off in 20 seconds having no changes to the count.  If you type a series of `+` or `-` characters, it will actually modify the count in the redux store and then log out the updated count.  It won't actually take any affect unless you press "enter" after entering those characters.

E.g.:  
Inputting

```
+++
```

and then pressing "enter" will give the following output:

```
Current count: 1
Current count: 2
Current count: 3
```

Then typing in

```
---
```

will show:
```
Current count: 2
Current count: 1
Current count: 0
```

If nothing more is done, it will show:

```
Time is up - thanks for trying it out!
Final count: 0
```

And the program will end.

Other than that, play around with the program and see what you can do with Redux.

## A word on the other file

The other file, `user-input-helper.js` is a simple file that starts to read input, and I created it so that it could be used in this simple example.  If you want to poke around at that, feel free to do so.