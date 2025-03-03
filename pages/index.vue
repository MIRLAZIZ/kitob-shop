<template>
  <main>
    <HomeCarousel />
    <HomePossibilities />
    <HomeMarketFast :title="'Bozori chaqqon'" :bookImgs="store.books.special_offer" :swiperDley="6000"/>
    <HomeMarketFast :title="'Mashhurlar'" :bookImgs="store.books.salable" :swiperDley="5000" />
    <HomeMarketFast :title="'Maxsus taklif'" :bookImgs="store.books.popular " :swiperDley="8000" />
    <HomeMobileApp />

  </main>
</template>
 
<script setup>
const store = useTestTStore();
onMounted(() => {
  store.fechBooks()
});
</script>