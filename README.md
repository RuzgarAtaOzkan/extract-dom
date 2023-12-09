# Extract Dom

## Extract a specific element's every property including innerHTML.

```javascript
const extractDom = require('extract-dom');

const data =
  '<html><head></head><body><h2 class="title">Hello there!</h2></body></html>';

const dom = extractDom(data, 'h2.class=title');

// console.log(dom)
/*

[
  {
    innerHTML: 'Hello there!',
    class: 'title'
  }
]

*/
```
