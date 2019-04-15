<template>
    <div class="container" @click="handleGallaryClick">
        <div class="wrapper">
            <!-- <van-swipe @change="onChange">
                <van-swipe-item v-for="(item,index) of imgs" :key="index"> 
                    <img width="100%" :src="item" alt="">
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator">
                    {{ current + 1 }}/2
                </div>
            </van-swipe> -->
             <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in imgs" :key="index">
                            <img :src="item" width="100%">    
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
 import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        props:{
            imgs:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            swiper,
            swiperSlide,
        },
        data() {
            return {
                 swiperOption:{
                    pagination:{
                        el:'.swiper-pagination',
                        type:'fraction',
                       
                    },
                    observeParents:true,
                        observer:true
                },
                current: 0
            }
        },
        methods: {
            onChange(index) {
            this.current = index;
            },
            handleGallaryClick(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #000;

}
.wrapper{
    overflow: hidden;
    height: 0;
    width: 100%;
    padding-bottom: 100%;

}
.gallary-img{
    width: 100%
}
.swiper-pagination{
    color: #fff;
    /* margin-left: 9rem;
    font-size: 15px; */
}
</style>