<template>
    <div>
        <div class="area"  @click="clickCity">
                    <div class="title">热门城市</div>
                    <div class="button-list">
                        <div class="button-wrapper"
                         v-for="item of hotcity"
                          :key="item.id"
                         >
                            <div class="button">{{item.name}}</div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
    export default {
        props:{
            hotcity:Array
        },
        methods:{
            clickCity(){
                console.log(111)
            }
        }
    }
</script>

<style scoped>
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
</style>