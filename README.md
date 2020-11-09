# node-jsoup
```Node.js``` 에서 ```Jsoup```를 사용할 수 있습니다. <br>하지만 ```sync-request``` 모듈이 필요합니다.
## Example Code
### GET
```javascript
const Jsoup = require("jsoup");
var result = Jsoup.connect("https://example.com").get();
console.log(result);
// result = <html> <head> <body>...
```
### POST
```javascript
const Jsoup = require("jsoup");
var result = Jsoup.connect("https://example.com").post();
console.log(result);
// result = <html> <head> <body>...
```
### Options
```javascript
const Jsoup = require("jsoup");
var result = Jsoup.connect("https://example.com").header("content-type","sans").data("difficulty","very hard").post();
console.log(result);
// result = <html> <head> <body>...
```
