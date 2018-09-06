## Removing `sanitize.css`

To remove `sanitize.css` you will need to remove it from both:

- [`main.scss`](../../app/styles/main.scss)

```diff
// Libraries
- @import url(~sanitize.css);
```

- [`package.json`](../../package.json)

```diff
"dependencies": {
  "babel-polyfill": "6.26.0",
  "jquery": "3.3.1",
  "modernizr": "3.6.0",
- "sanitize.css": "6.0.0"
},
```
