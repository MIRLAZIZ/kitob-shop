<template>

    <div class="">
        <div class="" style="background-color: transparent !important; border: none">
            <div class="modalData" :style="{ backgroundImage: `url(${bgImg})` }">
                <h4>{{ $t("home.confirm") }}</h4>
                <p class="modalContent">{{ $t("home.oneTime") }}</p>
                <div class="d-flex justify-content-between mt-2"></div>
                <div>
                    <img src="/assets/contact/peymentLine.png" alt="" class="w-100" />
                </div>
                <div class="mt-4">
                    <input type="text" class="form-control" :placeholder="$t('home.oneTimeCode')" />
                </div>
                <div class="mt-4">
                    <p class="modalContent text-center">
                        {{ $t("home.resend") }}
                    </p>
                </div>

                <div class="d-flex justify-content-end mt-4 ">

                    <button class="peymentcancel text-center" @click='closeModal' >
                        {{ $t("home.cancel") }}
                    </button>
                  
                    <button class="modalbutton" @click="start">
                        Yuborish
                    </button>
            


                  
           

                </div>


               



            </div>
        </div>
    </div>

</template>

<script setup>
import bgImg from "@/assets/contact/peymentBacground.png";

const store = OrderPayment()


const props = defineProps({
    open_modal: {
        type: Boolean
    },
    phone: {
        type: String
    },
    sms: {
        type: String
    }
})

const emit = defineEmits(['update:open_modal', 'allData'])

const closeModal = () => {
  emit("update:open_modal", false); // Modalni yopish
};


const start = () => {
    

    let phone = 998 + props.phone.replace(/\s/g, "");

  let guest = {
    phone: Number(phone),
    code: 585843
  }
  store.Order_Forget(guest)
      .then(()=>{
          localStorage.setItem('jwtToken',store.forget.token);
          localStorage.setItem('refreshToken',store.forget.refresh_token);
          localStorage.setItem('type', store.forget.user_data.type)
          localStorage.setItem("phone", store.forget.user_data.phone)
          emit("allData");

      }).catch(error =>  {

      })



}



// const start=()=>{
//   let guest = {
//     phone:Payment.value.phone,
//     code:Payment.value.sms
//   }
//       store.Order_Forget(guest)
//       .then(()=>{
//           localStorage.setItem('jwtToken',store.forget.token);
//           localStorage.setItem('efreshToken',store.forget.refresh_token);
//           localStorage.setItem('type', store.forget.user_data.type)
//           localStorage.setItem("phone", store.forget.user_data.phone)

//           al()
//           console.log('al ishladi')
//       });
      
//  }





</script>

<style scoped>
.modalData {
    width: 524px;
    height: auto;
    padding: 60px 30px;
    background-size: 100% 100%;
}

.modalData h4 {
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
}

.modalConten {
    font-size: 17px;
    color: #35363d;
    font-weight: 500;
}

.modalbutton {
    /* width: 100%; */
    background-color: blue;
    color: white;
    /* height: 5vh; */
    border: none;
    border-radius: 5px;
    font-weight: 700;
    font-size: 14px;
    padding: 5px 10px;
    margin-left: 10px;
}

.peymentcancel {
    color: white;
    /* width: 100%; */
    background-color: red;
    /* height: 5vh; */
    border: none;
    font-weight: 700;
    border-radius: 5px;
    font-size: 14px;
    padding: 5px 10px;
}
</style>