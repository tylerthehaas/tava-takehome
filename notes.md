# Notes

## What I would do if I had more time

1. Would implement a real logger for controlling different log levels and outputting to a file or remote service.
2. Would add a request id to each request.
3. Would add a production ready logger to log all requests and responses and configure log levels via environment variables.
4. Would switch loading component to use a skeleton loader.
5. Would build in pagination to GET /employees endpoint
6. Would use react-i18next to translate all text
7. Add tests for all the endpoints using supertest and nock if necessary (but mocking responses wouldn't be necessary for this project).
8. Add frontend tests with react-testing-library and mock service worker.
9. Would add more analytics tracking for user actions on the frontend for observability.

> I used AI to do the boilerplate code for the project and the routes. But I moved all the code around to make it more readable and maintainable and follow the architecture I think is best for this project.

> I would use vitest as my test runner.

> Switched to using vite as it is faster and better supported than react-scripts.
