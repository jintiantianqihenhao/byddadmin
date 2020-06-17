<template>
  <div class="userListView">

         <div class="listView">
                 <div class="listViewHeader">
                       <!-- <div class="viewItem" style="width:250px;">uuid</div> -->
                       <div class="viewItem" >经销商</div>
                       <div class="viewItem" >操作时间</div>
                       <div class="viewItem" >类型</div>
                       <div class="viewItem" >说明</div>
                       <div class="viewItem" >金额</div>
         
                       <div class="viewItem" style="border-right: 1px solid #ffd77a;width: 130px;">账号余额</div>
                 </div>
                 <div class="listViewItem" v-for="(obj,index) in list" :key="index">
                       <!-- <div class="viewItem" style="width:250px;">{{obj.uuid}}</div> -->
                       <div class="viewItem" >{{obj.realName?obj.realName:'无'}}</div>
                        <div class="viewItem" >{{obj.opearteTime?(dateFormattter(obj.opearteTime)):'无'}}</div>
                       <div class="viewItem" >{{getOrderType(obj.operateType)}}</div>
                       <div class="viewItem" >{{obj.opearteContent}}</div>
                       <div class="viewItem" >¥{{obj.opearteMoney?obj.opearteMoney:'无'}}</div>
                       <div class="viewItem actItem" style="border-right: 1px solid #ececec;width:130px;">
                            ¥{{obj.accountBlance?obj.accountBlance:'无'}}
                       </div>

                 </div>

                 <div class="pagination">
                    <Page :current="current" :total="total" :page-size="size" @on-change="pageChange"></Page>
                </div>
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
     
    }
  },
  mounted(){
     this.getList();
  },
  methods:{
     
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
      //获取订单状态
      getOrderType(val){
          var str ='';
          if(val){
              if(val=='01'){
                  str = '充值';
              }else if(val=='02'){
                  str = '提现';
              }else if(val=='03'){
                  str = '收入';
              }else if(val=='04'){
                  str = '支出';
              }else if(val=='05'){
                  str = '下单商品';
              }else if(val=='06'){
                  str = '下单运费';
              }else if(val=='07'){
                  str = '取消商品';
              }else if(val=='08'){
                  str = '取消运费';
              }
          }
          return str;
      },
     pageChange(page) {
            this.current = page;
            this.getList();
     },
     getList(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/agents/account/detail/all?page='+this.current+'&size='+this.size;
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   this.list = data.result.list;
                   this.total = data.result.total;
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
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.userListView{
    width: 100%;
    height: 100%;
}
.listView{
   margin-top: 10px;
   margin-left: 10px;
   width: 1700px;
   height: 900px;
   overflow: auto;

   .listViewHeader{
       width: 100%;
       height: 50px;
          display: flex;
   justify-content: center;
   align-items: center;
      //  background:#fff9e6;

       .viewItem{
         //float: left;
         // width: 150px;
         flex: 1;
          height: 50px;
          border: 1px solid #ffd77a;
          background-color: #fff9e6;
          // border-bottom: none;
          border-right: none;
          line-height: 50px;
          font-size: 15px;
          text-align: center;
          color:#17233d;
       }
   }
   .listViewItem{
      // width: 880px;
       height: 50px;
       cursor: pointer;
       display: flex;
       justify-content: center;
      align-items: center;
       //  border: 1px solid #000;
       
       .viewItem{
          //float: left;
          //width: 150px;
          flex: 1;
          height: 50px;
          border: 1px solid #ececec;
          border-top: none;
          border-right: none;
          line-height: 50px;
          font-size: 12px;
          text-align: center;
          color:#17233d;
          
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
      background: white;
   }
   .listViewItem:hover{
        background:#fff9e6;
    }
    //页码
    .pagination{
          //width:780px;
          height:50px;
          // border:1px solid #e8eaec;
          background: white;
          display:flex;
          align-items: center;
          border-top:none;
          .ivu-page{
            margin: 0 auto;
          }
    }
}


</style>
