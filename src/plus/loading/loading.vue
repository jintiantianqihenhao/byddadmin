<template>
    <div class="loadings" v-show="isShow">

              <div class="loadingBox" >
                     <div class="k-ring-2" style="border:hidden;">
                        <div class="k-ball-holder2">
                            <div class="k-ball1e"></div>
                            <div class="k-ball2c"></div>
                            <div class="k-ball5b"></div>
                            <div class="k-ball6b"></div>
                        </div>
                    </div>
                    <div class="loadingTxt" >加载中...</div>
              </div>
    </div>
</template>

<script>
export default {
    data(){
      return{
         isShow: false,
      }
    },
    methods:{
       /**
       * 显示动画loading
       */
      show() {
        this.isShow = true
      },
      /**
       * 隐藏动画loading
       */
      hide() {
        this.isShow = false
      },
    }
}
</script>

<style lang="less" scoped>
.loadings {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: transparent;
    display: flex;;
    justify-content: center;
    align-items: center;
    z-index: 20000;
    // background: red;

}
.loadings .loadingBox{
        width:150px;
        height:150px;
        background: rgba(0,0,0,0.5);
        border-radius: 10px;
        // display: flex;;
        // justify-content: center;
        // align-items: center;
        background: white;
       .k-ring-2 {
            position: relative;
            width: 45px;
            height: 45px;
            margin: 0 auto;
            margin-top: 30px;
            border: 4px solid #9C27B0;
            border-radius: 100%
        }

        .k-ball-holder2 {
            position: absolute;
            width: 12px;
            height: 45px;
            left: 17px;
            top: 0
        }

        .k-ball1e {
            position: absolute;
            top: -10px;
            left: -1px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #CDDC39
        }

        .k-ball2c {
            position: absolute;
            bottom: -10px;
            left: -1px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #F44336
        }

        .k-ball5b {
            position: absolute;
            top: 14px;
            left: -26px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #4CAF50
        }

        .k-ball6b {
            position: absolute;
            top: 14px;
            right: -26px;
            width: 16px;
            height: 16px;
            border-radius: 100%;
            background: #3F51B5
        }

        .k-ball-holder2 {
            animation: k-loadingE 2.3s linear infinite
        }

        @keyframes k-loadingE {
            0 {
                transform: rotate(0deg)
            }
            100% {
                transform: rotate(360deg)
            }
        }

        .loadingTxt{
            margin: 0 auto;
            margin-top:20px;
            line-height: 30px;
            width: 100%;
            text-align: center;
            font-size: 15px;
        }
}
</style>
