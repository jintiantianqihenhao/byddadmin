<template>
  <div class="worksView">
        <!-- <div class="tabBarView">
            
              <div class="tabBarItem" >所有作品
                 <div class="line"></div>
             </div>
        </div> -->
        <div class="searchBoxView">
             <div class="searchBox">
                  <div class="inputBox">
                      <Input v-model="keyWordInput" placeholder="请输入作者手机号" style="width:215px" />
                  </div>
                  <div class="searchBtn"><Button type="primary" icon="ios-search" @click="searchAction()">搜索</Button></div>
              </div>
        </div>
       
        <!-- 作品列表 -->
        <div class="zpListView">
              <div class="zpListItem" v-for="(obj,index) in list" :key="index">
                   <div class="zpListItemLogo">
                       <img :src="getImgAdd(obj.effectImageUrl)" alt="">
                   </div>
                   <div class="saleNum">作者:{{obj.mobilePhone}}</div>
                    <div class="labelTagsView">
                        <div class="labelTagItem" v-for="(labelObj,num) in obj.tagInfoList" :key="num">
                            {{labelObj.tagName}}
                        </div>
                   </div>
                   <div class="zpItemActionView">
                        <div class="addBtn" v-clipboard:copy="getCopyLink(obj.effectImageUrl)" v-clipboard:success="onCopy" v-clipboard:error="onError">复制作品效果图片</div>
                        
                   </div>
                   <div class="zpItemActionView" style="margin-top: 10px;">
                        <div class="delBtn" v-clipboard:copy="getCopyLink(obj.orginialImageUrl)" v-clipboard:success="onCopy" v-clipboard:error="onError">复制作品原图片</div>
                   </div>


              </div>
        </div>
         <div class="pagination">
                  <Page :current="current" :total="total" :page-size="size" @on-change="pageChange"></Page>
          </div>


        <!-- end -->
  </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
export default {
  name: 'zuopinview',
  data () {
    return {
      msg: 'sucai',
      tabbarIndex:0,//选项卡索引
      current:1,
      tagsListItemIndex:-1,//索引
      total:0,
      size:18,
      list:[],
      tagList:[],//标签列表
      keyWordInput:'',//关键字
    }
  },
  mounted(){
      this.getList();
  },
  methods: {
     getCopyLink(val){
        return 'http://qn.bmyouyu.com/'+val;
    }, 
     onCopy: function (e) {
        this.$toast.show('复制成功');
     },
     onError: function (e) {
        this.$toast.show('复制失败');
     },
      pageChange(page) {
            this.current = page;
            this.getList();
      },
      //搜索
      searchAction(){
           this.getList();
      },
      getList(){
             var token = localStorage.getItem('token');
             var url =  this.HOST+'/bmcs/api/gallery/all?page='+this.current+'&size='+this.size+'&mobilePhone='+this.keyWordInput;
            this.$axios.get(url,{
                params: null,
                headers: {"token":token}//设置header信息
            })
             .then((res)=>{
                   var data = res.data;
                   this.list = data.result.list;
                   this.total = data.result.total;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.worksView{
    width: 100%;
    height: 100%;
    background: white;

}
.tabBarView{
    margin-top:10px;
    margin-left: 10px;
    width:1700px;
    height:40px;
    overflow: hidden;
    .tabBarItem{
        float: left;
        width: 100px;
        height: 40px;
        line-height: 40px;
        font-weight:400;
        color:rgba(0,0,0,1);
        position: relative;
        text-align: center;
        cursor: pointer;
        .line{
          position: absolute;
          left: 50%;
          bottom: 0;
          width:70px;
          margin-left: -35px;
          height:4px;
          background:rgba(60,166,170,1);
          border-radius:2px;
        }
    }
}

.searchBoxView{
   margin-top: 10px;
   width: 100%;
   height:40px;
   overflow: hidden;
   .searchBox{
       float: left;
       margin-left:10px;
       .inputBox{
           float: left;
          width: 220px;
          height: 40px;
          display:flex;
          align-items: center;
       }
       .searchBtn{
         float: left;
          width: 100px;
          height: 40px;
          display:flex;
          align-items: center;
       }
    }
}
.zpListView{
    margin-top:10px;
    margin-left: 10px;
    width:1700px;
    height:720px;
    overflow: auto;
    display:flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    flex-flow:wrap;
    align-content: flex-start;
    .zpListItem{
      margin-left:10px;
      margin-top: 10px;
      width: 175px;
      height: 340px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
    //   border: 1px solid #000;
      .zpListItemLogo{
        margin: 0 auto;
        width: 100%;
        height: 220px;
        border-radius:5px;
        overflow: hidden;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 16px 0px rgba(0,0,0,0.04);
        filter:blur(0px);
        border: 1px solid #DADEE4;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            max-width: 100%;
            max-height: 100%;
            transition: all 0.6s;
        }
        img:hover{
          transform: scale(1.1);
        }
      }
      .saleNum{
          margin: 0 auto;
          margin-top: 10px;
          width: 100%;
          height:17px;
          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(56,61,65,1);
          line-height:17px;
          text-align: center;
          overflow: hidden;
      }
       .labelTagsView{
        margin: 0 auto;
         margin-top:15px;
         width: 80%;
        //  height: 26px;
         display: flex;
         align-items: center;
         overflow: hidden;
         .labelTagItem{
            // width:48px;
            height:26px;
            background:rgba(242,249,249,1);
            border-radius:11px;
            line-height: 26px;
            margin-left: 10px;
            padding-left: 12px;
            padding-right: 12px;
            font-size:12px;
            font-weight:400;
            color:rgba(60,166,170,1);

         }
      }
      .zpItemActionView{
          margin: 0 auto;
        //   margin-top:11px;
          width: 200px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-align: center;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          .addBtn{
              margin: 0 auto;
              width:120px;
              height:30px;
              background:rgba(60,166,170,1);
              border-radius:4px;
              font-size:12px;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:30px;
              text-align: center;
          }
          .delBtn{
            //   margin-left: 10px;
              margin: 0 auto;
              width:120px;
              height:30px;
              border-radius:4px;
              border:1px solid rgba(60,166,170,1);
              font-size:12px;
              font-weight:400;
              color:rgba(60,166,170,1);
              line-height:30px;
              text-align: center;
          }
      }
    }
}
 //页码
.pagination{
      width:1306px;
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
</style>
