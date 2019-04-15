<template>
    <div>
         <div class="header">
        城市选择
            <router-link to="/main">
                <div class="iconfont back-icon">&#xe61f;</div>
            </router-link>
        </div>
        <div class="citySearch">
             <van-field v-model="value" placeholder="请输入城市名或拼音" />
        </div>
        <div class="search-content" ref="search" v-show="value">
            <ul>
                <li class="search-item" v-for="item of list" :key="item.id"  @click="clickCity(item.name)">{{item.name}}</li>
                <li class="search-item" v-show="!list.length">没有找到匹配的数据</li>
            </ul>
        </div>
        <div class="list" ref="wrapper">
            <div>
                <div class="area">
                    <div class="title">当前城市</div>
                    <div class="button-list">
                        <div class="button-wrapper">
                            <div class="button" >{{this.currentCity}}</div>
                        </div>
                    </div>
                </div>
                <div class="area">
                    <div class="title">热门城市</div>
                    <div class="button-list">
                        <div class="button-wrapper"
                         v-for="item of hotCities"
                          :key="item.id"
                          @click="clickCity(item.name)">
                            <div class="button">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="orderList" v-for="(item,key) of cities" :key="key" :ref="key">
                    <div class="title">{{key}}</div>
                        <div class="item-list">
                            <div class="item" v-for="innerItem of item" :key="innerItem.id" @click="clickCity(innerItem.name)">

                                {{innerItem.name}}
                            </div>
                        </div>
                       
                </div>  
            </div>
        </div>
       
            <ul class="alphabet">
                <li class="Alitem" 
                v-for="(item,key) of cities" 
                :key="key"
                :ref="key" 
                @click="handleLetterClick"
                @touchstart.prevent="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd">{{key}}</li>
            </ul>
        
    </div>
   
</template>

<script>
import Bscroll from 'better-scroll'
import hotcity from '@/components/component/hotcity'
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
     export default {
        components:{
            hotcity
        },
        data() {
            return {
                value: '',
                cities:{},
                hotCities:[],
                letter:'',
                touchStatus:false,
                startY:0,
                list:[],
                timer:null
            }
        },
        updated(){
            this.startY = this.$refs['A'][0].offsetTop
        },
        computed:{
            ...mapState({
                currentCity:'city'
            }),
            letters(){
                const letters = []
                for(let i in this.cities){
                    letters.push(i)
                }
                return letters
            }
        },
        mounted(){
            this.scroll = new Bscroll(this.$refs.wrapper,{click:true,tap:true,mousewheel:true})
            this.scroll2 = new Bscroll(this.$refs.search,{click:true,tap:true,mousewheel:true})
            this.getCityInfo()
        },
        methods: {
            ...mapMutations(['changeCity']),
           clickCity(city){
            //    this.$store.commit('changeCity',city)
                this.changeCity(city)
               this.$router.push('/main')
           },
            getCityInfo(){
                axios.get('/api/city.json')
                    .then(this.handleGetCityInfoSucc)
            },
            handleGetCityInfoSucc(res){
                res = res.data
                if(res.ret && res.data){
                    const data = res.data
                    this.cities = data.cities
                    this.hotCities = data.hotCities
                }
                console.log(res)
            },
            handleLetterClick(e){
                // console.log(e.target.innerText)
                this.letter = e.target.innerText
                
            },
            handleTouchStart(){
                this.touchStatus = true
            },
            handleTouchMove(e){
                if(this.touchStatus){
                    // console.log(startY)
                    const touchY = e.touches[0].clientY-58
                    const index = Math.floor((touchY-this.startY)/16)
                    if(index >=0 && index<this.letters.length){
                       this.letter = this.letters[index]
                    }
                    console.log(touchY)
                }
            },
            handleTouchEnd(){
                this.touchStatus =  false
            },
          
        },
        watch:{
            letter(){
                console.log(this.letter)
                if(this.letter){
                    const element = this.$refs[this.letter][0]
                    this.scroll.scrollToElement(element)
                }
            },
            value(){
                if(this.timer){
                    clearTimeout(this.timer)
                }
                if(!this.value){
                    this.list = []
                    return
                }
                this.timer = setTimeout(()=>{
                    const result = []
                    for(let i in this.cities){
                        this.cities[i].forEach((value)=>{
                            if(value.spell.indexOf(this.value)>-1 ||
                            value.name.indexOf(this.value)>-1){
                                result.push(value)
                            }
                        })
                    }
                    this.list = result
                },100)
            }

        }
    }
</script>

<style  scoped>
    .header{
        position: relative;
        overflow: hidden;
        height: 3rem;
        line-height: 3rem;
        text-align: center;
        color: #fff;
        background: #00bcd4;
        font-size: .8rem
    }
    .back-icon{
        position: absolute;
        top: 0;
        left: 0;
        width: 1.5rem;
        text-align: center;
        font-size: 1rem;
        color: #fff;
    }
    .list{
        overflow: hidden;
        position: absolute;
        top:5.2rem;
        left:0;
        right:0;
        bottom:0;
        
    }
    .area{
        border-bottom:1px solid #ccc
    }
    .title{
        line-height: 1.2rem;
        background: #eee;
        padding-left: .4rem;
        color: #666;
        font-size: 14px
    }
    .button-list{
        padding: .3rem 1.5rem .3rem .3rem;
        overflow: hidden;
    }
    .button-wrapper{
        float: left;
        width: 33.33%;
    }
    .button{
        margin: .2rem;
        padding: .15rem 0;
        border-radius: .12rem;
        text-align: center;
        border: .06rem solid #ccc;
        font-size: 14px;
    }
    .item-list .item{
        line-height: 2rem;
        padding-left: .55rem;
        font-size: 14px;
        border-bottom: 1px solid #ccc
    }
    .alphabet{
        position: absolute;
        top:5.5rem;
        right: 0;
        bottom: 0;
        width: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .Alitem{
        line-height: 1rem;
        text-align: center;
        font-size: 14px;
        color:#00bcd4;
    }
    .search-content{
        z-index: 1;
        overflow: hidden;
        position: absolute;
        top: 5rem;
        left: 0;
        right: 0;
        bottom: 0;
        background: #eee
    }
    .search-item{
        line-height: 1.5rem;
        padding-left: .6rem;
        color:#666;
        background: #fff;
        border-bottom: 1px solid #eee;
        font-size: 14px;
    }
</style>