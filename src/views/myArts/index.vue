<template>
<div class="myArts">
    <div class="banner">
        <div class="slogan">Creations stemming from my lively imagination</div>
    </div>
    <a-row class="statistics container">
        <a-col class="item" :lg="8">
            <div>123</div>
            <span>My Artworks</span>
        </a-col>
        <a-col class="item" :lg="8">
            <div>1023</div>
            <span>Auto Layout Vertical</span>
        </a-col>
        <a-col class="item" :lg="7">
            <div>Armed Girl</div>
            <span>Most Viewed Artwork</span>
        </a-col>
    </a-row>
    <div class="list-wrapper container">
        <div class="title">My Artworks</div>
        <div class="list"></div>
    </div>
</div>
</template>

<script>
export default {
    name: "index"
}
</script>

<style scoped lang="less">
.myArts {
    .banner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 320px;
        background: url("../../assets/img/myArts/banner-bg.png") center no-repeat;
        background-size: 100% 100%;
        .slogan {
            font-size: 48px;
            font-family: Inter-Semi Bold, Inter;
        }
    }
    .statistics {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: -68px;
        padding: 48px 32px;
        border-radius: 16px;
        background: #FFFFFF;
        .item {
            >div {
                margin-bottom: 16px;
                line-height: 1.2;
                font-family: Inter-Semi Bold, Inter;
                font-size: 48px;
                color: #6A57E3;
            }
            >span {
                font-family: Montserrat-SemiBold, Montserrat;
                font-size: 18px;
                color: #9BA2B0;
            }
        }
    }
    .list-wrapper {
        margin-top: 60px;
        .title {
            padding: 30px 0;
            text-align: center;
            line-height: 1.2;
            font-family: Inter-Semi Bold, Inter;
            font-size: 48px;
            border-bottom: 1px solid #D0D4DC;
        }
    }
}
</style>