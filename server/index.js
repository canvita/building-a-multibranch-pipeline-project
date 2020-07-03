const serve = require("koa-static");
const Router = require("koa-router");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const app = new Koa();
const { getOrder } = require("./apis");
const { PORT } = require("../config/config");

const router = new Router();

app.use(serve("./build/"));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(static("../build"));

router.get("/queryOrder", async (ctx) => {
  const { id } = ctx.query;
  console.log(id);

  const data = await getOrder(id);
  ctx.body = data;
});

app.listen(PORT, () => {
  console.log("server on" + PORT);
});
