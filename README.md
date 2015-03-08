# What is this?

A React.js component that parses user input in a ContentEditable element and
displays them as individual tokens.

Example use cases include:
- Entering a list of email addresses
- Tagging

## To run the example

Run `npm install` followed by `gulp webserver`. Open your browser and visit
`http://localhost:8080`.

## Tests

Jest tests are breaking on Node v0.12.0 and IO.js v1.5.0, so I have not written
a comprehensive test suite.

## TODO

- Cross browser compatibility
- Typing in between tokens
- Remove tokens other than the last token
- Better test suite
