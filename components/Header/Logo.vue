<template>
  <div>
    <div class="modalWindow" :style="{ display: inputFocus ? 'block' : 'none' }" @click="focusNone"></div>

    <div class="containerLogo d-flex align-items-center">
      <div class="container d-flex align-items-center justify-content-between px-0">


        <div class="d-flex">

          <div @click="$router.push('/')" class="seteLogo">
            <img src="~/assets/kytabLogo.png" alt="site-logo" />
          </div>



          <button class="btn btnCategory ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
            aria-expanded="false" aria-controls="collapseExample">
            <img src="~/assets/contact/category.png" alt="" class="me-2"/> {{$t('order.catalog')  }}
          </button>


          <div style="position: relative; z-index: 4; width:470px">
            <div class="input-group">
              <input type="text" @change="result" v-model="searchbooks" class="form-control shadow-none" style="height: 44px"
                :placeholder="$t('order.looking_book')" @focus="BookSearch" @keydown.enter="searchProduct" />

              <span class="input-group-text d-flex justify-content-center align-items-center"
                style="width: 68px; height: 44px" @click="searchProduct"><img src="~/assets/contact/bx_search-alt-2.png"
                  alt="" /></span>
            </div>



            <div class="mt-2" style="position: absolute; z-index: 999; width: 100%" v-if="inputFocus && searchList">
              <HeaderSearchData @searchEmit="selectData" />
            </div>
          </div>


        </div>







        <div class="d-flex">


          <div class="d-flex me-2">
            <div class="ms-5 karzinka" @click="router.push('/basket')">

              <img src="/assets/register/basket.svg" alt="">
              <span class="ms-1 forFont">{{ $t("header.basket") }}</span>
            </div>

            <sup v-if="basketLength">
              <div class="basketRounded">
                {{ basketLength }}
              </div>
            </sup>

          </div>





          <div class="d-flex me-2">



            <div class="dataCursor" @click="router.push('/favourite')">


              <img src="/assets/register/like.svg" alt="">

              <span class="ms-1 forFont">{{ $t("header.favorites") }}</span>
            </div>

            <sup v-if="likeLength">

              <div class="basketRounded">

                {{ likeLength }}
              

              </div>
            </sup>
          </div>


          <div class="dataCursor" @click="profile">
          <img src="/assets/register/profile.svg" alt="">
            <span class="ms-1 forFont" v-if="userType && userType == 'guest'">{{ $t("home.profile.login") }}</span>
            <span v-else> {{userData?.full_name }}</span>

          </div> 

        </div>


      </div>
    </div>

    <div class="collapse colapseContainer" id="collapseExample">
      <div  style="min-height: 100vh">
        <HomeCategoriesList />
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const searchbooks = ref(null);
const watchedValue = ref();
let inputFocus = ref(false);
const store = useTestTStore();
let searchList = ref(true);
const basketStore = useBasketStore();
const basketLength = ref(0)
const likeLength = ref(0)
const userType = ref(null)
const userData = ref(null)

const BookSearch = () => {
  document.body.style.overflow = "hidden";
  inputFocus.value = true;
  store.searchValue = null;
  store.searchValue = searchbooks.value;
};

const selectData = (data) => {
  // store.serchResult = null
  searchbooks.value = data;
  store.searchValue = null;

  searchProduct();
};
const profile = () => {
  let get = localStorage.getItem("type");
  if (get == "client") {
    router.push("/profile");
  } else {
    router.push("/login");
  }
};

watch(searchbooks, (newVal) => {

  sendRequest();

});

// Bekintga so'rovni yuborish funktsiyasi
const sendRequest = () => {
  // store.fechSearchTop()

  store.fetchBookSearch(searchbooks.value)
  store.productSearch = []
  store
    .fetchProductSearch(searchbooks.value)

    .then(() => {
      store
        .fetchProductSearch(searchbooks.value).then(() => {
          if (store.productSearch.length == 0) {
            // searchList.value = false
            searchList.value = false;
            store.searchValue = searchbooks.value;
          } else {
            store.searchValue = searchbooks.value;
            searchList.value = true;

            if (!searchbooks.value) {
              store.productSearch = [];
            }
          }

        })



    })


};
const searchProduct = () => {
  focusNone();
  if (searchbooks.value?.length > 3) {
    // qidruvlarni tarixia uchun qidirilgan productlarni  post qiib becendga jo'natish
    store.createHistoryBook({ word: searchbooks.value });
    // book apisidan ma'lumot izlash
    store.fetchBookSearch(searchbooks.value).then(() => {
      // product apisidan ma'lumotlar izlash
      store
        .fetchProductSearch(searchbooks.value)

        .then(() => {
          if (store.productSearch) {
            // store.serchResult = null
            searchList.value = false;
            store.searchValue = [];
            // store.serchResult = res
            // console.log('dfadfsa');
            router.push("/search");
          }
        });
    });
  }
};
const focusNone = () => {
  document.body.style.overflow = "visible";
  inputFocus.value = false;
};

onMounted(() => {

  const jwtToken = localStorage.getItem('jwtToken')
  if (!jwtToken ) {
    store.uuIdPost({
      uuid: String(new Date().getTime()),
      model: navigator.userAgent,
    })
    .then(() => {
      userType.value = localStorage.getItem('type')
    })
  }

   userType.value = localStorage.getItem('type')
   userData.value =  JSON.parse(localStorage.getItem('userData'))

  

  





  basketStore.basketGet().then(() => {
    if (basketStore.basket) {
      basketLength.value = basketStore.basket.length;
    }
  });



  basketStore.favourite().then(() => {
    if (basketStore.like) {
      likeLength.value = basketStore.like.length;
    }
  });
});

watch(() => basketStore.basket, (newBasket, oldBasket) => {
  if (newBasket) {
    basketLength.value = newBasket.length;
  }
});

watch(() => basketStore.like, (newLike, oldLike) => {
  if (newLike) {
    likeLength.value = newLike.length;
  }
});
</script>

<style scoped>
.active {
  fill: #35363d;
}

.karzinka2 {
  display: none;
}

.containerLogo {
  height: 90px;
  border-bottom: 1px solid #d1d1d1;
}

.btnCategory {
  background: #ebf2fc;
  margin-left: 50px !important;
  margin-right: 15px;
  /* height: 44px; */
}

.forFont {
  color: #35363d;
  font-size: 14px;
}

.dataCursor {
  cursor: pointer;
  padding-left: 8px;
  border-left: 1px solid #d1d1d1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.karzinka {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}


.seteLogo {
  cursor: pointer
}

.basketRounded {
  background-color: red;
  border-radius: 50%;
  padding: 5px;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #fff;
  font-weight: 900 !important;
}

.modalWindow {
  position: absolute;
  background: #31313159;
  width: 100%;
  height: 100vh;
  z-index: 4  ;
}
</style>
