<template>
  <div class="main-content">
    <div>
      <!-- <SeoKit /> -->
      <Header />

<!-- <<<<<<< HEAD -->
    <div class="d-flex container" >
      <UserProfile />
      <slot />
<!-- =======
      <div class="d-flex container" style="height: 100%">
        <UserProfile />
        <slot /> -->
      </div>
      <Footer />
<!-- >>>>>>> 1a742d1f3d5b959d852f30107d39191a7ebc4fe7 -->
    </div>
  </div>

  <div class="second-content">
    <div class="box">
      <h1 class="disclaimer">
        Kechirasiz, ushbu veb-saytga mobil qurilmalar orqali kirish hozirda
        mavjud emas.
      </h1>
    </div>
    <MobileApp />
  </div>
</template>

<script setup>
import MobileApp from "@/components/Home/MobileApp.vue";
</script>
<style lang="scss" scoped>

.box {
  background: red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.disclaimer {
  text-align: center;
  font-size: 20px;
  color: white;
}

.second-content {
  display: none;
}

@media (max-width: 900px) {
  .main-content {
    display: none;
  }
  .second-content {
    display: flex;
    flex-direction: column;
  }
}

</style>
