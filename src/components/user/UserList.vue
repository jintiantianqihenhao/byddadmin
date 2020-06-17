<template>
  <div class="userListView">
         <div class="searchView">
            <h4>经销商筛选</h4>
            <div class="searchInpt">
                 <div>
                      <span>用户状态</span>
                      <select v-model="ustateActive" @change="getStateSelected">
                         <option value="0">请选择</option>
                         <option value="1">活跃用户</option>
                         <option value="2">充值</option>
                         <option value="3">下单</option>
                         <option value="4">有作品</option>
                         <option value="5">注册</option>
                      </select>
                 </div>
                 <div>
                      <span>负责人</span>
                      <select v-model="headActive" @change="getHeadSelected">
                         <option value="">请选择</option>
                          <option :value="item.realName" v-for='(item,index) in headList' :key="index">{{ item.realName }}</option>
                      </select>
                 </div>
                 <input type="text" placeholder="请输入邀请人邀请码" style="width:349px" v-model="inviteCode">
                 <input type="text" placeholder="请输入代理商名称、手机号" style="width:349px" v-model="agentName">
                 <Button type="primary" icon="ios-search" @click="queryList">查找</Button>
            </div>
         </div>
        
        <div class="tableView">
         <table class="listView">
                 <tr class="listViewHeader">
                       <!-- <div class="viewItem" style="width:250px;">uuid</div> -->
                       <td class="viewItem" >注册时间</td>
                       <td class="viewItem" >手机号码</td>
                       <td class="viewItem" >称呼</td>
                       <td class="viewItem" >账户余额</td>
                       <td class="viewItem" >渠道</td>
                       <td class="viewItem" >名称备注</td>
                       <td class="viewItem" >微信</td>
                       <td class="viewItem" >用户状态</td>
                       <td class="viewItem" >负责人</td>
                       <td class="viewItem" >备注</td>
                       <td class="viewItem">操作</td>
                 </tr>
                 <tr class="listViewItem" v-for="(obj,index) in list" :key="index">
                       <!-- <div class="viewItem" style="width:250px;">{{obj.uuid}}</div> -->
                       <td class="viewItem" >{{obj.createTime?(dateFormattter(obj.createTime)):'无'}}</td>
                       <td class="viewItem" >{{obj.mobilePhone}}</td>
                       <td class="viewItem" >{{obj.realName}}</td>
                       <td class="viewItem" >¥{{obj.accountBlance}}</td>
                       <td class="viewItem" style="">{{obj.parentInviteCode?obj.parentInviteCode:'无'}}</td>
                       <td class="viewItem" style="text-decoration: underline;color:#3CA6AA;font-weight: bold;" @click="showAddMarkModelAction(1,obj)">
                               {{obj.realNameRemark?obj.realNameRemark:'无'}}
                       </td>
                       <td class="viewItem" style="text-decoration: underline;color:#3CA6AA;font-weight: bold;" @click="showAddMarkModelAction(2,obj)">
                              {{obj.weChat?obj.weChat:'无'}}
                       </td>
                       <td class="viewItem">
                             {{obj.agentLevel==1?"活跃用户":obj.agentLevel==2?"充值":obj.agentLevel==3?"下单":obj.agentLevel==4?"有作品":obj.agentLevel==5?"注册":"无"}}
                       </td>

                       <td class="viewItem" style="text-decoration: underline;color:#3CA6AA;font-weight: bold;" @click="showAddMarkModelAction(4,obj)">{{obj.chargePerson?obj.chargePerson:'无'}}</td>
                       <td class="viewItem">
                            {{obj.remark?obj.remark:''}}
                            <span class="addBtn" @click="showAddMarkModelAction(3,obj)">添加</span>
                            <span class="historyBtn" @click="showHistory(index)" v-if="obj.remarkRecordInfos.length>1">历史
                            <div v-show="activeIndex===index" class="histDowin" @click.stop="showHistory(-1)"><p v-for="item in obj.remarkRecordInfos">{{ item.oldRemark }}</p></div> </span>

                       </td>
                       <td class="viewItem">
                            <span class="addMoneyBtn" style="text-decoration: underline;color:#3CA6AA;font-weight: bold;" @click="showAddMoneyModal(obj)">添加余额</span>
                            <!-- <div class="delUserBtn" @click="delAction(obj)">删除</div> -->
                       </td>

                 </tr>
              </table>
              <div class="pagination">
                    <Page :current="current" :total="total" :page-size="size" @on-change="pageChange"></Page>
              </div>

         </div>
          <!-- 添加金额的modal -->
         <div id="addMoneyModal" v-show="isShowAddMoneyModal">
               <div class="maskContentView">
                     <div class="closeBtn" @click="isShowAddMoneyModal=false" style="cursor: pointer;">
                           <div class="closeDiv">
                              <img src="../../assets/close_blue.png" style="width:100%;height:100%;">
                           </div>
                     </div>
                     <div class="title">添加金额</div>
                      <div class="checkDivBox">
                           <!-- 是  -->
                           <div class="checkItem" @click="changeTypeStyle(1)" style="margin-left:0px;">
                                 <div class="checkDiv" >
                                    <div class="checkDIv1" v-show="type==1"><img src="../../assets/ask_checked.png" alt=""></div>
                                    <div class="checkDIv1" v-show="type!=1"><img src="../../assets/ask_normal.png" alt=""></div>
                                 </div>
                                 <div class="checkTit">客服充值</div>
                           </div>
                           <!-- 否  -->
                           <div class="checkItem" @click="changeTypeStyle(2)" style="margin-left:50px;">
                                 <div class="checkDiv" >
                                    <div class="checkDIv1" v-show="type==2"><img src="../../assets/ask_checked.png" alt=""></div>
                                    <div class="checkDIv1" v-show="type!=2"><img src="../../assets/ask_normal.png" alt=""></div>
                                 </div>
                                 <div class="checkTit">客服扣款</div>
                           </div>
                     </div>
                     <div class="rowItem">
                           <input type="number" class="myInput" placeholder="请输入金额" v-model="moneyInput">
                     </div>
                     <div class="rowItem">
                           <!-- <Button type="primary" @click="chagreAPI()" style="width:160px;">确定</Button> -->
                           <div class="btn" @click="chagreAPI()">确定</div>
                     </div>
               </div>
               <div class="maskView" @click="isShowAddMoneyModal=false"></div>
         </div>


          <!-- 添加备注的modal -->
         <div id="addMarkModal" v-show="isShowAddMarkModal">
               <div class="maskContentView">
                     <div class="closeBtn" @click="isShowAddMarkModal=false" style="cursor: pointer;">
                           <div class="closeDiv">
                              <img src="../../assets/close_blue.png" style="width:100%;height:100%;">
                           </div>
                     </div>
                     <div class="title" v-if="showAddMarkType==1">名称备注</div>
                     <div class="title" v-else-if="showAddMarkType==2">微信</div>
                     <div class="title" v-else-if="showAddMarkType==3">备注</div>
                     <div class="title" v-else-if="showAddMarkType==4">负责人</div>
                     <div class="rowItem">
                           <input type="text" class="myInput" :placeholder="getRemakrPlocher(showAddMarkType)" v-model="remarkInput">
                     </div>
                     <div class="rowItem" style="border:none;">
                           <!-- <Button type="primary" @click="chagreAPI()" style="width:160px;">确定</Button> -->
                           <div class="btn" @click="updateRemarkAPI()">确定</div>
                     </div>
               </div>
               <div class="maskView" @click="isShowAddMarkModal=false"></div>       
         </div>
                
  </div>
</template>

<script>
let dayjs = require('dayjs');
export default {
  name: 'userListView',
  data () {
    return {
      current:1,
      total:0,
      size:15,
      list:[],
      moneyInput:'',
      isShowAddMoneyModal:false,
      editObj:null,
      type:1,
      isShowAddMarkModal:false,
      showAddMarkType:1,
      remarkInput:'',
      activeIndex:-1,   //
      headList:[],

      headActive:'',
      ustateActive:'0',
      inviteCode:'',
      agentName:''
    }
  },
  mounted(){
     this.getList();
     this.getHead();
  },
  methods:{
     showAddMarkModelAction(index,obj){
         this.isShowAddMarkModal = true;
         this.showAddMarkType = index;
         this.editObj = obj;
         if(this.showAddMarkType==1){
             this.remarkInput = obj.realNameRemark;
         }else if(this.showAddMarkType==2){
            this.remarkInput = obj.weChat;
         }else if(this.showAddMarkType==3){
            this.remarkInput = '';
         }else if(this.showAddMarkType==4){
            this.remarkInput = obj.chargePerson;
         }
     },
     getRemakrPlocher(index){
        if(index==1){
           return '请输入名称备注';
        }else if(index==2){
           return '请输入微信';
        }else if(index==3){
           return '请输入备注';
        }
     },
     updateRemarkAPI(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/agents/update';

             if(this.showAddMarkType==4){
                url= this.HOST+'/bmcs/api/agents/update/charge/person';  //修改负责人的接口
              }
             var param={
                 uuid:this.editObj.uuid,
                 realNameRemark:this.remarkInput
             }
             if(this.showAddMarkType==1){
                param={
                  uuid:this.editObj.uuid,
                  realNameRemark:this.remarkInput
               }

             }else if(this.showAddMarkType==2){
                   param={
                  uuid:this.editObj.uuid,
                  weChat:this.remarkInput
                }
             }else if(this.showAddMarkType==3){
                  param={
                     uuid:this.editObj.uuid,
                     remark:this.remarkInput
                  }
             }else if(this.showAddMarkType==4){
                  param={
                     uuid:this.editObj.uuid,
                     chargePerson:this.remarkInput
                  }
             }
             this.$axios.post(url,
              param,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        this.$toast.show('操作成功');
                        this.isShowAddMarkModal = false;
                        this.getList();
                   }else{
                        this.$toast.show('操作失败');
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
     },
     dateFormattter(date){
        var formatterDateStr = '';
        //兼容ios
        var dealDate = new Date(date.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', ''))
        if(date){
            //当前时区偏移 相对  格林区
            var offset = new Date().getTimezoneOffset()* 60 * 1000;
            // formatterDateStr = dayjs(dealDate.getTime()-offset).format('YYYY-MM-DD HH:mm');
            formatterDateStr = dayjs(date).format('YYYY-MM-DD HH:mm');
            return formatterDateStr;
        }
        return '';
      },
     delAction(obj){
          this.$toast.show('暂无此功能');
     },
     changeTypeStyle(index){
         this.type = index;
     },
     showAddMoneyModal(obj){
        this.editObj= obj;
         this.type = 1;
        this.isShowAddMoneyModal = true;
     },
     showHistory(indx){
       // console.log(indx)
         if(this.activeIndex == indx){
          this.activeIndex = -1;
         }else{
          this.activeIndex = indx;
         }
         

     },
     pageChange(page) {
            this.current = page;
            this.getList();
     },
     getList(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/agents/list?page='+this.current+'&size='+this.size+'&startTime=&endTime=&isPay=&mobilePhone=';
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
               //console.log(res,"-----------lll")
     
                   var data = res.data;
                    this.list = data.result.list;

                   this.total = data.result.total;
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      getHead(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/sys/users/all';
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
               //console.log(res,"-----------负责人列表")
               var data = res.data;
               this.headList =data.result;
              
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      chagreAPI(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/agents/operat/money';
             this.$axios.post(url,
              {
                uuid:this.editObj.uuid,
                operatMoney:this.moneyInput,
                type:this.type
              },
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        this.$toast.show('操作成功');
                        this.isShowAddMoneyModal = false;
                        this.getList();
                   }else{
                        this.$toast.show('操作失败');
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      getStateSelected(e){
         console.log(e.target.value)
          this.ustateActive = e.target.value; 
      },
      getHeadSelected(e){
        this.headActive = e.target.value; 
      },
      queryList(){
              var token = localStorage.getItem('token');
               var agentStatus = '';
               if(this.ustateActive){
                     agentStatus = this.ustateActive;
               }else{
                     agentStatus = '';
               }

                var inviteCode = '';
               if(this.inviteCode){
                     inviteCode = this.inviteCode;
               }else{
                     inviteCode = '';
               }

                var agentName = '';
               if(this.agentName){
                     agentName = this.agentName;
               }else{
                     agentName = '';
               }

                var headActive = '';
               if(this.headActive){
                     headActive = this.headActive;
               }else{
                     headActive = '';
               }


              var url =  this.HOST+'/bmcs/api/agents/list?page='+this.current+'&size='+this.size+'&agentStatus='+agentStatus+'&parentInviteCode='+inviteCode+'&searchInfo='+agentName+'&chargePerson='+headActive;
             // if(!this.ustateActive && !this.inviteCode && !this.agentName && !this.headActive){
             //    this.$toast.show('请输入要查询的条件');
             //    return false
             // }
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                    console.log(res)
                   var data = res.data;
                    this.list = data.result.list;

                   this.total = data.result.total;
             })
             .catch((e)=>{
                 console.log('e',e);
             })       
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.userListView{
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-left: 10px;
}
.searchView{
  background: #fff;
  margin-bottom: 10px;
  padding:0 20px 20px;
  overflow: hidden;
  h4{
    font-weight: bold;
    margin:15px 0;
 
  }
  .searchInpt{
    font-size: 15px;
    display: flex;
    align-items: center;
    div,input{
      margin-right: 30px;
    }
    select{
      background: #fff;
      height: 38px;
      border:1px solid #e8e8e8;
      padding: 0 10px;
      margin-left: 6px;
      border-radius: 2px;
      color: #A2A2A2; 
      width: 110px;  
        outline:none;  
    }
    input{
       background: #fff;
      height: 38px;
      border:1px solid #e8e8e8;  
      color: #A2A2A2; 
      padding:0 15px;
    }
  }
}
.tableView{
background: #fff;
padding:15px;
    //页码
    .pagination{
         // width:780px;
          height:50px;
          // border:1px solid #e8eaec;
          background: white;
          display:flex;
          align-items: center;
          border-top:none;
          margin-top: 15px;
          .ivu-page{
            margin: 0 auto;
          }
    }
}
.listView{
/*   margin-top: 10px;
   margin-left: 10px;*/
   width: 100%;
  // table-layout: fixed;
   border-collapse: collapse;
   //height: 900px;
   overflow: auto;
   .listViewHeader{
      /* width: 1450px;*/
       height: 50px;
      //  background:#fff9e6;

       .viewItem{
        // float: left;
         // width: 121px;
          height: 50px;
         // border: 1px solid #ffd77a;
          background-color: #F2F9F9;
          //border-bottom:1px solid #ececec;
          border-right: none;
          //line-height: 50px;
          font-size: 15px;
          text-align: center;
          color:#17233d;

       }
   }
   .listViewItem{
       width: 1450px;
       height: 50px;
       cursor: pointer;
      //  border: 1px solid #000;
       
       .viewItem{
          /*float: left;*/
         /* width: 150px;*/
         max-width: 218px;
          height: 50px;
         // border: 1px solid #ececec;
          border-top: none;
          border-right: none;
          //line-height: 50px;
          font-size: 12px;
          text-align: center;
          color:#17233d;
          .addBtn{
            border:1px solid rgb(60, 166, 170);
            padding:2px 6px;
            border-radius: 4px;
            color:rgb(60, 166, 170);
          }
          .historyBtn{
            margin-left: 6px;
            border:1px solid #17233d;
            padding:2px 6px;
            border-radius: 4px; 
            position: relative;
            .histDowin{
              position: absolute;
              top:30px;
              right: -1px;
             /* height: 60px;*/
             padding:4px 6px;
             text-align:left;
              min-width: 300px;
              background: #fff;
              border-radius: 4px;
              box-shadow: 0 0 10px rgba(0,0,0,.2);
              z-index: 11;
              color:#515a6e;
              line-height: 20px;
            }
            .histDowin::before{
              content: '';
              position: absolute;
              top:-14px;
              right: 10px;
              //width: 10px;
              /*height: 20px;*/
              border-right: 10px solid transparent;
              border-left:10px solid  transparent; 
              border-bottom:14px solid #fff;
              z-index: 1;
            }
            .histDowin::after{
              content: '';
              position: absolute;
              top:-15px;
              right: 10px;
              //width: 10px;
              /*height: 20px;*/
              border-right: 10px solid transparent;
              border-left:10px solid  transparent; 
              border-bottom:15px solid #dcdcdc;
            }     
          }
       }
       .actItem{
          display: flex;
          justify-content: center;
          align-items: center;
          .addMoneyBtn{
             width: 80px;
             height: 30px;
             line-height: 30px;
             text-align: center;
             font-size: 14px;
             background: #3CA6AA;
             color: white;
            //  border: 1px solid #000;
          }
          .delUserBtn{
              margin-left: 10px;
              width: 80px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              font-size: 14px;
              border: 1px solid #000;
          }
       }
   }
   .listViewItem:nth-child(2n+1){
      background: #F2F9F9;

   }
   .listViewItem:hover{
        background:#fff9e6;
    }

}

//新建商品modal
#addMoneyModal{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .maskContentView{
     z-index:1992;
     position: absolute;
     left:50%;
     top:20%;
     width:400px;
     height:222px;
     margin-left:-200px;
     background:rgba(255,255,255,1);
     box-shadow:0px 2px 12px 0px rgba(0,0,0,0.3);
     border-radius:10px;
     background: #ececec;
     animation: contentViewKeyAnimation 0.5s;
     .closeBtn{
         position:absolute;
         right:10px;
         top: 10px;
         width:40px;
         height:40px;
         display:flex;
         align-items: center;
         justify-content: center;
         .closeDiv{
            width:30px;
            height:30px;
            overflow: hidden;
            display:flex;
            align-items: center;
         }
     }
     .title{
        margin: 0 auto;
        margin-top: 10px;
        width: 100%;
        line-height: 30px;
        height: 30px;
        text-align:20px;
        font-weight: bold;
        padding-left: 20px;
        text-align: center;
     }
     .checkDivBox{
        margin: 0 auto;
        margin-top: 20px;
        margin-left:30px;
        height: 36px;
        // border: 1px solid #000;
        overflow: hidden;
        .checkItem{
            float: left;
            margin-top: 8px;
            margin-left: 20px;
            height: 20px;
            cursor: pointer;
            .checkDiv{
              float: left;
              width: 20px;
              height: 20px;
              position: relative;
              .checkDIv1{
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 20px;
                  height: 20px;
                  img{
                    width: 100%;
                    height: 100%;
                  }
              }
            }
            .checkTit{
              float: left;
              margin-left: 5px;
              height:20px;
              font-size:14px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:20px;
            }
        }
     }
     .rowItem{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .myInput{
          font-size: 12px;
          width: 100%;
          height: 100%;
          line-height: 40px;
        }
        .btn{
           background: #3CA6AA;
           line-height: 40px;
           width: 160px;
           text-align:center;
           height: 40px;
           font-size: 15px;
           color: white;
           border-radius:5px;
           overflow: hidden;
           cursor: pointer;
        }
     }

  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.3;
  }
}


//新建商品modal
#addMarkModal{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1991;
  //弹窗内容
  .maskContentView{
     z-index:1992;
     position: absolute;
     left:50%;
     top:20%;
     width:400px;
     height:162px;
     margin-left:-200px;
     background:rgba(255,255,255,1);
     box-shadow:0px 2px 12px 0px rgba(0,0,0,0.3);
     border-radius:10px;
     animation: contentViewKeyAnimation 0.5s;
     .closeBtn{
         position:absolute;
         right:10px;
         top: 10px;
         width:30px;
         height:30px;
         display:flex;
         align-items: center;
         justify-content: center;
         .closeDiv{
            width:20px;
            height:20px;
            overflow: hidden;
            display:flex;
            align-items: center;
         }
     }
     .title{
        margin: 0 auto;
        margin-top: 10px;
        width: 100%;
        line-height: 30px;
        height: 30px;
        text-align:20px;
        font-weight: bold;
        padding-left: 20px;
        text-align: center;
     }
     
     .rowItem{
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 10px;
        height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius:2px;
        border:1px solid rgba(0,0,0,0.1);
        .myInput{
          font-size: 12px;
          width: 100%;
          height: 100%;
          line-height: 40px;
          padding-left: 10px;
        }
        .btn{
           background: #3CA6AA;
           line-height: 40px;
           width: 160px;
           text-align:center;
           height: 40px;
           font-size: 15px;
           color: white;
           border-radius:5px;
           overflow: hidden;
           cursor: pointer;
        }
     }

  }
  @keyframes  contentViewKeyAnimation{
      0%{
         transform: scale(0);
      }
      150%{
         transform: scale(1)z
      }
  }
  .maskView{
     position: absolute;
     z-index: -1;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background-color: rgb(0, 0, 0);
     opacity: 0.3;
  }
}
</style>
