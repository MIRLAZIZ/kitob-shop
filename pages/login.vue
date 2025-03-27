<template>
  <div class="row">



    <div class="main col">
      <img class="main_img" src="@/assets/register/kytab.png" alt="" @click="$router.push('/')"/>
      <img class="main_imgs" src="@/assets/register/login.png" alt="" />
    </div>



    <div class="p-5 col">

      <div class="d-flex justify-content-end">
        <Locales />
      
      </div>

      <div>
        <div class="section_list">
          <h1>{{  $t('order.login')}}</h1>
          <h2>{{ $t('order.access_books') }}</h2>
        </div>


        <div>
          <FormaPhoneField v-model="userlogin.phone" :title="'home.phone'" ref="telNumberref" />

          <FormaPasswordField v-model="userlogin.password" class="mt-3" title="" ref="passwordref" />


          
          <div class="my-3">
            <NuxtLink to="/password">{{ $t('order.forgot_password') }}</NuxtLink>
          </div>
          <button @click="senDataUser">{{ $t('order.login') }}</button>
          <div class="bottom">
            <h2>
            {{ $t('order.registred') }}
              <NuxtLink to="/register">{{ $t("order.sign_up") }}</NuxtLink>
            </h2>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script setup>
import Locales from '../components/Locales.vue';

const store = useLogin();
const router = useRouter();
const userlogin = ref({
  phone: null,
  password: null,
});
const passwordref = ref(null)
const telNumberref = ref(null)
const storeNotfy = useNotification()
const validatsiyaArray = ref([])

definePageMeta({
  layout: 'login'
})


const handleCustomEvent = () => {

  validatsiyaArray.value = [];


  if (telNumberref.value) {

    let phoneFild = telNumberref.value.validatesiyPhone()
    validatsiyaArray.value.push(phoneFild)

  }

  if (passwordref.value) {
    let passwordfild = passwordref.value.validatsiyaPassword()
    validatsiyaArray.value.push(passwordfild)
  }
}



const senDataUser = () => {
  handleCustomEvent()
  let validationData = validation(validatsiyaArray.value)
  if (validationData) {
    userlogin.value.phone = 998 + userlogin.value.phone.replace(/\s/g, "");
    store.loginUser(userlogin.value).then(() => {
      router.push('/')
    }).catch((error) => {
      
      storeNotfy.errorToast(error.response._data.message)

    });

  }
};





</script>

<style lang="scss" scoped>
.main {
  border-radius: 0px, 50px, 50px, 0px;
  background-color: #e2f4ff;
  padding: 40px 60px;
}

.main_img {
  border-radius: 146.21px;
  cursor: pointer;
}

.main_imgs {
  height: 500px;

}

// .section_select {
 
//   border: none;
// }



.section_list h2 {
  height: 19px;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  color: #a3acb5;
}


label {
  height: 18px;
  font-family: Manrope;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #323232;
}


label span {
  color: #e93c3c;
  font-size: 19px;
  font-weight: 700;
}

.li {
  display: flex;
  justify-content: space-between;
}

.li a {
  height: 18px;
  font-family: Manrope;
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  color: #41a2db;
}

button {
  width: 100%;
  background-color: #1c5793;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
}

.bottom {
  width: 100%;
  border: 1px;
  margin: 20px 0px 0px 0px;
}

.bottom h2 {
  font-family: Manrope;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  // color: #35363D
}

.NuxtLink {
  color: #1c5793;
}
</style>
