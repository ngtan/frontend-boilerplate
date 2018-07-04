## Removing `jquery`

To remove `jquery` you will need to remove it from both:

- [`webpack.config.base.js`](../../internals/webpack/webpack.config.base.js)

```diff
new webpack.ProvidePlugin({
- $: 'jquery',
- jQuery: 'jquery',
}),
```

- [`package.json`](../../package.json)

```diff
"dependencies": {
  "babel-polyfill": "6.26.0",
- "jquery": "3.3.1",
  "modernizr": "3.6.0",
  "sanitize.css": "6.0.0"
},
```
