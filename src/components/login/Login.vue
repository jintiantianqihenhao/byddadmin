<template>
  <div class="login">
        
        <div class="loginBg">
              <img src="../../assets/bj2.png" alt="">
        </div>
        <div class="loginTxt">
              <div class="loginHeader">
                   <div class="appLogo" @click="pushHome()"><img src="../../assets/login_logo.png" alt=""></div>
                   <div class="regLoginDiv">
                        <div class="regItem" @click="pushReg()">注册</div>
                        <div class="telusItem">联系我们</div>
                   </div>
              </div>
              <div class="loginBox">
                     <div class="loginBoxTitle">欢迎登录百鱼定制</div>
                     <div class="loginInputBox">
                         <div class="loginInputIcon">
                              <div class="iconDiv"><img src="../../assets/login_sj.png" alt=""></div>
                         </div>
                         <div class="inputBox">
                             <input type="text" placeholder="请输入手机号码" v-model="username" />
                         </div>
                     </div>
                     <div class="loginInputBox" style="margin-top:10px;">
                         <div class="loginInputIcon">
                              <div class="iconDiv"><img src="../../assets/login_pass.png" alt=""></div>
                         </div>
                         <div class="inputBox">
                             <input type="password" placeholder="请输入密码" v-model="userpwd" />
                         </div>
                     </div>
                     <div class="loginBtn" @click="login()">登录</div>
                      
                     <div class="forgetDiv">
                         <div class="forgetTitle" @click="psuhGetPassBack()">忘记密码</div>
                         <div class="regTitle" @click="pushReg()">注册</div>
                     </div>
              </div>
              
        </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
        typeVal: 1,
        typeList: [
        {
          id: 1,
          name: '运营商'
        },
        {
          id: 2,
          name: '生产商'
        }
       ],
      username: 'admin',
      userpwd: '111111'
    }
  },
  methods: {
     pushHome(){
         this.$router.push('/home');
      },
      //跳转注册 
      pushReg(){
         this.$router.push('/reg');
      },
      psuhGetPassBack(){
         this.$router.push('/getPassBack');
      },
      // 登录
      login () {

          // if (this.username !== '' && this.userpwd !== '') {
          //      this.loginAPI();
          // } else {
          //   // alert("请输入正确的登录信息");

          // }
          if(this.username.length==0){
             this.$toast.show('请输入手机号码');
             return;
          }
          if(this.userpwd.length==0){
             this.$toast.show('请输入密码');
             return;
          }
          this.loginAPI();
      },
      loginAPI(){
             var url =  this.HOST+'/bmcs/api/users/login';
             console.log('url~~~~~~~~',this.HOST);
             this.$axios.post(url,{
               mobilePhone:this.username,
               passWord:this.userpwd 
             })
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        var token = data.result.token;
                        var realName = data.result.realName;
                        var accountType = data.result.accountType;
                        localStorage.setItem('token',token);
                        localStorage.setItem('realName',realName);
                        localStorage.setItem('accountType',accountType);

                        //  var token = data.result;
                        //  localStorage.setItem('token',token);


                        this.$router.push('/index');
                   }else{
                      this.$toast.show(data.message);
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      }
  }
}
</script>


<style  scoped  lang="less">
.login{
   width: 100%;
   height: 100%;
   min-width: 1200px;
   min-height: 800px;
   position: relative;
   overflow: hidden;
   .loginBg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
   }
   .loginTxt{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .loginHeader{
         margin: 0 auto;
         margin-top: 44px;
         width: 1200px;
         height: 49px;
         overflow: hidden;
         .appLogo{
            float: left;
            width: 176px;
            height: 49px;
            cursor: pointer;
            img{
              width: 100%;
              height: 100%;
            }
         }
         .regLoginDiv{
            float: right;
            height: 49px;
            overflow: hidden;
            display: flex;
            align-items: center;
            cursor: pointer;
            .loginItem{
                width:60px;
                height:25px;
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:25px;
                overflow: hidden;
                text-align: center;
            }
            .regItem{
                width:60px;
                height:25px;
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:25px;
                overflow: hidden;
                text-align: center;
            }
            .telusItem{
                 width:80px;
                height:25px;
                font-size:18px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:25px;
                overflow: hidden;
                text-align: center;
            }
         }
      }
      .loginBox{
         margin: 0 auto;
         margin-top:127px;
         width:526px;
         height:540px;
         background:rgba(0,0,0,0.59);
         border-radius:15px;
         overflow: hidden;
         .loginBoxTitle{
            margin: 0 auto;
            margin-top: 51px;
            width:320px;
            height:56px;
            font-size:40px;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:56px;
            text-align: center;
         }
         .loginInputBox{
             margin: 0 auto;
             margin-top: 120px;
             width: 352px;
             height: 50px;
             border-bottom: 1px solid #fff;
             display: flex;
             .loginInputIcon{
               width: 23px;
               height: 50px;
               display:flex;
               align-items: center;
               .iconDiv{
                  width: 19px;
                  height: 23px;
                  img{
                      width: 100%;
                      height: 100%;
                  }
               }
             }
             .inputBox{
               width: 300px;
               height: 50px;
               input{
                    width: 100%;
                    height: 50px;
                    padding: 0 10px;
                    line-height: 50px;
                    font-size: 16px;
                    color: #3b3b3b;
                    background:transparent;
                    color: white;
                    box-sizing: border-box;
                }
             }
         }
         .loginBtn{
              cursor: pointer;
              margin: 0 auto;
              margin-top:27px;
              width:352px;
              height:44px;
              background:rgba(255,255,255,1);
              border-radius:22px;
              font-size:16px;
              font-weight:400;
              color:rgba(60,166,170,1);
              line-height:44px;
              text-align: center;
         }
         .forgetDiv{
              cursor: pointer;
              margin: 0 auto;
              margin-top:10px;
              width:352px;
              height:30px;
              overflow: hidden;
              .forgetTitle{
                    float: left;
                    width:60px;
                    height:30px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:30px;
              }
              .regTitle{
                    float: right;
                    width:60px;
                    height:30px;
                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:30px;
                    text-align: right;
              }
         }
      }
   }
}
</style>
