const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./goods.json','utf8',(err,data) => {
        data = JSON.parse(data)
        let saveCount = 0
        const Goods = mongoose.model('Goods')
        data.map((value,index)=>{
            console.log(value)
            let newGoods = new Goods(value)
            newGoods.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })
    })
    ctx.body = '开始导入数据'
})

router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./category.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const Category = mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let neweCategory = new Category(value)
            neweCategory.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })

    })
    ctx.body="开始导入数据"
})

router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./category_sub.json','utf8',(err,data)=>{
        data = JSON.parse(data)
        let saveCount = 0
        const CategorySub = mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let neweCategorySub = new CategorySub(value)
            neweCategorySub.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                console.log('失败'+error)
            })
        })

    })
    ctx.body="开始导入数据"
})

/*获取商品详情信息的接口*/
router.post('/getDetailGoodsInfo',async(ctx)=>{
    try{
        let goodsId = ctx.request.body.goodsId
        const Goods = mongoose.model('Goods')
        let result = await Goods.findOne({ID:goodsId}).exec()
        ctx.body ={code:200,message:result}

    }catch(err){
        ctx.body = {code:500, message:err}
    }   
   

})
router.get('/getCategory',async(ctx)=>{
    try{
       
        const Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body = {code:500, message:err}
    }
})

router.post('/getCategorySub',async(ctx)=>{
    try{
        let categoryId = ctx.request.body.categoryId
        const CategorySub = mongoose.model('CategorySub')
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body = {code:200,message:result}
    }catch(err){
        ctx.body = {code:500,message:err}
    }
})

router.post('/getGoodsListByCategorySubID',async(ctx)=>{
    try{
        let categorySubId = ctx.request.body.categorySubId//小类别
        let page = ctx.request.body.page
        let num = 10//每页显示数量
        let start  = (page-1)*num
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
        ctx.body = {code:200, message:result}
    }catch(err){
        ctx.body={code:500, message:err}
    }
})
module.exports = router;