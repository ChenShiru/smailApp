<template>
    <div class="container">
        <div class="navbar-div">
            <van-nav-bar
                title="商品详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" alt="">
        </div>
        <div class="goods-name">
            {{goodsInfo.NAME}}
        </div>
        <div class="goods-price">
            价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}
        </div>
        <div>
            <van-tabs swipeable sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button type="primary" size="large">加入购物车</van-button>
            </div>
            <div>
                <van-button type="danger" size="large">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant';
    import {toMoney} from '@/components/filter/moneyFilter.js'
    export default {
        data() {
            return {
                goodsId: this.$route.query.goodsId,
                goodsInfo:{}
            }
        },
        filters:{
              moneyFilter(money){
               return toMoney(money)
           }
        },
        created(){
            this.getInfo()
        },
        methods:{
           getInfo(){
               axios({
                   url:url.getDetailGoodsInfo,
                   method:'post',
                   data:{
                       goodsId:this.goodsId
                   }
               })
               .then(res=>{
                   if(res.data.code = 200 && res.data.message){
                       this.goodsInfo = res.data.message
                   }else{
                       Toast('服务器错误，加载失败');
                   }
                   
               })
               .catch(err=>{
                   console.log(err)
               })
           },
           onClickLeft(){
               this.$router.go(-1)
           }
        }
    }
</script>

<style scoped>
.goods-name, .goods-price{
    background-color: #fff
}
.detail{
    font-size: 0
}
.goods-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    background-color:#fff;
    display: flex;
     flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex: 1;
    padding:5px;
}
.container {
margin-bottom: 60px;
}
</style>