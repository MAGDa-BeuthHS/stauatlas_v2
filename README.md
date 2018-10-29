# Stauatlas

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Preconditions

Make sure you have **Node >= 6** on your machine.
Download the [https://fb.me/react-devtools](React DevTools) for a better development experience

## Install
Type
```
npm install
```

**Configure SSH for remote Postgres-DB**

Use for example Putty in Windows.

```
Host name: your_host
Port: 22
```

Command to run on linux/mac:
```ssh -L 5432:dbyour_host:5432 username@your_host```

for http proxy, or just use direct port forwarding:
```ssh -f yourusername@your_host -L 5433:your_dbhost:5432 -N```


## Start
For access to the remote **Postgres-DB** open the configured SSH-Connection and login with your HRZ account.
Open your terminal and type
```
npm run backend
```

For starting the **front-end server** use

```
npm start
```

This opens [http://localhost:3000/](http://localhost:3000/) to see your app.
When you’re ready to deploy to production, create a minified bundle with npm run build.

## Coding style
Linting is implemented with [ESlint](http://eslint.org/) and the react-plugin [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react). An
Opinionated configuration (by the author) with React-specific rules can be found in `.eslintrc`.

Explore [ESLint integrations](https://eslint.org/docs/user-guide/integrations) into other tools like editors, build systems, and more.
