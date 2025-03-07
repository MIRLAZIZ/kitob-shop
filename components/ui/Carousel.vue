<!-- <template>
    <div>

        <div class="mt-5 mb-5">
          <div class="d-flex justify-content-between mb-3">
            <h6 class="p-0">{{ $t("home.recently") }}</h6>
            <div>
              <button class="nextRight me-2" @click="slidePrev">
                <img src="@/assets/contact/arrowRight.png" alt="" />
              </button>
              <button class="nextLeft" @click="slideNext">
                <img src="@/assets/contact/arrowLeft.png" alt="" />
              </button>
            </div>
          </div>




          <swiper-container
  
  ref="containerRef"
  :slides-per-view="6"
  :space-between="10"
  :pagination="{ clickable: true }"
  
  >
  <div v-if="store1.recent && store1.recent.product">
   <swiper-slide
     class="p-0 dataItem"
     v-for="(item, index) in store.recent"
     :key="index"
   >
     <div class="dataItem">
      
  
       <button class="btnBestseller">Bestseller</button>
       <button class="newBook">Yangi</button>
       <img
         src="../../assets/contact/booklike.png"
         alt=""
         class="bookLike"
       />
  
       <img
         src="../../assets/contact/karzinka.png"
         alt=""
         class="karzinka"
       />
       <img
         src="../../assets/contact/eBook.png"
         alt=""
         class="ebook"
       />
     </div>
     <div class="ps-2">
       <small class="title">{{ item.product?.name }}</small>
       <pre>
  {{ item.product }}
  
  </pre
       >
     </div>
     <div class="ps-2">
       <small class="author">{{ item.product.author }}</small>
       <small class="author">{{
         item.product.description_uz
       }}</small>
     </div>
     <div>
       <small v-if="item.product.price" class="price"
         >{{ item.product.price }} so'm</small
       >
     </div>
     <img src="../../assets/contact/Star.png" alt="" />
     <small class="stats ms-2">5,0</small>
     <span class="starsNumbers">(32)</span>
   </swiper-slide>
  </div>
  
  </swiper-container>


       
        </div>


    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style> -->



<script setup >
// Create 10 slides
const containerRef = ref(null)
const slides = ref(Array.from({ length: 10 }))

const props = defineProps({
    data: {
        type:Array
    }
})

const swiper = useSwiper(containerRef)

onMounted(() => {
  // Access Swiper instance
  // Read more about Swiper instance: https://swiperjs.com/swiper-api#methods--properties
  console.log(swiper.instance)
})
</script>

<template>

<div class="mt-5 mb-5">
          <div class="d-flex justify-content-between mb-3">
            <h6 class="p-0">{{ $t("home.recently") }}</h6>
            <div>
              <button class="nextRight me-2" @click="swiper.prev()">
                <img src="@/assets/contact/arrowRight.png" alt="" />
              </button>
              <button class="nextLeft" @click="swiper.next()">
                <img src="@/assets/contact/arrowLeft.png" alt="" />
              </button>
            </div>
          </div>
          </div>
  <ClientOnly>
   


    <swiper-container ref="containerRef" v-if="props.data">
      <swiper-slide
        v-for="(item, idx) in props.data"
        :key="idx"
        style="background-color: rgb(32, 233, 70); color: white;"
      >
      <div class="dataItem">
      
  
      <button class="btnBestseller">Bestseller</button>
      <button class="newBook">Yangi</button>
      <img
        src="/assets/contact/booklike.png"
        alt=""
        class="bookLike"
      />
 
      <img
        src="/assets/contact/karzinka.png"
        alt=""
        class="karzinka"
      />
      <img
        src="/assets/contact/eBook.png"
        alt=""
        class="ebook"
      />
    </div>
    <div class="ps-2">
      <small class="title">{{ item?.product?.name }}</small>
      <pre>
 {{ item?.product }}
 
 </pre
      >
    </div>
    <div class="ps-2">
      <small class="author">{{ item.product.author }}</small>
      <small class="author">{{
        item.product.description_uz
      }}</small>
    </div>
    <div>
      <small v-if="item.product.price" class="price"
        >{{ item.product.price }} so'm</small
      >
    </div>
    <img src="/assets/contact/Star.png" alt="" />
    <small class="stats ms-2">5,0</small>
    <span class="starsNumbers">(32)</span>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>

  
</template>

<style lang="css">
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  height: 20vh;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}


.nextRight {
  width: 30px;
  height: 30px;
  background: #f6f6f6;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
  border: none;
}

.nextLeft {
  width: 30px;
  height: 30px;
  background: #f6f6f6;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  border: none;
}
</style>
