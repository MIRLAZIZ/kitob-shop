<template>
  <div>
    <!-- {{ $i18n.locale }}
    <h1>{{ $t('hello', { name: 'vue-i18n' }) }}</h1>  -->
  





    <HeaderContact />
    <HeaderLogo />
    <nav class="navbar pb-0">
      <HeaderMobileMenu />
      <div class="navbar-group container  px-0">
        <HeaderNavLinks />
      </div>
      <!-- <div class="navbar-group">
        <HeaderSearchBar />
        <HeaderProfile />
        <HeaderCartButton @open="cartState" />
      </div> -->
    </nav>
    <!--User Modal-->
    <!-- <HeaderUserModal /> -->
    <!--Cart Component-->
    <!-- <HeaderCart :is-open="cart" @closeCart="cartState" /> -->
  </div>
</template>

<script setup>

const config = useRuntimeConfig();
const url = config.public.siteUrl + "product";
// const {data} = await useAsyncData('item', () => $fetch(url))
// console.log(data);

// const { data } = await useFetch(url);
// console.log(data._rawValue
// );


const cart = ref(false);

const cartState = () => (cart.value = !cart.value);






</script>

<style lang="scss">
nav {
  z-index: 1;
}

.navbar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  background-color: #f8f8f8;
  padding-left: 20px;
  padding-right: 20px;
}

.navbar-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-item {
  a {
    margin-left: 13px;
    font-size: 17px;
    text-decoration: none;
    color: black;
  }

  .bc {
    a:hover,
    a:active {
      color: #ffd700;
    }
  }
}

.close {
  position: relative;
  bottom: 20px;
  left: 10px;
  font-size: 31px;
  color: #000;
}

.btn-sm {
  border-radius: 0;
}

form .btn-xl.btn-success.mt-3 {
  position: relative;
  -webkit-transition-duration: 100ms;
  transition-duration: 100ms;
  width: 100%;
  height: 50px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  box-shadow: 0 26px 38px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.user {
  cursor: pointer;
}
</style>
