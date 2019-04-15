<template>
    <div>
        <div class="trip">
            <div class="header">
                <div class="header-left">
                    <div class="iconfont back-icon">&#xe61f;</div>
                </div>
                <div class="header-input">
                    <span class="iconfont">&#xe611;</span>
                    输入城市景点游玩主题</div>
                <router-link to="/City" >
                    <div class="header-right">
                        {{this.city}}
                        <span class="iconfont">&#xe64a;</span>
                    </div>
                </router-link>
                
            </div>
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="item of swiperList" :key="item.id">
                    <img :src="item.imgUrl" width="100%" alt="">
                </van-swipe-item>
                <!-- <van-swipe-item>
                    <img src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/942d87cc1576c333c77dc1f86af145cd.jpg_750x200_d25bf3eb.jpg" width="100%" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20193/417efa7a4790383e28cbc86eebb31d4e.jpg_750x200_734d2175.jpg" width="100%" alt="">
                </van-swipe-item> -->
            </van-swipe>
        </div>
        <div class="type-bar">
                <div v-for="item of iconList" :key="item.id">
                    <img :src="item.imgUrl" width="70%"><br/>
                    <span>{{item.desc}}</span>
                </div>
        </div>
        <!-- 热销推荐 -->
        <div>
            <div class="recommend-title">
                热销推荐
            </div>
             <ul>
                 <router-link 
                 tag="li" 
                 class="item" 
                 v-for="item of recommendList" 
                 :key=item.id
                 :to="'/detail/'+item.id">
                    
                    <img class="item-img" :src="item.imgUrl" alt="">
                     
                     <div class="item-info">
                         <p class="item-title">{{item.title}}</p>
                         <p class="item-desc">{{item.desc}}</p>
                         <button class="item-button">查看详情</button>
                     </div>
                 </router-link>
             </ul>
        </div>
        <weekend :list=weekendList></weekend>

    </div>
    </div>
</template>

<script>
import weekend from '@/components/component/weekend'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        computed:{
            ...mapState(['city'])
        },
        data() {
            return {
                swiperList:[],
                iconList:[
                    {
                        id:'0001',
                        imgUrl:'//pic5.40017.cn/02/001/5f/ab/rBLkCFqozNqAF4UUAAAFH-2jq70957.png',
                        desc:'景点门票'
                    },
                    {
                        id:'0002',
                        imgUrl:'//pic5.40017.cn/02/001/5f/ab/rBLkCFqozNqAJqPYAAAFlYq1v7A413.png',
                        desc:'机票'
                    },
                    {
                        id:'0003',
                        imgUrl:'//pic5.40017.cn/01/000/5f/a5/rBLkBVqozNqAGbVbAAADpuwJ0xY082.png',
                        desc:'酒店住宿'
                    },
                    {
                        id:'0004',
                        imgUrl:'//pic5.40017.cn/01/000/5f/30/rBANC1qozNqAb3vRAAAD_Qg-dt4234.png',
                        desc:'火车'
                    },

                ],
                recommendList:[],
                weekendList:[]
            }
        },
        components:{
            swiper,
            swiperSlide,
            weekend
        },
        methods: {
            getHomeInfo(){
                axios.get('/api/index.json')
                .then(this.getHomeInfoSucc)
            },
            getHomeInfoSucc(res){
                console.log(res)
                res = res.data
                if(res.ret && res.data){
                    const data = res.data
                    this.swiperList = data.swiperList
                    this.recommendList = data.recommendList
                    this.weekendList = data.weekendList
                }
            }
        },
        mounted() {
            this.getHomeInfo()
        },
    }
</script>

<style scoped>
    p,li{
        margin: 0;
        padding: 0;
    }
    .trip{
        margin-bottom:3.2rem; 
    }
    .header{
        display: flex;
        line-height: 2.7rem;
        background: #00bcd4;
        color:#fff;
    }
    .header-left{
        width: 2rem;
        float: left;
    }
    .back-icon{
        text-align: center;
        font-size: 30px;
    }
    .header-input{
        padding-left: 10px;
        flex:1;
        background: #fff;
        border-radius:.3rem;
        margin-top: .3rem;
        margin-left: .6rem;
        height: 2rem;
        color:#ccc;
        line-height: 2rem;
        font-size: 15px;
    }
    .header-right{
        min-width: 2.8rem;
        padding: 0 .3rem;
        float: right;
        text-align: center;
        font-size: 14px
    }
    .swiper-area{ 
        clear:both;
        max-height:8rem;
        overflow: hidden;
    }
   
    .type-bar{
    background-color:#fff;
    margin: 0 .3rem .3rem .3rem;
    /* border-radius: .3rem; */
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap

}
    .type-bar div{
        padding: .3rem;
        font-size: 12px;
        text-align: center;
    }
    .recommend-title{
        /* margin-top: 25px; */
        line-height: 40px;
        background: #eee;
        text-align: 25px;
    }
    .item{
        overflow: hidden;
        display: flex;
        height: 95px;
        border-bottom: 1px solid #eee !important;
    }
    .item-img{
        width: 85px;
        height:85px;
        padding: 5px;
    }
    .item-info{
        flex: 1;
        padding: 5px;
        min-width: 0
    }
    .item-info .item-title{
        display:block;
        line-height: 27px;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
   .item-info .item-desc{
       display:block;
        line-height: 20px;
        color: #ccc;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
   }
   .item-info .item-button{
       padding: 5px;
       border-radius: 3px;
       margin-top: 2px;
       background: #ff9300;
       color: #fff;
       font-size: 13px;

   }
   .header-right{
       color: #fff
   }
</style>