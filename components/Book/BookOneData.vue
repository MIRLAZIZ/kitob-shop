<script setup>
const store = usePayment();
const route = useRoute();
const url = useRuntimeConfig().public.bookUrl;
const siteUrl = useRuntimeConfig().public.siteUrl;
const router = useRouter();
let comitCount = ref(0);
let ratings = ref(0);
let type = ref([]);
const storeBasket = useBasketStore();
let bookType = ref(null);
let is_book = ref(false);
let comentsData = ref([]);
let routePath = route.path;
let copyPath = siteUrl + routePath;
let bookPrice = ref(null);
let file_fragment = ref(null);
let file_type = ref(null);
const reading = ref(0);
const storeNotfy = useNotification()


const copyLink = () => {
  navigator.clipboard.writeText(copyPath);
};
let bookcontent = ref(1);




const ordrItem = () => {
  if (!bookPrice.value) {
    const userType = localStorage.getItem("type");

    if (userType === "guest") {
      storeNotfy.errorToast("iltimos, ro'yhatdan o'ting")
    } else {
      let booktype = { book_type_id: bookType.value };

      if (book) {
        store.AddBook(booktype).then(() => {
          storeNotfy.succesToast("Sizning profilingizda ma'lumot saqlandi")
        });
      }
    }
    return;
  }

  const type = store.book?.type ? "book" : "other";


  let bookData = store.book?.type.filter(item => item.id == bookType.value)
  

  if (type == 'book') {


    let databook = {
    bookCount: 1,
    totalPrice: bookData[0].price,
    type: bookData[0].type ==='paper' ?  true : false 
  }

  localStorage.setItem('bookData', JSON.stringify(databook))

    const Book = [
      {
        bookTypeId: bookType.value,
        productId: route.params.id,
        quantity: 1,
        productType: type,
      },
    ];

    localStorage.setItem("Product", JSON.stringify(Book));
    router.push("/OrderItem");
  };
}







const fetchBookOne = () => {
  refresh();
};



const refresh = async () => {

  await store
    .fetch_book_one(route.params.id)
    .then(() => {
      comentsData.value = [...store.book.reviews, ...store.book.shop_reviews];

      let elementLength = comentsData.value.length;


      let sum = 0;
      if (store.book) {
        comentsData.value.forEach((element) => {


          let ratingData = element.rating;
          sum += ratingData;
        });
        ratings.value = sum / elementLength || 0;
        comitCount.value = elementLength;
      }


      if (store.book && store.book.type) {
        store.book.type.forEach((item) => {
          type.value.push(item.type);

          if (item.type) {
            is_book.value = true;
          }
        });
      }
    })
    .catch((error) => {
      storeNotfy.errorData(error.response._data.errors)
    });
};


const basketAdd = (id, type) => {
  storeBasket
    .basketAdd({ product_id: id, type: type.length ? "book" : "product" })
    .then(() => {
      storeNotfy.succesToast('Savatchaga qoshildi')
    }).catch(error => {
      storeNotfy.errorData(error.response._data.errors)
    })
};



const addFavourite = (id, bookId) => {

  store.book.favorite = !store.book.favorite;

  if (store.book.favorite) {
    storeBasket.addFavourite({
      product_id: id,
      type: bookId.length ? "book" : "product",
    });
  } else {
    const type = bookId.length ? "book" : "product";
    storeBasket.favouriteDelete(id, type);
  }
};

onMounted(() => {
  refresh().then(() => {
    bookTypeadd(
      store.book?.type[0]?.id,
      store.book?.type[0]?.price,
      store.book?.type[0]?.file_fragment,
      store.book?.type[0]?.type
    );
  });
  store.Popular_recent()

});






const bookTypeadd = (id, price, file, type) => {

  bookType.value = id;
  bookPrice.value = price;
  file_fragment.value = file;
  file_type.value = type;


  if (type == "audio" && file) {

    reading.value = 2;
  } else if ((type == "paper" || type == "ebook") && file) {

    reading.value = 1;
  }
};



const fragment = () => {
  let data = JSON.stringify(file_fragment.value)
  if (process.client) {
    localStorage.setItem('epubUrl', data)

  }
  router.push('/reading')
}




const audio_fragment = () => {
  // let data = JSON.stringify(file_fragment.value)
  console.log(file_fragment.value);
  
  localStorage.setItem('audio_fragment', file_fragment.value)
  router.push('/audio')
}


</script>

<template>
  <div class="container mb-5 pb-5 px-0">


    <div class="my-3">
      <small class="mt-5 " style="cursor: pointer;">

        <span @click="router.push('/')">
          {{ $t('home.profile.Homepage') }}
        </span>
        <span v-if="store.book && store.book.category.length"
          @click="router.push(`/Categories/${store.book?.category[0]?.id}`)">/{{

            $i18n.locale == "uz"
              ? store.book?.category[0]?.name_oz
              : store.book?.category[0]?.name_ru
          }}</span>


        <span v-if="store.book && store.book.name">
          / {{ store.book?.name }}
        </span>


        <span v-if="store.book && store.book.author[0]?.fio"> ({{ store.book?.author[0]?.fio }})</span>


      </small>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="bookimg border">
          <img :src="url + '/' + store.book?.image" alt="" />
        </div>

        <div class="showImgs">
          <div class="showImg" v-for="item in store.book?.gallery" :key="item">
            <img :src="url + '/' + item.path" alt="" />
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-8">
            <p class="bookAuthor">{{ store.book?.author[0]?.fio }}</p>

            <h3 class="bookTitle">{{ store.book?.name }}</h3>
          </div>
          <div class="col-4 d-flex align-items-center justify-content-end pe-0">
            <!-- like img  -->
            <img src="/assets/contact/oneBookLIke.png" alt="" class="me-2" style="cursor: pointer"
              @click="addFavourite(store.book?.id, store.book?.type)" />


            <!-- copy img -->
            <img src="/assets/contact/download.png" alt="" @click="copyLink" />
          </div>
        </div>

        <div class="d-flex align-items-center">
          <p class="d-flex align-items-center">
            <img src="/assets/contact/Star.png" alt="" class="" />
          </p>

          <p class="star">{{ ratings.toFixed(1) }}</p>
          <small class="statCount">({{ comitCount }})</small>
          <p class="mx-2">|</p>
          <p><img src="/assets/contact/chat.png" alt="" /></p>
          <p class="commentCount">{{ comitCount }}</p>
          <p class="statCount small">{{ $t("home.review") }}</p>
        </div>
        <div>
          <span class="statCount">{{ $t("home.cost") }}:</span>
          <div class="mb-3">

            <!-- <pre>
              {{ store.book }} 
            </pre> -->
            <span class="bookPrice">{{ bookPrice }}{{ $t("home.basket.sum") }}</span>
            <!-- <small class="discount ms-3"><del>185 000  {{ $t("home.basket.sum") }}</del></small> -->
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <!-- booktype -->
            <div class="d-flex justify-content-between">
              <button class="booktype btn border px-3" v-for="(item, index) in store?.book?.type" :key="index"
                @click="  bookTypeadd(item.id, item.price, item.file_fragment, item.type)"
                :class="{ bookTypeActive: bookType == item.id }">
                <img src="@/assets/contact/book-open.png" alt="" /><small class="ms-2">{{ item.type }}</small>
              </button>
            </div>

            <div class="mt-2 row">


              <div class="col-6" :style="{ cursor: reading !== 1 ? 'no-drop' : 'auto', }">


                <button @click="fragment" :disabled="reading !== 1" class="btn border w-100 fragment"
                  :style="{ cursor: reading !== 2 ? 'no-drop' : 'auto', }">
                  <img src="@/assets/contact/book-open2.png" alt="" />{{
                    $t("home.reading")
                  }}
                </button>


              </div>

              <div class="col-6" :style="{ cursor: reading !== 2 ? 'no-drop' : 'auto', }">
                <button @click="audio_fragment" :disabled="reading !== 2"
                  :style="{ cursor: reading !== 2 ? 'no-drop' : 'auto', }" class="btn border w-100 fragment">

                  <img src="@/assets/contact/headphones2.png" style="margin-right: 5px;" alt="" />{{
                    $t("home.audio")
                  }}


                </button>
              </div>


            </div>



            <button :disabled="bookPrice == null" :style="{ cursor: bookPrice == null ? 'no-drop' : 'auto' }"
              class="w-100 basket mt-2" @click="basketAdd(store.book.id, store.book.type)">
              {{ $t("home.addBasket") }}
            </button>



            <button class="w-100 buy mt-2" @click="ordrItem">
              {{ bookPrice ? $t("home.quickBuy") : $t('order.download') }}
            </button>
          </div>
        </div>
      </div>
    </div>





    <div class="bookData">
      <div class="aboutMenu d-flex">
        <div class="" :style="{
          'border-bottom': bookcontent === 1 ? '2px solid #307cce' : 'none',
          'padding-bottom': bookcontent === 1 ? '8px' : '0',
          color: bookcontent === 1 ? '#307cce' : 'initial',
        }" @click="bookcontent = 1">
          {{ $t("home.info") }}
        </div>
        <div class="ms-3" :style="{
          'border-bottom': bookcontent === 2 ? '2px solid #307cce' : 'none',
          'padding-bottom': bookcontent === 2 ? '8px' : '0',
          color: bookcontent === 2 ? '#307cce' : 'initial',
        }" @click="bookcontent = 2">
          {{ $t("home.content") }}
        </div>
        <div class="ms-3" :style="{
          'border-bottom': bookcontent === 3 ? '2px solid #307cce' : 'none',
          'padding-bottom': bookcontent === 3 ? '8px' : '0',
          color: bookcontent === 3 ? '#307cce' : 'initial',
        }" @click="bookcontent = 3">
          {{ $t("home.reviews") }}
        </div>
      </div>
      <hr class="mt-0" />
      <div v-show="bookcontent == 1">
        <BookAbaut />
      </div>


      <div v-show="bookcontent == 2" class="p-4">
        <h1>{{ $t('order.no_information') }}</h1>
      </div>

      <div class="comments" v-if="bookcontent == 3">
        <BookComments :comments="comentsData" :ratings="ratings.toFixed(1)" :commitCount="comitCount"
          :is_books="is_book" @fetchBookOne="fetchBookOne" />
      </div>
    </div>


    <div class="mt-5 mb-5" v-if="store?.recent?.length">
      <HomeMarketFast :bookImgs="store.recent" :title="$t('home.recently')" />
    </div>


  </div>
</template>


<style scoped>
.bookimg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background: #e6e8ec66;
  border-radius: 15px;
}

.bookimg img {
  width: 168px;
  height: 278px;
}

.bookAuthor {
  color: #959cac;
  font-size: 15px;
}

.bookTitle {
  min-height: 67px;
}

.star {
  color: #ec6934;
  font-weight: 500;
  font-size: 18px;
}

.statCount {
  color: #9196ad;
}

.commentCount {
  color: #35363d;
  font-weight: 600;
  font-size: 18px;
}

.bookPrice {
  color: #35363d;
  font-size: 22px;
  font-weight: 600;
}

.discount {
  color: #9196ad;
}

.booktype {
  width: 30%;
}

.fragment {
  font-size: 15px;
  background: #f0f0f0;
}

.basket {
  background: #67c926;
  color: #fff;
  border-radius: 6px;
  border: none;
  padding: 10px 0;
  font-weight: 600;
}

.buy {
  background: #307cce;
  border-radius: 6px;
  border: none;
  padding: 10px 0;
  color: #fff;
  font-weight: 600;
}

.showImg {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f6f7;
  height: 80px;
  border-radius: 8px;
}

.showImg img {
  width: 40px;
  height: 64px;
}

.showImgs {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  margin-top: 20px;
}

.bookData {
  /* width: 1198px; */
  height: auto;
  background: #fafafa;
  margin-top: 40px;
  border-radius: 10px;
}

.aboutBook {
  border-bottom: 2px solid #307cce;
  padding-bottom: 8px;
  color: #307cce;
}

.aboutMenu {
  padding: 32px 32px 0 32px;
}

.comments {
  padding: 0 32px 32px 32px;
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

.bookGrid {
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 10px;
}

.bookDataa {
  position: relative;
  height: 260px;
}

.dataItem {
  box-shadow: 0px 2px 4px 0px #dbdbdb40;
  border-radius: 0 0 7px 7px;
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
</style>
