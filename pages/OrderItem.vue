<template>
  <div>

    <div class="   container mb-5 pb-5 px-0  position-relative">


      <h4 class="mt-4" style="font-weight: 700">{{ $t("home.processing") }}</h4>


      <div class="d-flex gap-3 ">



        <div class="  leftContainer">


          <div class="OrderProcessing ">


            <div class="d-flex">

              <div class="processingNumber">1</div>
              <p class="yourData ms-2">{{ $t("home.yourInfo") }}</p>
            </div>

            <div class="processingData mt-3">

              <!-- full name ------------------------------ -->
              <div v-if="usertype == 'guest'">
                <FormaFullNameField v-model="Payment.full_name" :title="'order.full_name'" :rules="['requredLength']"
                  ref="fullnameref" />
              </div>

              <!-- ----------------------------phone----------------------- -->
              <div v-if="usertype == 'guest'">
                <FormaPhoneField v-model="Payment.phone" ref="phoneref" :title="'home.phone'" />
              </div>

              <!-- -------------------------deliver  ------------------------------------ -->
              <FormaSelectField v-model="Payment.deliver" :title="'home.city'"
                :data="[{ value: 1, name: 'Toshkent' }, { value: 2, name: 'Andijon' }, { value: 3, name: 'Namangan' }]"
                ref="deleverref" />

              <!-- ------------------------------district--------------------------------------- -->
              <FormaSelectField v-model="Payment.district" :title="'home.district'"
                :data="[{ value: 1, name: 'Toshkent' }, { value: 2, name: 'Andijon' }, { value: 3, name: 'Namangan' }]"
                ref="districtref" />

              <!-- -------------------------------address-------------------------------- -->
              <FormaFullNameField v-model="Payment.address" :title="'home.address'" :rules="['required']"
                ref="addressref" />

            </div>



          </div>
















          <!-- to'lov turi -->
          <div class="paymentType">
            <div class="d-flex">
              <div class="processingNumber">2</div>
              <p class="yourData ms-2">{{ $t("home.payment") }}</p>
            </div>
            <p class="bycard">{{ $t("home.card") }}</p>


            <div class="peymentCards">

              <div class="peymentCard d-flex" v-for="(item, idx) in peymentType" :key="idx"
                @click="Payment.card = item.name">
                <!-- <p>{{ Payment.card }}</p> -->
                <input class="form-check-input" type="radio" :value="item.name" v-model="Payment.card" />
                <div class="d-flex justify-content-center align-items-center w-100">
                  <img :src="item.imgs" alt="" />
                </div>
              </div>

            </div>
            <div class="mt-4">
              <small style="font-weight: 600">{{ $t("home.cash") }}</small>
            </div>

            <div class="peymentCard d-flex mt-3" @click="Payment.card = 'cash'">
              <input class="form-check-input" type="radio" value="cash" v-model="Payment.card" />
              <div class="d-flex justify-content-center align-items-center w-100">
                <img src="/assets/contact/cash.png" alt="" />
              </div>
            </div>
          </div>



          <!-- yetgazib berish  -->
          <div class="delevryAdress">
            <div class="d-flex">
              <div class="processingNumber">3</div>
              <p class="yourData ms-2">{{ $t("home.deliverTime") }}</p>
            </div>

            <div class="deliverGrid">

              <div class="deliver" v-for="(item, idx) in store.delivery" :key="idx"
                @click="Payment.deliveryMethod = item.code, deleverIndex = idx">




                <div class="ps-2 d-flex">


                  <div>
                    <input class="form-check-input" type="radio" :value="item.code" v-model="Payment.deliveryMethod" />
                  </div>

                  <div class="ms-2">
                    <small>{{ item.name }}</small>
                    <p>{{ item.price }} so'm</p>
                  </div>
                </div>


                <img :src="'https://kytabshop.al-raqam.com' + item.image" alt="" />

              </div>
            </div>

          </div>




        </div>




        <!-- buyurtma haqida -->
        <div class="yourOrderContainer   ">
          <p class="yourOrder">{{ $t("home.basket.order") }}</p>
          <div class="d-flex justify-content-between orderAbout">
            <p>{{ $t("home.basket.books") }} (1)</p>
            <p>{{ bookData?.price }} {{ $t("home.basket.sum") }} </p>

          </div>

          <div class="d-flex justify-content-between orderAbout my-1">
            <p>{{ $t("home.basket.delivery") }}</p>
            <p>{{ store?.delivery[deleverIndex]?.price }} {{ $t("home.basket.sum") }}</p>
          </div>

          <div class="d-flex justify-content-between orderAbout">
            <p>{{ $t("home.basket.discount") }}</p>
            <p>0 {{ $t("home.basket.sum") }}</p>
          </div>
          <hr />
          <div class="d-flex justify-content-between orderTotal">
            <p>{{ $t("home.basket.total") }}</p>
            <p>{{ bookData?.price + store?.delivery[deleverIndex]?.price }} {{ $t("home.basket.sum") }}</p>
          </div>


          <div class="mt-2">
            <small>{{ $t("home.code") }}</small>
            <div class="d-flex justify-content-between mt-2">
              <input type="text" :placeholder="$t('home.enterCode')" class="orderPromokod" />
              <button class="submitProma" style="background-color:rgb(72, 72, 240)">{{ $t("home.apply") }}</button>
            </div>


            <div>
              <button class="w-100 cardPeyment fw-bold text-white sendOrder mt-3"
                style="background-color:rgb(72, 72, 240)" @click="send">
                {{ $t("home.processing") }}
              </button>
            </div>




          </div>
        </div>

      </div>











      <!-- ------------------------------------modal oynasi------------------------------------ -->
      <div class="modalContaner" v-if="open_modal" @click="open_modal = false">
        <OrederItemModal v-model:open_modal="open_modal" :phone="Payment.phone" :sms="Payment.sms" @allData="allData" />

      </div>







    </div>

  </div>
</template>
<script setup>
import click from "~/assets/contact/click.png";
import humo from "@/assets/contact/humo.png";
import mastercard from "@/assets/contact/mastercard.png";
import oson from "@/assets/contact/oson.png";
import payme from "@/assets/contact/payme.png";
import uzcard from "@/assets/contact/click.png";
import uzum from "@/assets/contact/uzum.png";
import { useI18n } from "vue-i18n";

const router = useRouter()
const store = OrderPayment()
const storeNotfy = useNotification()
const { t } = useI18n()


let Payment = ref({
  full_name: null,
  phone: null,
  deliver: null,
  district: null,
  address: null,
  comment: null,
  card: null,
  deliveryMethod: null,
  sms: null,
})


const fullnameref = ref(null)
const phoneref = ref(null)
const validatsiyaArray = ref([])
const deleverref = ref(null)
const districtref = ref(null)
const addressref = ref(null)
const open_modal = ref(false)
const usertype = ref(null)
const price = ref(null)
const delevireyAdress = ref(null)
const productBook = ref(null)
const bookData = ref(null)
const deleverIndex = ref(0)



const peymentType = [
  { imgs: payme, name: 'payme' },
  { imgs: click, name: 'click' },
  { imgs: uzum, neme: 'uzum' },
  { imgs: oson, name: 'oson' },
  { imgs: uzcard, name: 'uzcard' },
  { imgs: humo, name: 'humo' },
  { imgs: mastercard, name: 'mastercard' },
];



let url = useRuntimeConfig().public.bookUrl


const handleCustomEvent = () => {
  validatsiyaArray.value = [];
  if (phoneref.value) {

    let phoneFild = phoneref.value.validatesiyPhone()
    validatsiyaArray.value.push(phoneFild)

  }

  if (fullnameref.value) {
    let fullnameFild = fullnameref.value.validationFullName()
    validatsiyaArray.value.push(fullnameFild)

  }
  if (deleverref.value) {
    let deleverFild = deleverref.value.selectValidate()
    validatsiyaArray.value.push(deleverFild)
  }

  if (districtref.value) {
    let districtFild = districtref.value.selectValidate()
    validatsiyaArray.value.push(districtFild)

  }

  if (addressref.value) {

    let addressFild = addressref.value.validationFullName()
    validatsiyaArray.value.push(addressFild)
  }
}


onMounted(() => {
  let product = localStorage.getItem("Product")
  productBook.value = JSON.parse(product)
  usertype.value = localStorage.getItem("type")
  bookData.value = JSON.parse(localStorage.getItem('bookData'))[0]


  store.Order_delivery()
})




const send = async () => {

  handleCustomEvent()
  let validationData = validation(validatsiyaArray.value)


  if (validationData) {




    if (usertype.value == "guest") {

      let phone = 998 + Payment.value.phone.replace(/\s/g, "");

      let pay = {
        full_name: Payment.value.full_name,
        phone: Number(phone),
      }
      await store.Order_check(pay)
        .then(() => {
          open_modal.value = true
        }).catch(error => {
          storeNotfy.errorData(error.response._data.errors)

        })
    }
    else {
      sendAll()
    }
  }

  else {
    storeNotfy.errorToast(t('order.form_not'))
  }
}



// barcha maluotlrni yuborish 
const sendAll = () => {

  let check = Payment.value.deliver + " " + Payment.value.district + " " + Payment.value.address
  let deliveryMethodd = Payment.value.deliveryMethod
  let delivery = deliveryMethodd?.toLowerCase()
  let product = localStorage.getItem("Product")
  let products = JSON.parse(product)

  let payload = {
    deliveryAddress: check,
    paymentMethod: Payment.value.card,
    deliveryMethod: delivery,
    productList: products
  }


  if (Payment.value.card == 'cash') {

    store.Order_Payment(payload).then(() => {
      storeNotfy.succesToast(t('order.success'))
    })



  }
  else {
    store.Order_Payment(payload)
      .then(() => {
        let invoice_id = store?.invoic_id?.invoice_id
        localStorage.setItem("invoiceId", invoice_id)
        router.push('/payment')
      })
      .catch(error => {
        storeNotfy.errorData(error.response._data.errors)

      })

  }
}



const allData = () => {
  sendAll()
}
</script>


<style>
.OrderProcessing {
  background-color: #fafafa;
  /* width: 100%; */
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;

}

.yourOrderContainer {
  width: 26%;
  height: fit-content;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 18px 16px;
}

.paymentType {
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 30px;
}

.processingNumber {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #307cce;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
}

.yourData {
  color: #307cce;
  font-size: 17px;
  font-weight: 600;
}

.processingData {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
}

.form-control::placeholder {
  font-size: 14px;
  color: #767676;
}

.processingLabel {
  color: #767676;
  font-size: 13px;
  font-weight: 500;
}

.processingLabel span {
  color: #ff0000;
  font-weight: 900;
  margin-left: 2px;
}

.form-select {
  font-size: 14px;
  height: 40px;
}

.form-control {
  font-size: 14px;
  height: 40px;
}

.yourOrder {
  color: #35363d;
  font-weight: 600;
}

.orderAbout {
  color: #9196ad;
  font-size: 15px;
}

.orderTotal {
  font-weight: 600;
}

.orderPromokod {
  width: 160px;
  height: 40px;
  border-radius: 7px;
  border: 1px solid #dcdce1;
  outline: none;
  font-size: 14px;
}

.submitProma {
  width: 87px;
  height: 40px;
  border-radius: 7px;
  border: none;
  background: #9ec1e8;
  color: #fff;
  font-size: 14px;
}

.sendOrder {
  background: #9ec1e8;
  color: #fff;
  font-size: 15px;
  height: 40px;
  border: none;
  border-radius: 7px;
  font-weight: 600;
}

.bycard {
  font-weight: 600;
  margin: 20px 0 16px 0;
}

.peymentCard {
  width: 130px;
  height: 60px;
  border-radius: 7px;
  background: #fff;
  padding: 6px;
  cursor: pointer;
}

.peymentCards {
  display: grid;
  grid-template-columns: auto auto auto auto;
  /* grid-template-areas:
      "cardItem1 cardItem2 cardItem3 cardItem4 cardItem5"
      "line line line line line"
      "cardItem6 cardItem7 auto auto auto"
      "linee linee linee linee linee"; */
  row-gap: 14px;
}

.delevryAdress {
  background: #fafafa;
  border-radius: 10px;
  margin-top: 10px;
  padding: 20px 30px;
}

.deliverGrid {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
  margin-top: 20px;
}

.deliver {
  /* height: 60px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background: #fff;
  padding: 6px;
  cursor: pointer;
}



@media only screen and (max-width: 1500px) {

  .deliverGrid {
    display: grid;
    grid-template-columns: auto auto;

  }

}

.modalContaner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.leftContainer {
  width: 74%;
}
</style>