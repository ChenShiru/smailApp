<template>
    <div>
       <div class="item" v-for="(item,index) of list" :key="index">
           <div class="item-title">
               <span class="item-title-icon"></span>
               {{item.title}}
           </div>
           <div v-if="item.children" class="item-children">
               
               <List :list="item.children"></List>
           </div>
       </div>
       
    </div>
</template>

<script>
    export default {
        name:'List',
       props:{
           list:Array
       } 
    }
</script>

<style  scoped>
.item-title-icon{
    display: inline-block;
    position: relative;
    left: .18rem;
    top:.18rem;
    width: 1.1rem;
    height: 1.1rem;
    background: url(http://s.qunarzz.com/piao/image/touch/sight/detail.png) 0 -1.3rem no-repeat;
    margin-right: .3rem;
    background-size: 1.2rem 9rem;
}
.item-title{
    line-height: 2rem;
    font-size: 14px;
    padding: 0 .6rem;
}
.item-children{
    padding: 0 .6rem
}
</style>