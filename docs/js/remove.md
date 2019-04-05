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
  "babel-polyfill": "*",
- "jquery": "*",
  "sanitize.css": "*"
},
```
