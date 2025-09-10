# Cypress Test Automation Project

## How to install test dependecies modules:
- To install or update node packages: ```npm insatll```
- To do a clean installation of node packages: ```npm ci```
## How to launch Cypress tests
- To open tests and run them manually with the Cypress UI (open mode): ```npm run cy:open```
- To run all tests in Headless mode: ```npm run cy:run:headless```
- To run all tests in Headed mode: ```npm run cy:run```
- To run a specific test in Headless mode: ```npm run cy:run:spec path_to_the_test```
## Tests executed in the Github action:
- When a new commit is pushed to the main, the pipeline that execute all tests is launched.