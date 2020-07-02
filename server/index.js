const serve = require("koa-static");
const Koa = require("koa");
const app = new Koa();

// $ GET /package.json
app.use(serve("../build/"));

app.listen(3003);
