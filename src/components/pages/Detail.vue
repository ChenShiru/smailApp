<template>
    <div>
        <div class="banner" @click="handleBannerClick">
            
            <img class="banner-img" :src="bannerImg" alt="">
            <div class="banner-info">
                <div class="banner-title">{{sightName}}</div>
                <div class="banner-number">
                    <span class="iconfont banner-icon">&#xe691;</span>
                    19
                </div>
            </div>
        </div>
        <fade>
            <gallary :imgs="gallaryImgs" @close="handleClose" v-show="showGallary"></gallary>
        </fade>
        <!-- <detailheader><detailheader> -->
        <Detailheader></Detailheader>
        <div class="content">
            <List :list="list"></List>
        </div>
    </div>
</template>

<script>
    import Gallary from '@/components/component/gallary'
    import Detailheader from '@/components/component/detailheader'
    import List from '@/components/component/List'
    import axios from 'axios'
    import fade from '@/components/component/fade'
    export default {
        components:{
            Gallary,
            Detailheader,
            List,
            fade
        },
        mounted(){
            this.getDatailInfo()
        },
        data() {
            return {
                showGallary:false,
                bannerImg:'',
                sightName:'',
                gallaryImgs:[],
                list:[]
            }
        },
        methods:{
            handleBannerClick(){
               
                 this.showGallary = true
            
            
            },
            handleClose(){
                this.showGallary = false
            },
            getDatailInfo(){
                axios.get('/api/detail.json',{
                    params:{
                        id:this.$route.params.id
                    }
                }).then(this.handleGetDataSucc)
            },
            handleGetDataSucc(res){
                res = res.data
                if(res.ret && res.data){
                    const data = res.data
                    console.log(data)
                    this.sightName = data.sightName
                    this.bannerImg = data.bannerImg
                    this.gallaryImgs = data.gallaryImgs
                    this.list = data.categoryList
                }
            }
        }
    }
</script>

<style scoped>
.banner{
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
}
.banner-img{
    width: 100%;
}
.banner-info{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 1.5rem;
    color:#fff;
}
.banner-title{
    flex: 1;
    font-size: 16px;
    padding: 0rem .6rem;
}
.banner-number{
    margin-top: .5rem;
    padding:0 .8rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-radius: .6rem;
    background: rgba(0, 0, 0, .8);
    font-size: 12px
}
.banner-icon{
    font-size: 12px
}
.content{
    height: 50rem;
}
</style>