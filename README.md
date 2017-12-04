# svelte ssr bundling demo

Simple toy demo for [sveltejs/svelte#196](https://github.com/sveltejs/svelte/issues/196). Clone, then do this...

```bash
npm install
npm start
```

...then open [localhost:3000](http://localhost:3000).


## How this works

First, we bundle `shared/App.html`. This gives us a module (`server/build/app.js`) which renders HTML. That module is used inside `server/index.js` to respond to requests with server-rendered HTML (and scoped CSS).

Then, we bundle `client/app.js`, which imports `shared/App.html`. By initialising the client-side app with different data than the server uses, we can (for example) indicate that the app is now interactive, by rendering stuff differently. By setting `hydratable: true` in `rollup.config.js`, we let Svelte reuse the server-rendered markup.

```javascript
plugins: [
    svelte({
        hydratable: true,
        })
    ]
```


In `client/app.js` we tell Svelte that it should hydrate by passing `hydrate: true` to the app's constructor:

```javascript
    window.app = new App({
        target,
        hydrate: true
        });        
```

In this example, the server renders "loading..." which is replaced by a clickable button once Javascript starts controlling the DOM.


## Notes

* [svelte-routing](https://github.com/EmilTholin/svelte-routing) is a router with Svelte SSR support
