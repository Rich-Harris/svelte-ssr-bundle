# svelte ssr bundling demo

Simple toy demo for [sveltejs/svelte#196](https://github.com/sveltejs/svelte/issues/196). Clone, then do this...

```bash
npm install
npm start
```

...then open [localhost:3000](http://localhost:3000).


## How this works

First, we bundle `shared/App.html`. This gives us a module (`server/build/app.js`) which renders HTML. That module is used inside `server/index.js` to respond to requests with server-rendered HTML (and scoped CSS).

Then, we bundle `client/app.js`, which imports `shared/App.html`. By initialising the client-side app with different data than the server uses, we can (for example) indicate that the app is now interactive, by rendering stuff differently.


## Notes

* We don't yet have client-side hydration. The client-side app has to clear out the target element and recreate everything. That's not totally ideal
* There's no client-side routing in this app. Would be easy enough to add in an ad-hoc way, but it might be nice to have a proper routing story, or maybe even a next.js-like framework
