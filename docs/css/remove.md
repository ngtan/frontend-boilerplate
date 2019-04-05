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
  "babel-polyfill": "*",
  "jquery": "*",
- "sanitize.css": "*"
},
```
