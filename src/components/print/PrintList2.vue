<template>
  <div class="print">
          <div class="dyTitle">查询未生成标签图订单</div>
          <div class="actionView">
                 <div class="ksdytpBtn" @click="fastPrintAPI()">快速打印{{unprintCount}}个图</div>
                 <div class="ksdytpBtn" style="margin-left:10px;width:160px;" @click="pushHistoryPrint()">历史打印</div>
                 <!-- <div class="sxTitle">未打印的数量:<span style="color:red;">{{unprintCount}}</span></div> -->
          </div>
          <!-- 列表wrapper view  -->
          <div class="listWrapperView">
                <div class="listWVH">
                     <!-- 全选 div -->
                     <div class="checkBox" @click="checkAllAction()">
                         <div class="checkIcon">
                              <img src="../../assets/xz.png" v-show="checkAllFlag">
                              <img src="../../assets/qx.png" v-show="!checkAllFlag">
                         </div>
                         <div class="checkTxt">全选({{checkCount}})</div>
                    </div>
                    <!-- 下载并打印 -->
                    <div class="dyxzBtn" @click="printAction()">打印</div>
                     <!-- 仅打印标签 -->
                    <!-- <div class="jdybqBtn">仅打印标签</div> -->
                     <!-- 仅打印配货单 -->
                    <div class="jdypsdBtn">仅打印配货单</div>
                     <!-- 导出订单 -->
                    <div class="dcddBtn">导出订单</div>
                </div>
                <!-- 表头 -->
                <div class="listHeaderView">
                      <div class="checkBox">
                           <div class="checkIcon">
                              <img src="../../assets/xz.png" >
                              <!-- <img src="../../assets/qx.png" v-show="!checkAllFlag"> -->
                            </div>
                      </div>
                      <div class="orderNum">百鱼单号</div>
                      <div class="photoItem">图案</div>
                      <div class="cztem">材质</div>
                      <div class="xhtem">型号</div>
                      <div class="dlstem">代理商</div>
                      <div class="pctem">批次</div>
                      <div class="locationtem">位置</div>
                      <div class="shrxxtem">收货人信息</div>
                      <div class="ddjetem">订单金额</div>
                      <div class="ddzttem">订单状态</div>
                      <div class="tjsjtem">提交时间</div>
                      <div class="dysjtem">打印时间</div>
                      <div class="cactinItem">操作</div>
                </div>
                <!-- 内容 -->
                <div class="listItemView" v-for="(obj,index) in list" :key="index">
                       <div class="checkBox" @click="changeItemFlag(obj,index)">
                           <div class="checkIcon">
                              <img src="../../assets/xz.png" v-show="obj.checkFlag">
                              <img src="../../assets/qx.png" v-show="!obj.checkFlag">
                            </div>
                      </div>
                      <div class="orderNum">{{obj.platformOrderNo}}</div>
                      <div class="photoItem">
                           <div class="logo"><img :src="getImgAdd(obj.orderEffectImageUrl)" alt=""></div>
                      </div>
                      <div class="cztem">{{obj.materialName?obj.materialName:'无'}}</div>
                      <div class="xhtem">{{obj.modelName}}</div>
                      <div class="dlstem">{{obj.agentName?obj.agentName:'无'}}</div>
                      <div class="pctem">{{obj.batchNo?obj.batchNo:'无'}}</div>
                      <div class="locationtem">{{obj.printRowSeq}}行{{obj.printColumnSeq}}列</div>
                      <div class="shrxxtem">
                           <div class="shrxxInner">{{obj.receiverName+obj.receiverPhone+obj.receiverAddress}}</div>
                      </div>
                      <div class="ddjetem">{{obj.totalPrice}}</div>
                      <div class="ddzttem">{{getOrderType(obj.orderStatus)}}</div>
                      <div class="tjsjtem">{{obj.commitTime?(dateFormattter(obj.commitTime)):'无'}}</div>
                      <div class="dysjtem">{{obj.printTime?(dateFormattter(obj.printTime)):'无'}}</div>
                      <div class="cactinItem">
                             <div class="actionBox">
                                  <div class="actionItem" @click="printOneAction(obj)">
                                       <div class="aiLogo"><img src="../../assets/dy_01.png" alt=""></div>
                                       <div class="aiTitle">打印</div>
                                  </div>
                                  <div class="actionItem" @click="pushOrderDtail(obj)">
                                       <div class="aiLogo"><img src="../../assets/dy_04.png" alt=""></div>
                                       <div class="aiTitle">修改</div>
                                  </div>
                             </div>
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
  name: 'print',
  data () {
    return {
       startTime:'',//开始时间
       endTime:'',  //结束时间
       piciVal: '',//选择批次
       piciList: [{value: '1',label: '批次1'},{value: '2',label: '批次2'}],
       czVal: '',//选择材质
       czList: [{value: '1',label: '批次1'},{value: '2',label: '批次2'}],
       ztVal: '',//选择状态
       ztList: [{value: '1',label: '批次1'},{value: '2',label: '批次2'}],
       checkAllFlag:false,//是否全选
       checkCount:0,//选中的数量
       current:1,
       total:0,
       size:10,
       list:[],
       unprintCount:0,//未打印的数量
    }
  },
  mounted(){
     this.getMyList();
     this.getUnPrintCountAPI();
  },
  methods: {
      //历史打印
      pushHistoryPrint(){
         this.$router.push('/historyPrint');
      },
      pushOrderDtail(obj){
          this.$router.push({ path: '/orderDetail', query: { uuid:obj.uuid}});
      },
      //快速打印
      fastPrintAPI(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/orders/print/fast/print';
             this.$axios.post(url,
              null,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        this.$toast.show('打印成功');
                        this.getMyList();
                   }else{
                        this.$toast.show('打印失败');
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      printAction(){
          var list =[];
          for(var i=0;i<this.list.length;i++){
              var listObj = this.list[i];

              if(listObj.checkFlag){
                    var obj={
                      uuid:listObj.uuid
                    };
                    list.push(obj);
              }
           }
            var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/orders/print/download/print';
            this.$axios.post(url,
              {
                orderInfoList:list
              },
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        this.$toast.show('打印成功');
                        this.getMyList();
                   }else{
                        this.$toast.show('打印失败');
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      printOneAction(obj){
            var list = new Array();  
            var obj={
                 uuid:obj.uuid
            }
            list.push(obj);
            var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/orders/print/download/print';
            this.$axios.post(url,
              {
                orderInfoList:list
              },
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   if(data.status=='SUCCESS'){
                        this.$toast.show('打印成功');
                        this.getMyList();
                   }else{
                        this.$toast.show('打印失败');
                   }
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      //全选
      checkAllAction(){
          this.checkAllFlag = !this.checkAllFlag;
           var list = new Array();
          for(var i=0;i<this.list.length;i++){
              var listObj = this.list[i];
              listObj.checkFlag =this.checkAllFlag;
              list.push(listObj);
          }
          this.list = list;
          this.changeCount();
      },
      changeCount(){
          var count =0;
          for(var i=0;i<this.list.length;i++){
              var listObj = this.list[i];
              if(listObj.checkFlag){
                 count++;
              }
          }
          this.checkCount = count;
      },
      timeStart(date){
         console.log('日期',date);
         this.startTime = date;
      },
      timeEnd(date){
          this.endTime = date;
      },
      pageChange(page) {
            this.current = page;
            this.getMyList();
      },
      //切换一个的状态
      changeItemFlag(obj,index){
         obj.checkFlag =!obj.checkFlag;
         var list = new Array();
         for(var i=0;i<this.list.length;i++){
             var listObj = this.list[i];
             if(i==index){
               list.push(obj);
             }else{
               list.push(listObj);
             }
         }
         this.list = list;
         this.changeCount();
      },
      dateFormattter(date){
        if(date){
            var formatterDateStr = '';
            //兼容ios
            var dealDate = new Date(date.replace(/-/g, '/').replace('T', ' ').replace('.000+0000', ''))
            if(date){
                //当前时区偏移 相对  格林区
                var offset = new Date().getTimezoneOffset();
                formatterDateStr = dayjs(dealDate.getTime()-offset).format('YYYY-MM-DD HH:mm');
                return formatterDateStr;
            }
        }  
        return '';
      },
       //获取订单状态
      getOrderType(val){
          var str ='';
          if(val){
              if(val=='01'){
                  str = '已录入待关联';
              }else if(val=='02'){
                  str = '已关联待提交';
              }else if(val=='03'){
                  str = '已提交待生产';
              }else if(val=='04'){
                  str = '已生产待发货';
              }else if(val=='05'){
                  str = '已发货待查收';
              }else if(val=='06'){
                  str = '完成';
              }else if(val=='07'){
                  str = '退货';
              }else if(val=='08'){
                  str = '取消';
              }
          }
          return str;
      },
      //获取订单列表
      getMyList(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/orders/no/print/list?page='+this.current+'&size=10&startTime=&endTime=&orderSource=&orderStatus=&searchInfo=';
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   var list = data.result.list;
                   var newList = new Array();
                   for(var i=0;i<list.length;i++){
                     var obj = list[i];
                     obj.checkFlag = false;
                     newList.push(obj);
                   }
                   this.total = data.result.total;
                   this.list = newList;
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
       //获取未打印数量
       getUnPrintCountAPI(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/orders/print/no/count';
             this.$axios.get(url,
              {headers: {
                "token":token
              }})
             .then((res)=>{
                   var data = res.data;
                   this.unprintCount= data.result;
             })
             .catch((e)=>{
                 console.log('e',e);
             })
      },
      getImgAdd(val){
        return 'http://qn.bmyouyu.com/'+val+'?imageView2/2/w/300/h/300/q/75';
      }
  }
}
</script>


<style  scoped  lang="less">
.print{
  width: 100%;
  height: 100%;
  background:rgba(245,245,245,1);
  overflow: auto;
}
.dyTitle{
    margin-top:18px;
    margin-left:18px;
    width:100%;
    height:22px;
    font-size:16px;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:22px;     
}
.actionView{
    margin-top:24px;
    margin-left: 18px;
    width:1784px;
    height:38px;
    .ksdytpBtn{
        cursor: pointer;
        float: left;
        width:212px;
        height:38px;
        background:rgba(60,166,170,1);
        border-radius:5px;
        font-size:14px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:38px;
        text-align: center;
    }
    .sxTitle{
        float: left;
        margin-left:18px;
        // width:50px;
        height:38px;
        font-size:14px;
        font-weight:400;
        color:rgba(32,36,39,1);
        line-height:38px;
    }
    //输入框 box
    .timePk{
        float: left;
        height: 40px;
        overflow: hidden;
        .inputBoxLeft{
            float: left;
            line-height: 40px;
            height: 40px;
            font-size:13px;
            color: #000;
        }
        .inputBoxRight{
            float: left;
            margin-left: 5px;
            width: 130px;
            height: 40px;
            display:flex;
            align-items: center;
        }
    }
    .selectDiv{
      float: left;
      margin-left: 10px;
      width:120px;
      height: 40px;
      overflow: hidden;
      display: flex;
      align-items: center;
   }
   .searchBox{
      float: left;
      margin-left: 10px;
      .searchInputBox{
          float: left;
          width:210px;
          height:38px;
          background:rgba(255,255,255,1);
          border-radius:2px;
          display: flex;
          align-items: center;
          .sInput{
             padding-left:16px;
             width: 100%;
             height: 30px;
             line-height: 30px;
             font-weight:400;
             color:rgba(162,162,162,1);
             font-size: 14px;
          }
      }
      .searchBtn{
         float: left;
         margin-left: 10px;
         width:74px;
         height:38px;
         background:rgba(60,166,170,1);
         border-radius:2px;
         text-align: center;
         font-size: 14px;
         line-height: 38px;
         color: white;
         cursor: pointer;
      }
   }
}
.listWrapperView{
    margin-top: 10px;
    margin-left: 10px;
    width:1784px;
    height:888px;
    background:rgba(255,255,255,1);
    border-radius:5px 5px 0px 0px;
    // overflow: auto;
    .listWVH{
        margin-left: 21px;
        margin-top: 34px;
        width:1735px;
        height:38px;
        overflow: hidden;
      .checkBox{
          float: left;
          margin-left:16px;
          width: 100px;
          height: 38px;
          cursor: pointer;
          .checkIcon{
              float: left;
              margin-top:10px;
              width: 15px;
              height: 15px;
              // overflow: hidden;
              img{
                 width: 100%;
                 height: 100%;
              }
          }
          .checkTxt{
              float: left;
              margin-top:9px;
              margin-left: 5px;
              width:60px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #000000;
          }
      }
      .dyxzBtn{
          float: left;
          margin-left:16px;
          width:111px;
          height:38px;
          background:rgba(60,166,170,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          color: white;
          font-size: 14px;
          cursor: pointer;
      }
      .jxzBtn{
          float: left;
          margin-left:16px;
          width:80px;
          height:38px;
          background:rgba(56,61,65,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          color: white;
          font-size: 14px;
          cursor: pointer;
      }
      .jdybqBtn{
          float: left;
          margin-left:16px;
          width:111px;
          height:38px;
          background:rgba(56,61,65,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          color: white;
          font-size: 14px;
          cursor: pointer;
      }
      .jdypsdBtn{
          float: left;
          margin-left:16px;
          width:124px;
          height:38px;
          background:rgba(56,61,65,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          color: white;
          font-size: 14px;
          cursor: pointer;
      }
      .dcddBtn{
          float: left;
          margin-left:16px;
          width:96px;
          height:38px;
          background:rgba(56,61,65,1);
          border-radius:2px;
          line-height: 38px;
          text-align: center;
          color: white;
          font-size: 14px;
          cursor: pointer;
      }
    }
    .listHeaderView{
        margin-left: 21px;
        margin-top:21px;
        width:1735px;
        height:56px;
        background:rgba(242,249,249,1);
        overflow: hidden;
        .checkBox{
          float: left;
          margin-left:16px;
          width: 26px;
          height: 56px;
          cursor: pointer;
          display: flex;
          align-items: center;
          .checkIcon{
              width: 15px;
              height: 15px;
              img{
                 width: 100%;
                 height: 100%;
              }
          }
        }
        .orderNum{
           float: left;
           margin-left: 16px;
           width: 130px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
        }
        .photoItem{
           float: left;
           margin-left: 16px;
           width: 40px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .cztem{
           float: left;
           margin-left: 16px;
           width: 80px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .xhtem{
           float: left;
           margin-left: 16px;
           width: 150px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .dlstem{
           float: left;
           margin-left: 16px;
           width: 60px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .pctem{
           float: left;
           margin-left: 16px;
           width: 80px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .locationtem{
           float: left;
           margin-left: 16px;
           width: 60px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .shrxxtem{
           float: left;
           margin-left: 16px;
           width: 180px;
           height: 56px;
           line-height: 56px;
           font-size:14px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .ddjetem{
            float: left;
            margin-left: 16px;
            width: 60px;
            height: 56px;
            line-height: 56px;
            font-size:14px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .ddzttem{
            float: left;
            margin-left: 16px;
            width: 60px;
            height: 56px;
            line-height: 56px;
            font-size:14px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
         .tjsjtem{
            float: left;
            margin-left: 16px;
            width: 100px;
            height: 56px;
            line-height: 56px;
            font-size:14px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .dysjtem{
            float: left;
            margin-left: 16px;
            width: 100px;
            height: 56px;
            line-height: 56px;
            font-size:14px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .cactinItem{
            float: left;
            margin-left: 16px;
            width: 230px;
            height: 56px;
            line-height: 56px;
            font-size:12px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
    }

    .listItemView{
        margin-left: 21px;
        width:1735px;
        height:56px;
        background:rgba(242,249,249,1);
        overflow: hidden;
        .checkBox{
          float: left;
          margin-left:16px;
          width: 26px;
          height: 56px;
          cursor: pointer;
          display: flex;
          align-items: center;
          .checkIcon{
              width: 15px;
              height: 15px;
              img{
                 width: 100%;
                 height: 100%;
              }
          }
        }
        .orderNum{
           float: left;
           margin-left: 16px;
           width: 130px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
        }
        .photoItem{
           float: left;
           margin-left: 16px;
           width: 40px;
           height: 56px;
           cursor: pointer;
           overflow: hidden;
           display: flex;
           align-items: center;
           justify-content: center;
           .logo{
              width: 30px;
              height: 50px;
              img{
                 width: 100%;
                 height: 100%;
              }
           }
        }
         .cztem{
           float: left;
           margin-left: 16px;
           width: 80px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .xhtem{
           float: left;
           margin-left: 16px;
           width: 150px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .dlstem{
           float: left;
           margin-left: 16px;
           width: 60px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .pctem{
           float: left;
           margin-left: 16px;
           width: 80px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .locationtem{
           float: left;
           margin-left: 16px;
           width: 60px;
           height: 56px;
           line-height: 56px;
           font-size:12px;
           font-weight:400;
           color:rgba(56,61,65,1);
           cursor: pointer;
           overflow: hidden;
           text-align: center;
        }
        .shrxxtem{
           float: left;
           margin-left: 16px;
           width: 180px;
           height: 56px;
           overflow: hidden;
           .shrxxInner{
               margin: 0 auto;
               margin-top: 3px;
               width: 170px;
               height: 50px;
               line-height:25px;
               font-size: 12px;
               overflow: hidden;

           }
        }
        .ddjetem{
            float: left;
            margin-left: 16px;
            width: 60px;
            height: 56px;
            line-height: 56px;
            font-size:12px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .ddzttem{
            float: left;
            margin-left: 16px;
            width: 60px;
            height: 56px;
            line-height: 56px;
            font-size:12px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .tjsjtem{
            float: left;
            margin-left: 16px;
            width: 100px;
            height: 56px;
            line-height: 56px;
            font-size:12px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .dysjtem{
            float: left;
            margin-left: 16px;
            width: 100px;
            height: 56px;
            line-height: 56px;
            font-size:12px;
            font-weight:400;
            color:rgba(56,61,65,1);
            cursor: pointer;
            overflow: hidden;
            text-align: center;
        }
        .cactinItem{
            float: left;
            margin-left: 16px;
            width: 230px;
            height: 56px;
            cursor: pointer;
            .actionBox{
               margin-top:13px;
               width: 100%;
               height: 30px;
               display: flex;
               justify-content: space-around;
               .actionItem{
                //  float: left;
                height: 30px;
                 width: 50px;
                 display: flex;
                 align-items: center;
                 overflow: hidden;
                 .aiLogo{
                     width: 20px;
                     height: 20px;
                      display: flex;
                      align-items: center;
                     img{
                        width: 100%;
                        height: 100%;
                     }
                 }
                 .aiTitle{
                     width:30px;
                    height:17px;
                    font-size:12px;
                    font-weight:400;
                    color:#4BA7AA;
                    line-height:17px;
                 }
               }
            }
        }

    }
    .listItemView:nth-child(2n+1){
       background: white;
    }
    // .listItemView:hover{
    //     // background:#4BA7AA;
    // }
     //页码
    .pagination{
          width:1750px;
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
