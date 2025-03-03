<template>
  <div>
    <div class="container px-0 mt-5">
      <div class="d-flex justify-content-between mb-3">
        <div class="d-flex">
          <h4 class="bestText">{{ title }}</h4>
          <svg
            class="mt-1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7 4L13 10L7 16"
              stroke="#35363D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <button class="nextRight me-2" @click="swiper.slidePrev()">
            <img src="@/assets/contact/arrowRight.png" alt="" />
          </button>
          <button class="nextLeft" @click="swiper.slideNext()">
            <img src="@/assets/contact/arrowLeft.png" alt="" />
          </button>
        </div>
      </div>
      
      <div class="book-carousel-container">
        <swiper-container 
          ref="containerRef"
          :slides-per-view="6"
          :space-between="10"
          :pagination="true"
        
          :mousewheel="true"
          :autoplay="{
            delay: props.swiperDley || 3000,
            disableOnInteraction: false
          }"
          class="book-swiper"
        >
          <swiper-slide
            v-for="(item, idx) in props.bookImgs"
            :key="idx"
            class="book-slide"
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
              <small class="author"> favorite: {{ item.is_favorite }}</small>
            </div>
            <small class="stats ms-2">5,0</small>
            <span class="starsNumbers">(32)</span>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from "nuxt/app";

const store = useBasketStore();
const urlimg = useRuntimeConfig().public.bookUrl;
const containerRef = ref(null);

const props = defineProps({
  title: String,
  swiperDley: Number,
  bookImgs: {
    type: Array,
    default: () => [],
  },
});
 

const swiper = ref(null);
const loopEnabled = ref(false);

watch(() => props.bookImgs, (newVal) => {
  loopEnabled.value = newVal.length > 6;
}, { immediate: true });

onMounted(() => {
  if (containerRef.value) {
    // Access the Swiper instance after the component is mounted
    swiper.value = containerRef.value.swiper;
    
    // Set width for slides programmatically if needed
    if (swiper.value) {
      const slideElements = containerRef.value.querySelectorAll('.book-slide');
      slideElements.forEach((slide) => {
        slide.style.width = '190px';
      });
      
      // Make sure autoplay is enabled
      if (swiper.value.autoplay && typeof swiper.value.autoplay.start === 'function') {
        swiper.value.autoplay.start();
      }
    }
  }
});

const addBasket = (e, id, bookId) => {
  e.stopPropagation();
  store
    .basketAdd({ product_id: id, type: bookId ? "book" : "other" })
    .then(() => {
      notify();
    });
};

const addFavourite = (e, idx, id, bookId) => {
  e.stopPropagation();
  if (props.bookImgs[idx]) {
    props.bookImgs[idx].is_favorite = !props.bookImgs[idx].is_favorite;
  }
  
  if (props.bookImgs[idx].is_favorite) {
    store.addFavourite({
      product_id: id,
      type: bookId ? "book" : "other",
    });
  } else {
    const type = bookId ? "book" : "other";
    store.favouriteDelete(id, type);
  }
};

const notify = () => {
  useNuxtApp().$toast.success("Savatchaga qo'shildi", {
    autoClose: 5000,
    dangerouslyHTMLString: true,
  });
};
</script>

<style scoped>
.bestText {
  font-size: 22px;
  font-weight: 700;
}

.book-carousel-container {
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.book-swiper {
  width: 100%;
  height: 340px;
}

.book-slide {
  width: 190px !important; /* Force exact width */
  height: 320px;
  flex-shrink: 0;
}

.bookData {
  position: relative;
  height: 260px;
  width: 100%;
}

.bookLike, .bookLike2 {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  display: none;
}

.karzinka {
  position: absolute;
  right: 10px;
  top: 45px;
  cursor: pointer;
  display: none;
}

.wrapper-icons {
  position: absolute;
  display: flex;
  gap: 5px;
  right: 0.625rem;
  bottom: 0.625rem;
}

.ebook, .bookopen, .headphone {
  cursor: pointer;
  display: none;
}

.bookData:hover .bookLike,
.bookData:hover .bookLike2,
.bookData:hover .ebook,
.bookData:hover .bookopen,
.bookData:hover .headphone,
.bookData:hover .karzinka {
  display: block;
}

.starsNumbers {
  color: #9196ad;
  font-size: 13px;
}

.title {
  font-weight: 800;
}

.author {
  color: #9196ad;
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

.categoyImg {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  /* object-fit: contain; */
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

/* Swiper pagination styles */
:deep(.swiper-pagination) {
  position: relative;
  margin-top: 10px;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #d1d1d1;
  opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
  background: #67c926;
}

/* Force Swiper to respect our slide size */
:deep(.swiper-wrapper) {
  display: flex;
  align-items: center;
}

:deep(.swiper-slide) {
  width: 190px !important;
  max-width: 190px;
}
</style>