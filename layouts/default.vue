<template>
    <div class="main-content">
      <Header />
      <slot />
      <Footer />
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
import MobileApp from '@/components/Home/MobileApp.vue';

const route = useRoute();

useHead({
  title: "kytab",
  meta: [
    { property: "og:title", content: `${route.meta.title}` },
    // { property: 'og:image', content: useAsset('jum1.jpg') }
  ],
  link: [
    { rel: "canonical", href: process.env.NUXT_PUBLIC_SITE_URL },
    { rel: "icon", type: "image/x-icon", href: "/fi(1).ico" },
  ],
  htmlAttrs: { lang: "uz" },
});
</script>

<style scoped>
#app {
  /* background-color: #F8F8F8 !important; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
}

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
