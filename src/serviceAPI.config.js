const BASEURL = "https://www.easy-mock.com/mock/5c19ba6564b4573fc81a6185/SmaieVue/"

const LOCALURL = "http://localhost:3000/"
const URL = {
    getshopingMallInfo: BASEURL+'index',//商城首页所有信息
    getGoodsInfo: BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//用户注册接口
    login:LOCALURL+'user/login'
}
module.exports = URL