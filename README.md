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

Tests are breaking on Node v0.12.0 and IO.js v1.5.0. To run the tests, you will
have to switch to v0.10.x

## TODO

- Cross browser compatibility
- Remove tokens other than the last token
