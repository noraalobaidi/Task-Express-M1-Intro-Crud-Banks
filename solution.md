# Banking API 🏦

1. Initialize your node environment:

   ```shell
   npm init -y
   ```

2. Install express.

   ```shell
    npm i express
   ```

3. In your root folder, create a file `app.js` and import your data file at the top:
   ```js
   let accounts = require('./accounts');
   ```
4. Import express and initialize your express app:
   ```js
   const express = require('express');
   const app = express();
   ```
5. Bind your app to a port:

   ```js
   app.listen(8000, () => {
     console.log('The application is running on localhost:8000');
   });
   ```

6. Let's start creating our first route to fetch all accounts:

```js
app.get('/accounts', (req, res) => {
  res.status(200).json(accounts);
});
```

7. Create a route that adds a new account:

```js
app.post('/accounts', (req, res) => {});
```

8. Remember, since we are accepting `json` data from `Postman` we need to use `express.json` middleware.

```js
app.use(express.json());
```

9. Generate an ID for the new account:

```js
app.post('/accounts', (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
});
```

10. Since all new accounts will start with a fund of 0, the only required data for the user to send is his username:

```js
app.post('/accounts', (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  const newAccount = { ...req.body, funds: 0, id };
});
```

11. Push the new account into the accounts array:

    ```js
    app.post('/accounts', (req, res) => {
      const id = accounts[accounts.length - 1].id + 1;
      const newAccount = { ...req.body, funds: 0, id };
      accounts.push(newAccount);
    });
    ```

12. Send a response with the status code of `201` and send the new account data in `json`:

```js
app.post('/accounts', (req, res) => {
  const id = accounts[accounts.length - 1].id + 1;
  const newAccount = { ...req.body, funds: 0, id };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});
```

13. Now for the delete route, create your route and accept a route param called: `accountId`.

    ```js
    app.delete('/accounts/:accountId', (req, res) => {});
    ```

14. Extract this param using `req.params`:

    ```js
    app.delete('/accounts/:accountId', (req, res) => {
      const { accountId } = req.params;
    });
    ```

15. Try to find an account with the same `accountId`:

        ```js
        app.delete('/accounts/:accountId', (req, res) => {
          const { accountId } = req.params;
          const foundAccount = accounts.find((account) => account.id === +accountId);
        });
        ```

16. If it doesn't exist return a `404` status with an error message:

    ```js
    app.delete('/accounts/:accountId', (req, res) => {
      const { accountId } = req.params;
      const foundAccount = accounts.find(
        (account) => account.id === +accountId
      );
      if (foundAccount) {
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    });
    ```

17. If it does exist filter your array to delete the account:
    ```js
    app.delete('/accounts/:accountId', (req, res) => {
      const { accountId } = req.params;
      const foundAccount = accounts.find(
        (account) => account.id === +accountId
      );
      if (foundAccount) {
        accounts = accounts.filter((account) => account.id !== +accountId);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    });
    ```
18. Return a response with status code of `204` and end the response:
    ```js
    if (foundAccount) {
      accounts = accounts.filter((account) => account.id !== +accountId);
      res.status(204).end();
    }
    ```
19. To our last route, create an update route with an accountId param:
    ```js
    app.put('/accounts/:accountId', (req, res) => {});
    ```
20. Like we did with the delete route, create a constant named `foundAccount` and return an error if the account doesn't exist:

```js
app.put('/accounts/:accountId', (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
});
```

21. The user is only allowed to update his funds, so let's capture the funds from the `req.body` and modify the `foundAccount` funds:
    ```js
    app.put('/accounts/:accountId', (req, res) => {
      const { accountId } = req.params;
      const foundAccount = accounts.find(
        (account) => account.id === +accountId
      );
      if (foundAccount) {
        foundAccount.funds = req.body.funds;
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    });
    ```
22. Let's refactor our code, create a folder named `api`, inside it create a folder named `accounts` and inside it create 2 files: `accounts.routes.js` and `accounts.controllers.js`.

23. Initialize your mini express app in `accounts.routes.js` by importing router:
    ```js
    const express = require('express');
    const router = express.Router();
    ```
24. Export your router:

```js
module.exports = router;
```

25. Move all your routes from `app.js` to `accounts.routes.js` and replace all `app` to `router`:

```js

router.get('/accounts', (req, res) => {[...]});

router.post('/accounts', (req, res) => {[...]});

router.delete('/accounts/:accountId', (req, res) => {[...]});

router.put('/accounts/:accountId', (req, res) => {[...]});
```

26. In your `app.js` import your new routes file:

```js
const accountsRoutes = require('./api/accounts/accounts.routes');
```

27. Use your new routes:

```js
app.use(accountsRoutes);
```

28. Add `/accounts` as a first argument for `app.use` and remove `/accounts` from `accounts.routes.js`:

```js
app.use('/accounts', accountsRoutes);
```

```js
router.get('/', (req, res) => {[...]});

router.post('/', (req, res) => {[...]});

router.delete('/:accountId', (req, res) => {[...]});

router.put('/:accountId', (req, res) => {[...]});
```

29. Moving to the controllers file, create a function called `accountsGet` and export it:

```js
exports.accountsGet = (req, res) => {
  res.json(accounts);
};
```

30. Import the `accounts.js` data file in your controllers file

```js
let accounts = require('../../accounts');
```

31. In your router file import the new function we just created:

```js
const { accountsGet } = require('./accounts.controllers');
```

32. Replace the callback function with the function we just imported:

```js
router.get('/', accountsGet);
```

33. Do the same for the other routes:

```js
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
} = require('./accounts.controllers');

router.get('/', accountsGet);

router.post('/', accountCreate);

router.delete('/:accountId', accountDelete);

router.put('/:accountId', accountUpdate);
```

### 🍋 Retrieve a single account

1. In your `accounts.routes.js`, create a new `GET` route with a route param named: `username`:

```js
router.get('/:username', (req, res) => {});
```

2. In your `accounts.controllers.js`, create a function called `getAccountByUsername`:

```js
exports.getAccountByUsername = (req, res) => {};
```

3. Import this function in your routes file:

```js
router.get('/:username', getAccountByUsername);
```

4. Extract the `username` sent from the user using `req.params`:

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
};
```

5. Find the account that matches this username:

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
};
```

6. Return this account in a response:

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  res.status(201).json(foundAccount);
};
```

### 🌶 Query Parameters

The query string is the part that comes after the `URL` path, and starts with a question mark `?`.

for example:
`?name=joe`

in our case we need it to look like this:

`localhost:8000/accounts/Omar?currency=usd`

express makes it easy to deal with those strings, try to paste the url above in `Postman` and console log `req.query`

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  console.log(req.query);
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  res.status(201).json(foundAccount);
};
```

the output should look like this:

```js
{
  currency: 'usd';
}
```

express converted the query into a JS object so that we can easily tackle it with code, make an `if` condition that if the `currency` is equal to `usd`:

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === 'usd') {
  }
  res.status(201).json(foundAccount);
};
```

Now if the condition is met, create a copy of the `foundAccount` and convert the funds on the `funds` to `usd`:

```js
exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === 'usd') {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
```

Now try to make a request with a query and without!
