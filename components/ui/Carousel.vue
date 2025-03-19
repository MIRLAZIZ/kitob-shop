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
import { usePayment } from  '@/store/payment'

const store = usePayment()
const containerRef = ref(null)


const swiper = useSwiper(containerRef)

onMounted(() => {
  store.Popular_recent()
  

  
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
          <!-- {{ store.recent }} -->
   


    <swiper-container ref="containerRef"
    :slides-per-view="4"
          :space-between="10">
      <swiper-slide
        v-for="(item, idx) in store?.recent"
        :key="idx"
      >
      <div @click="$router.push(`/book/${item.id}`)" class="bookData">
              <img :src="urlimg + '/' + item?.image" alt="" class="categoyImg" />
              <button
                :class="item.is_bestseller == 1 ? 'btnBestseller' : 'newBook'"
              >
                {{ item.is_bestseller == 1 ? "Bestseller" : "Yangi" }}
              </button>
              <div
                class="likeBox"
                @click="addFavourite($event, idx, item.id, item.type.book_id)"
              >
                <img
                  src="../../assets/contact/bookLike2.png"
                  alt=""
                  class="bookLike2"
                  :style="{ opacity: item.is_favorite ? '1' : '0' }"
                />
                <img
                  src="../../assets/contact/booklike.png"
                  alt=""
                  class="bookLike"
                  :style="{ opacity: item.is_favorite ? '0' : '1' }"
                />
              </div>
              <img
                src="../../assets/contact/karzinka.png"
                alt=""
                class="karzinka"
                @click="addBasket($event, item.id, item.type.book_id)"
              />
              <div class="wrapper-icons">
                <img src="../../assets/contact/eBook.png" alt="" class="ebook" />
                <img
                  src="../../assets/contact/bookopen.png"
                  alt=""
                  class="bookopen"
                />
                <img
                  src="../../assets/contact/headphone.png"
                  alt=""
                  class="headphone"
                />
              </div>
            </div>
            <div class="ps-2">
              <small class="title">{{ item.creator }}</small>
            </div>
            <div class="ps-2">
              <small class="author">{{ item.name }}</small>
              <small class="author"> </small>
            </div>
            <small class="stats ms-2">5,0</small>
            <span class="starsNumbers">(32)</span>
      </swiper-slide>
    </swiper-container>

  
</template>

<style lang="css">


.price {
  color: #8f8e8e;
  font-size: 0.8125rem;
}
.categoyImg {
  width: 100%;
  height: 100%;
  border-radius: 0.4375rem;
}

.btnBestseller {
  background: #67c926;
  position: absolute;
  left: -0.3125rem;
  top: 0.625rem;
  border: none;
  border-radius: 0.1875rem;
  font-size: 0.75rem;
  color: #fff;
  font-weight: 600;
  z-index: 1;
  width: 4.875rem;
  height: 1.4375rem;
}

.newBook {
  background: #ff673d;
  position: absolute;
  left: -0.3125rem;
  top: 0.625rem;
  border: none;
  border-radius: 0.1875rem;
  font-size: 0.75rem;
  color: #fff;
  font-weight: 600;
  width: 3.0625rem;
  height: 1.4375rem;
}

.bookData {
  position: relative;
  height: 16.25rem;
}

.bookLike {
  position: absolute;
  right: 0.625rem;
  top: 0.625rem;
  cursor: pointer;
  display: none;
}

.karzinka {
  position: absolute;
  right: 0.625rem;
  top: 2.8125rem;
  cursor: pointer;
  display: none;
}

.ebook {
  cursor: pointer;
  display: none;
}

.bookopen {
  cursor: pointer;
  display: none;
}


.headphone {
  cursor: pointer;
  display: none;
}

.bookData:hover .bookLike,
.bookData:hover .ebook,
.bookData:hover .bookopen,
.bookData:hover .headphone,
.bookData:hover .karzinka {
  display: block;
}

.bookGrid {
  width: 100%;
  display: grid;
  grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
  gap: 0.9375rem;
}

.starsNumbers {
  color: #9196ad;
  font-size: 0.8125rem;
}

.title {
  font-weight: 800;
}

.author {
  color: #9196ad;
}

.activeCategory {
  color: blue !important;
}

.bookTypeRequest {
  cursor: pointer;
}

.dataItem {
  box-shadow: 0px 2px 4px 0px #dbdbdb40;
  border-radius: 0 0 7px 7px;
  height: 260px;
}

.btnBestseller {
  background: #67c926;
  position: absolute;
  left: -5px;
  top: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  font-weight: 600;
  z-index: 1;
  width: 78px;
  height: 23px;
}

.newBook {
  background: #ff673d;
  position: absolute;
  left: -5px;
  top: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  font-weight: 600;
  width: 49px;
  height: 23px;
}

.karzinka {
  position: absolute;
  right: 10px;
  top: 45px;
  cursor: pointer;
  display: none;
}


.ebook {
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  display: none;
}

.bookDataa:hover .bookLike,
.bookDataa:hover .ebook,
.bookDataa:hover .karzinka {
  display: block;
}

.title {
  font-weight: 1000;
  color: black;
}

.author {
  color: #5b5e6d;
  font-weight: 600;
}

.bookLike {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  display: none;
}

.categoyImg {
  width: 100%;
  height: 100%;
  border-radius: 7px;
}

.aboutMenu div:hover {
  cursor: pointer;
  font-weight: 500;
}

.bookTypeActive {
  border: 1px solid #41a2db !important;
  color: #41a2db !important;
}
.price {
  color: black;
  font-weight: 800;
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
