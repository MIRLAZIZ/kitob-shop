<template>
  <div class="row">

    <div class="main px-5 py-4 col ">
      <img class="main_img" src="/assets/register/kytab.png" alt="" @click="$router.push('/')" />
      <div class="d-flex justify-content-center">
        <img class="main_imgs" src="/assets/register/password.png" alt="" />

      </div>
    </div>


    <div class="col px-5 py-4">

      <div class="d-flex justify-content-end">
        <Locales />

      </div>



      <div>
        <div class="">
          <h3>Parolni tiklash</h3>
          <small>Tizim kirish va 1280+ kitobga kirish huquqiga ega boʻling</small>
        </div>


        <!-- PAGE 1 -->
        <div v-if="content == 1">
        

            <FormaPhoneField v-model="telNumber" :title="'home.phone'" ref="telNumberref" />
    
          <button @click="senDataUser1" class="mt-3">Davom etish</button>

        </div>



        <!-- PAGE 2 -->
        <div v-if="content == 2">
         


            <label for="email" class="form-label">Tasdiqlash kodi: <span class="mx-1">{{
              formatPhoneNumber(userPhoneData?.phone) }} </span> telefon raqamga
              yubordik </label>


            <FormaSmsCode v-model="code" />

            <div class="my-1 text-danger">
              {{ errorCode }}
            </div>

            <div class="mt-2">
              <p v-if="isCounting"> {{ time }} soniya dan so’ng takroran yuborish
              </p>
              <p @click="senDataUser1" class="codeAgain" v-else>Ko’dni takroran yuborish</p>
            </div>


         
        </div>



        
        <!-- Page 3 -->
        <div v-if="content == 3">


         
            <FormaPasswordField v-model="generatepasword.password" ref="passwordref" class="mt-3" />
       
         

            <FormaConfirmPassword v-model="generatepasword.confirm_password" :password="generatepasword.password"
              ref="confirmPasswordref" class="my-3" />

        
          <button @click="senDataUser3">Yangi parolni o'rnatish</button>

        </div>



       <div  class="mt-2">
         <small>
           Avval ro'yhatdan o'tganmisiz?
           <NuxtLink to="/register">Ro'yxatdan o'tish</NuxtLink>
         </small>
       </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';


const store = useLogin();
const storeNotfy = useNotification()
const { t } = useI18n()
const time = ref(40)
let interval = null
const isCounting = ref(false)
const errorCode = ref(null)
const telNumber = ref(null);
const telNumberref = ref(null)
const userPhoneData = ref(null)
const passwordref = ref(null)
const router = useRouter()
const confirmPasswordref = ref(null)

const code = ref(null);

const generatepasword = ref({
  password: null,
  confirm_password: null,
});

let content = ref(3);


const validatsiyaArray = ref([])


watch(code, (newValue) => {
  if (newValue.length >= 6) {
    senDataUser2()

  }
})




const startTime = () => {
  isCounting.value = true;
  time.value = 40;

  interval = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      clearInterval(interval);
      isCounting.value = false; // Tugma faollashadi
    }
  }, 1000);
};




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
  if (confirmPasswordref.value) {
    let confirmPassword = confirmPasswordref.value.validationConfirmPassword()
    validatsiyaArray.value.push(confirmPassword)

  }

}











const senDataUser1 = () => {


  handleCustomEvent()
  let validationData = validation(validatsiyaArray.value)

  if (validationData) {
    let data = {
      phone: 998 + telNumber.value.replace(/\s/g, "")
    }
    store
      .forgetPassword(data)
      .then((res) => {
        userPhoneData.value = res.result
        content.value = 2;
        startTime()

      })
      .catch((error) => {
        storeNotfy.errorData(error.response._data.errors)
      });
  } else {
    storeNotfy.errorToast(t('order.required_field'))

  }
};




const senDataUser2 = () => {
  let data = {
    code: code.value,
    phone: 998 + telNumber.value.replace(/\s/g, "")

  }


  store.checkforgetpassword(data).then((res) => {
    if (res.error) {
      errorCode.value = res

    } else {


      localStorage.setItem('userData', JSON.stringify(res.result.user_data))
      localStorage.setItem('userFullName', res.result.user_data.full_name)
      localStorage.setItem('type', res.result.user_data.type)

      localStorage.setItem("jwtToken", res.result.token);
      localStorage.setItem("refreshToken", res.result.refresh_token);
      content.value = 3;
    }
  }).catch(error => {

    errorCode.value = error.response._data.message

  })

};

const senDataUser3 = () => {


  handleCustomEvent()
  let validationData = validation(validatsiyaArray.value)
  if (validationData) {
    store.changepassword(generatepasword.value)
      .then(() => {
        storeNotfy.succesToast(t("order.successful"))
        router.push('/')


      }).catch(error => {
        storeNotfy.errorData(error.response._data.errors)
      })
  }

};

function formatPhoneNumber(number) {
  if (!number) return '';
  return number.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
}



</script>

<style lang="scss" scoped>
.main {
  background-color: #e2f4ff;
  height: 100vh;
  border-bottom-right-radius: 50px;
}

.main_img {
  cursor: pointer;
}
label {
  font-size: 14px;
  font-weight: 700;
  color: #323232;
  margin: 20px 0px 10px 0px;
}

button {
  width: 100%;
  background-color: #1c5793;
  padding: 10px;
  border: none;
  border-radius: 10px;
  color: white;
} 

.NuxtLink {
  color: #1c5793;
}
.codeAgain {
  color: #307CCE;
  cursor: pointer;
}
</style>