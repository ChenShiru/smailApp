<template>
    <div>
        <div class="categoryNav">
           <van-nav-bar
                title="类别列表"
            />
        </div>
        <div>
             <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item,index) in category" :key="index" :class="{categoryActive:categoryIndex==index}" @click="clickCategoryIndex(index,item.ID)">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" :ellipsis='false'>
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                category: [],
                categoryIndex:0,
                active:0,
                categorySub:[]
                
            }
        },
        created(){
            this.getCategory()
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById("leftNav").style.height= winHeight-46 +'px'
        },
        methods:{
            getCategory(){
                axios({
                    url:url.getCategoryList,
                    method:'get'
                })
                .then(res=>{
                    console.log(res)
                    if(res.data.code == 200 && res.data.message){
                        this.category = res.data.message
                        this.getCategorySubByCategoryId(this.category[0].ID)
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }
                })
                .catch(err=>{
                    
                })
            },
            clickCategoryIndex(index,categoryId){
                this.categoryIndex = index
                this.active = 0
                this.getCategorySubByCategoryId(categoryId)
                
            },
            getCategorySubByCategoryId(categoryId){
                axios({
                    url:url.getCategorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(res=>{
                    if(res.data.code == 200 && res.data.message){
                         this.categorySub = res.data.message
                    }else{
                        Toast('服务器错误，加载失败')
                    }
                  
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
#leftNav{
    background-color:#ff9999
}
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
</style>