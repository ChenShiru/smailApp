<template>
    <div>
 <!-- 周末去哪 -->
            <div class="recommend-title">
                周末去哪儿
            </div>
             <ul>
                 <li class="item" v-for="item of list" :key=item.id>
                    <div class="item-img-wrapper">
                          <img class="item-img" :src="item.imgUrl" alt="">
                    </div>
                     <div class="item-info">
                         <p class="item-title">{{item.title}}</p>
                         <p class="item-desc">{{item.desc}}</p>
                     </div>
                 </li>
             </ul>
    </div>
</template>

<script>
    export default {
        props:{
            list:Array
        },
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
   p,li{
        margin: 0;
        padding: 0;
    }
 .recommend-title{
        /* margin-top: 25px; */
        line-height: 40px;
        background: #eee;
        text-align: 25px;
        font-size:16px; 
    }
    .item-img-wrapper{
        overflow: hidden;
        height: 0;
        padding-bottom: 33.9%
    }
    .item-img{
        width: 100%;
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
</style>