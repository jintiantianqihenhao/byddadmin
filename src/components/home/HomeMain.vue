<template>
    <div class="home">
               <!-- 顶部的导航view -->
               <div class="navView">
                     <a class="appLogo" title="百鱼定制" @click="pushHome()"><img src="../../assets/app_logo.png" alt=""></a>
                     <div class="loginOutDiv">
                         <div class="userIcon"><img src="../../assets/login_user.png" alt=""></div>
                         <div class="userName">{{realName}}</div>
                         <div class="logOUTBtn" @click="loginOut()">退出</div>
                     </div>
               </div>
               <div class="leftContainer">
                    <!-- 右边的菜单 -->
                    <div class="menuView">
                          <div class="menuItem" @click="menuItemAction(1)" :class="{menuItemActive:menuIndex==1}">
                              <div class="menuItemLogo"><img src="../../assets/menu_set_icon.png" alt=""></div>
                              <div class="menuItemTitle">用户列表</div>
                          </div>
<!--                           <div class="menuItem" @click="menuItemAction(2)" :class="{menuItemActive:menuIndex==2}" title="DIY">
                              <div class="menuItemLogo"><img src="../../assets/menu_set_icon.png" alt=""></div>
                              <div class="menuItemTitle">未生成打印图订单</div>
                          </div>
                           <div class="menuItem" @click="menuItemAction(3)" :class="{menuItemActive:menuIndex==3}" title="AI">
                              <div class="menuItemLogo"><img src="../../assets/menu_set_icon.png" alt=""></div>
                              <div class="menuItemTitle">未生成标签图订单</div>
                          </div> -->
                          <div class="menuItem" @click="menuItemAction(4)" :class="{menuItemActive:menuIndex==4}" title="作品">
                              <div class="menuItemLogo"><img src="../../assets/menu_set_icon.png" alt=""></div>
                              <div class="menuItemTitle">作品列表</div>
                          </div>
                          <div class="menuItem" @click="menuItemAction(5)" :class="{menuItemActive:menuIndex==5}" title="资金明细">
                              <div class="menuItemLogo"><img src="../../assets/menu_set_icon.png" alt=""></div>
                              <div class="menuItemTitle">资金明细</div>
                          </div>
                     
                    </div>

                    
               </div>

               <div class="mainView">
                      <transition name="move" mode="out-in"><router-view></router-view></transition>
               </div>




    </div>
</template>

<script>
export default {
  name:'home',
  data() {
    return {
      menuIndex:1,
      realName:'',
      isAdmin:false,
    }
  },
  mounted(){
      this.realName = localStorage.getItem('realName');
  },
  methods: {
      pushHome(){
         this.$router.push('/home');
      },
      menuItemAction(index){
         this.menuIndex = index;
         //首页
         if(index==1){
            this.$router.push('/userMainPage');
         }
         //diy
         else if(index==2){
            this.$router.push('/printList');
         }
         //打印
         else if(index==3){
            this.$router.push('/printList2');
         }
          //作品
         else if(index==4){
            this.$router.push('/works');
         }
          //资金明细
         else if(index==5){
            this.$router.push('/moneyLog');
         }
       
         
      },
      loginOut(){
          //bmcs/api/users/exit
            var token = localStorage.getItem('token');
            var url =  this.HOST+'/bmcs/api/users/exit';
             this.$axios.post(url,null,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   this.$toast.show('退出成功');
                   localStorage.setItem('token','');
                   this.$router.push('/login');
                
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      }
  }
}
</script>

<style  scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  position: relative;
}
.home .mainView{
    height: 100%;
    overflow-x: scroll;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: absolute;
    display: flex;
    top:45px;
    left:100px;
    right: 0px;
    bottom: 0;
   // min-width: 100%;
   // width: 1890px;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    min-height: 950px;
    /*overflow: hidden;*/
}
 //左边的容器
.home  .leftContainer{
    left: 0;
    top: 45px;
    width: 100px;
    bottom: 0px;
    background:#383D41;
    position: fixed;
    z-index: 999;
    .menuView{
        width: 100%;
        height: 100%;
        overflow: auto;
        .menuItem{
            width: 100%;
            height: 70px;
            font-size: 12px;
            color: #424852;
            cursor: pointer;
            overflow: hidden;
            .menuItemLogo{
                margin: 0 auto;
                margin-top:15px;
                width: 24px;
                height: 22.6px;
                img{
                  width: 100%;
                  height: 100%;
                }
            }
            .menuItemTitle{
                margin: 0 auto;
                margin-top: 5px;
                width: 100%;
                line-height: 20px;
                font-size: 12px;
                text-align: center;
                color: white;
            }
        }
        .menuItem:hover{
            background:#3CA6AA;
        }
        .menuItemActive{
            color: #fff;
            background:#3CA6AA;
        }
    }
}
.home .navView{
    position: fixed;
    width: 100%;
    // width: 1790px;

    top: 0;
    left: 0;
    height: 45px;
    background:#202427;
    font-size: 16px;
    color: #fff;
    z-index: 9999;
    overflow: auto;
    .appLogo{
        float: left;
        margin-left:10px;
        margin-top: 8px;
        width: 104px;
        height: 29px;
        overflow: hidden;
        cursor: pointer;
        display: block;
        img{
            width: 100%;
            height: 100%;
        }
    }
   
    .loginOutDiv{
        float: right;
        margin-right: 30px;
        height: 45px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .userIcon{
            float: left;
            width: 19px;
            height: 23px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .userName{
            float: left;
            margin-left: 6px;
            height:45px;
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:45px;
        }
        .logOUTBtn{
            float: left;
            margin-left: 10px;
            width: 50px;
            height: 40px;
             font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:40px;
            text-align: center;
        }
    }
}
</style>
