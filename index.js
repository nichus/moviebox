require('dotenv').config();

const Koa = require('koa');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const Disc = require('./models/disc');

// use .env to save credentials...
mongoose.connect(mongoUrl(), {useNewUrlParser: true, useUnifiedTopology: true})
  .then((results) =>  {
    console.log('connected to db');
    app.listen(3000, () => console.log('started...'));
  })
  .catch((err) => console.log(err));

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

render(app, {
  root: path.join(__dirname,'views'),
  layouts: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/', index);
router.post('/search', search);

async function index(ctx) {
  var result = await Disc.find();
  await ctx.render('index', {
        title: 'Moviebox Inventory',
        filter: "Filter",
        discs: result
      });
};
async function search(ctx) {
  const params = ctx.request.body;
  var result = await Disc.find({ title: new RegExp(params.filter,'i')}).exec();
  await ctx.render('index', {
        title: 'Moviebox Inventory - Filtered',
        filter: params.filter,
        discs: result
      });
};

function mongoUrl(user,pass,host,port,db) {
 return "mongodb://" + process.env.mongouser + ":" + process.env.mongopass + "@" + process.env.mongohost + ":" + process.env.mongoport + "/" + process.env.mongodb + "?authSource=admin";
}
