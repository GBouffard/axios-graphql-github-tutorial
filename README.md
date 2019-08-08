# :milky_way: axios-graphql-github-tutorial :milky_way:

## how to run it

- `git clone git@github.com:GBouffard/axios-graphql-github-tutorial.git`
- cd axios-graphql-github-tutorial
- npm install
- code .env and replace `addYourTokenHere` with your [personal token from Github](https://help.github.com/en/enterprise/2.17/user/articles/creating-a-personal-access-token-for-the-command-line)
  - scopes/permissions you need to check: admin:org, repo, user, notifications
- npm start
- visit `http://localhost:3000`

## TODO - Created a bug in Apps.js since refactoring to functional components/ES6

steps to reproduce: The `more` button only show results for a few seconds.
expected: The `more` button shows pagination which was the case before refactoring.

I suspect that something is not right with my use of useEffect (what used to be ComponentDidMount in the class component).

As a side effect, console.logging the endCuror constantly returns `Y3Vyc29yOnYyOpHOERSfCQ==` which is what was returned before refactoring but for the first call. It returned `Y3Vyc29yOnYyOpHOGNLv9A==` on the 2d call and `Y3Vyc29yOnYyOpHOGhoB4A==` on the 3rd.

Updating to ES6 also changed the way the state works using `useState` so I need to check that I did not mutate or that data was lost in the process.

`gco` to a previous state of the app such as `08199b2486b03857b809980c0fbb1ecc0d912670`
worked without ES6 and functional components.
