const {connect, initSchemas} = require('./database/init.js')
const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
app.use(bodyParser())
app.use(cors())
let user = require('./appApi/user.js')

//装载所有子路由

let router = new Router();
router.use('/user',user.routes())


//加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())

//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
})()
app.use(async(ctx)=>{
    ctx.body = '<h1>Hello koa2</h1>'
})
app.listen(3000,()=>{
    console.log('[server] starting at port 3000')
})