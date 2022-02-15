# Banking API 🏦

In this task, you will create a banking API with the basic `CRUD` operations.

## Instructions

- Fork and clone [this repository](https://github.com/JoinCODED/Task-Express-M1-Intro-Crud-Banks) to your `Development` folder.

1. You have a data file called `accounts.js`, it's an array of bank accounts with the owner's username and the funds that he got in KWD.
2. Create a route that `fetches` all accounts details.
3. Create a route that `creates` a new account, new accounts starts with a fund of 0.
4. Create a route that `deletes` an account by it's ID and send an error response if the account is'nt found.
5. Create a route that `updates` **ONLY** the funds of an account by it's ID.
6. Refactor your code so you have an `api` folder with `routes` and `controllers`.

### 🍋 Retrieve a single account

- Create a route that retrieve a single account by the username of the owner not by it's ID.

### 🌶 Query Parameters

You have learned about route params, but there's also something called query params.

- On the route you created in the previous challenge, add a query param that retrieves the account info and funds in USD.

Your URL should look like:
`localhost:8000/accounts/Omar?currency=usd`
