<template>
  <transition name="app-fade-left">
    <app-heart-loader v-if="this.isLoading"></app-heart-loader>
    <div v-else>
      <transition name="app-fade-left">
        <app-theme-page-title v-show="isLoadedData">
          <p slot="middleTitle">О НАС И НАШИХ ПАРТНЕРАХ</p>
          <p slot="bottomTitle">Мы предлагаем не просто товары, а море удовольствия и наслаждения</p>
        </app-theme-page-title>
      </transition>
      <transition name="app-fade-left">
        <el-row v-show="isLoadedData" type="flex" justify="center">
          <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex" align="left">
            <h2 class="about_corner">О нас</h2>
            <span id="hor_line_1"></span>
            <span id="ver_line_1"></span>
          </el-col>
        </el-row>
      </transition>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" type="flex" align="middle">
          <el-row type="flex" justify="center" style="flex-wrap: wrap">
            <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" align="left">
              <transition name="app-fade-left">
                <p v-show="isLoadedData" class="about_text">
                  Мы продаем не просто товары, мы продаем удовольствие! А также убеждены, что слово «сексшоп» не в полной
                  мере раскрывает суть нашей деятельности. В основу концепции нашего магазина заложено удовольствие
                  покупателя. В прямом смысле этого слова! Мы помогаем людям сделать жизнь приятнее, интереснее и ярче!
                  Мы продаем эмоции – этого вы не купите больше нигде. Продаем уверенность в себе и своих силах – это
                  многого стоит! Мы продаем гармонию в жизни…
                </p>
              </transition>
            </el-col>
            <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" align="left">
              <transition name="app-fade-right">
                <p v-show="isLoadedData" class="about_text" style="margin-top: 2px;">
                  Берите от жизни всё прямо сейчас! Она слишком коротка, чтобы чего-то ждать! Наш ассортимент игрушек,
                  белья и другой продукции был отобран с тем, чтобы быть интересным всем, независимо от возраста, пола и
                  ориентации. Неважно, гетеросексуальны Вы, бисексуальны или гомосексуальны; женщина, мужчина или
                  транссексуал. Двадцать Вам, сорок или семьдесят — в любом случае на misterio.shop Вы найдете полезные
                  для себя товары и услуги.
                </p>
              </transition>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <transition name="app-fade-right">
        <el-row v-show="isLoadedData" type="flex" justify="center">
          <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex" align="right">
            <h2 class="about_corner">О продукции</h2>
            <span id="hor_line_2"></span>
            <span id="ver_line_2"></span>
          </el-col>
        </el-row>
      </transition>
      <transition name="app-fade-left">
        <el-row v-show="isLoadedData" type="flex" justify="center">
          <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" type="flex">
            <h2 id="partners_title">Наши партнеры</h2>
            <div id="partners">
              <img class="partner_logo" src="@/assets/img/about/1.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/2.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/3.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/4.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/5.png" alt="">
              <img id="fan_factory_logo" src="@/assets/img/about/6.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/7.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/8.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/9.png" alt="">
              <img class="partner_logo" src="@/assets/img/about/10.png" alt="">
            </div>
          </el-col>
        </el-row>
      </transition>
      <el-row type="flex" justify="center">
        <el-col :xs="23" :sm="22" :md="19" :lg="16" :xl="15" type="flex" align="middle">
          <reviews></reviews>
        </el-col>
      </el-row>
    </div>
  </transition>
</template>

<script>
import Reviews from '@/components/about/Reviews'

export default {
  name: 'info',
  components: {Reviews},
  data () {
    return {
      isLoadedData: true
    }
  },
  methods: {
    fetchAboutData () {
      this.$store.dispatch('fetchReviews', {status: 'published'})
    }
  },
  created () {
    this.fetchAboutData()
  },
  watch: {
    isLoading () {
      this.$nextTick(function () {
        this.isLoadedData = !this.isLoadedData
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .about_corner {
    font-family: $secondary-font;
    font-weight: 400;
    color: $color-info;
    margin-top: -20px;
  }

  .about_text {
    color: $color-info;
    padding: 40px 40px 40px 55px;
    font-size: 13px;
  }

  #hor_line_1:after {
    content: "";
    display: block;
    width: 40%;
    height: 2px;
    margin: -15px 70px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, white 0%, $color-secondary 100%);
  }

  #ver_line_1:after {
    content: "";
    position: absolute;
    display: block;
    width: 2px;
    height: 140px;
    margin: 30px 6px;
    border-left: 1px solid;
    background-image: linear-gradient(to bottom, white 0%, $color-secondary 100%);
  }

  #hor_line_2:after {
    content: "";
    display: block;
    width: 30%;
    height: 2px;
    margin: -15px 155px;
    padding-right: -10px;
    border-bottom: 1px solid;
    background-image: linear-gradient(to right, $color-secondary 0%, white 100%);
  }

  #ver_line_2:after {
    content: "";
    display: block;
    width: 2px;
    height: 140px;
    margin: -160px 6px;
    border-left: 1px solid;
    background-image: linear-gradient(to bottom, $color-secondary 0%, white 100%);
  }

  #partners_title {
    font-family: $secondary-font;
    font-size: 24px;
    font-weight: 400;
    color: $color-secondary;
    padding: 40px 40px 20px 55px;
    margin-top: 50px;
  }

  #partners {
    border-bottom: 1px solid $color-info;
    border-top: 1px solid $color-info;
    padding: 10px;
    margin-bottom: 40px;
  }

  .partner_logo {
    padding: 18px;
    height: 62px;
  }

  #fan_factory_logo {
    padding: 10px;
    margin-bottom: -12px;
    transform: scale(0.8);
    height: 84px;
  }

  @media only screen and (max-width: $xs-screen) {
    .about_corner {
      font-size: 16px;
    }
    .about_text {
      padding: 20px 20px 20px 30px;
      font-size: 13px;
    }
    #ver_line_1:after {
      margin: 30px 4px;
    }
    #hor_line_1:after {
      margin: -12px 70px;
    }
    #hor_line_2:after {
      width: 16%;
      margin: -13px 125px;
    }
    #ver_line_2:after {
      margin: -155px 6px;
    }
  }
</style>
