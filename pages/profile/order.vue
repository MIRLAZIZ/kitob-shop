<template>
  <div >
      <div class="  w-full p-3">
        <div class=" ">
          <div class="   ">
            <h1 class="h1">{{ $t("home.profile.Order history") }}</h1>
            <div class="main_div ">
              <div  class="main_p" :class="{'price' :content == 1}" @click="content = 1">{{ $t("home.profile.Installment payment") }}</div>
              <div  class="main_p" :class="{'price' :content == 2}" @click="content = 2">{{ $t("home.profile.Delivered") }}</div>
              <div  class="main_p" :class="{'price' :content == 3}" @click="content = 3">{{ $t("home.profile.cash payment") }}</div>
            </div>
            <div v-show="content == 1"><Table/></div>
            <div v-show="content == 2"><TablePrice/></div>
            <div v-show="content == 3"><TablePay/></div>
          </div>
      </div>
       
      </div>
  </div>
</template>

<script setup>

const content = ref(null)

onMounted(() => {
  content.value = 1;
})

</script>

<style lang="scss" scoped>

.h1 {
  height: 47px;
  
  font-family: Manrope;
  font-size: 20px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.02em;
  // text-align: left;
  color: #35363d;
  padding-top: 18px;
}
.main_div {
  display: flex;
}
.price{
  // background-color: red;
  // border-radius: 5px;
  border-bottom:2px solid green;
  
}
.main_p {
 
  height: 35px;
 
  font-family: Manrope;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.02em;
  // text-align: left;
  color: #1c5793;
  margin: 15px 0px 30px 30px;
  // background-color: red;
  padding: 5px;
  cursor: pointer;

}
.nuxt-link-exact-active .nuxt-link,
.NuxtLink .nuxt-link-exact .nuxt-link {
  text-decoration: none;
}

</style>