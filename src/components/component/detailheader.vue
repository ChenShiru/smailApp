<template>
    <div>
    
        <router-link tag="div" to="/main" class="header-abs" v-show="showAbs">
            <div class="iconfont back-icon">&#xe61f;</div>
        </router-link>
        <div class="header-fixed" v-show="!showAbs"
        :style="opacityStyle">
             <router-link to="/main">
                <div class="iconfont header-back-icon">&#xe61f;</div>
            </router-link>
            景点详情
        </div>
        
      
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAbs: true,
                opacityStyle:{
                    opacity:0
                }
            }
        },
        methods:{
            handleScroll(){
                const top = document.documentElement.scrollTop
                if(top>60){
                    let opacity = top/140
                    opacity = opacity > 1?1:opacity
                    this.opacityStyle = {opacity}
                    this.showAbs = false
                }else{
                    this.showAbs = true
                }
            }
        },
        mounted(){
            window.addEventListener('scroll',this.handleScroll)
        }
    }
</script>

<style scoped>
.header-abs{
    position: absolute;
    left: .6rem;
    top: .6rem;
    width: 2rem;
    height: 2rem;
    border-radius:1rem;
    background: rgba(0, 0, 0, .8)
}
.back-icon{
    color: #fff;
    font-size: 1.8rem;
}
.header-fixed{
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    height:2.2rem ;
    line-height: 2.2rem;
    text-align: center;
    color: #fff;
    background:  #00bcd4;
    font-size: 1rem;
}
.header-back-icon{
        position: absolute;
        top: 0;
        left: 0;
        width: 1.5rem;
        text-align: center;
        font-size: 1.8rem;
        color: #fff;
    }
</style>