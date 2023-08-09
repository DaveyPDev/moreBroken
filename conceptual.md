### Conceptual Exercise

Answer the following questions below:

- What is a JWT?

  json web token

- What is the signature portion of the JWT?  What does it do?

  it is used to check the authentication of a token and that it has not been comprimised 

- If a JWT is intercepted, can the attacker see what's inside the payload?

  yes they can look at the contents of the payload

- How can you implement authentication with a JWT?  Describe how it works at a high level.

  Start with registering a user and their login
  Generate a JWT
  Send the JWT back to the client and store it securely
  Server checks authenticaton and grants or denies access
  Token's expiration and renewal
  Logging the user out

- Compare and contrast unit, integration and end-to-end tests.

  unit tests: 
    target individual functions
    small scope
    fast speed
  
  integration:
    tests interactions between functions and modules
    speed is slower 

  End to end:
    tests whole project
    slowest speed
  

- What is a mock? What are some things you would mock?

  a fake object that is used to simulate a real component instead of using the real dependance

- What is continuous integration?

  a practice ment to integrate changes from multiple developers

- What is an environment variable and what are they used for?

  predetermined values used to configure values from outside of your app

- What is TDD? What are some benefits and drawbacks?

  Test driven development
  writing tests for code and building the app based off of the tests

- What is the value of using JSONSchema for validation?

  Data Validation
  Data Integrity
  Design and Testing 
  Security

- What are some ways to decide which code to test?

  complex logic
  edge cases
  integrations
  newly added functions
  error handling
  security

- What does `RETURNING` do in SQL? When would you use it?

  clause used to  retrieve modified data

- What are some differences between Web Sockets and HTTP?

  http is a request response from a client request to a server

  web sockets allow both the server and client to message each other
  for easier data exchange

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?

  Thus far I perfer flask. The straight forward from Python feels more natural VS JS. Granted theyre pretty similar BUT Flask has my vote.