<template>
  <div>
    <div class="mobileApp mt-5 contaner">
      <div class="container px-0 py-5">
        <div class="row ">
          <div class="col-7">
            <h2>{{ $t("home.mobile") }}</h2>
            <br />
            <p class="mobileData">
              {{ $t("home.text") }}<br />{{ $t("home.text2") }}
            </p>
            <div class="mt-4">
              <a href="https://play.google.com/store/apps/details?id=org.alilm.kitab&hl=uz&pli=1" target="_blanc"> <img
                  src="@/assets/contact/playMarket.png" alt="" />
              </a>
              <a href=""> <img src="@/assets/contact/app_store.png" alt="" class="mx-4" />
              </a>
              <!-- <img src="@/assets/contact/kytab_quar.png" alt="" /> -->
              <img src="/assets/register/qrcode.png" alt="" class="qrCode" />
            </div>
          </div>
          <div class="col-5 d-flex justify-content-center">
            <img class="img" src="@/assets/contact/kytabMobile.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
.mobileApp {
  background: #fafafa;
}

.mobileApp h2 {
  font-size: 36px;
  font-weight: 700;
}

.mobileData {
  color: #9196ad;
  font-size: 20px;
}

@media (max-width: 1130px) {
  .col-7 {
    width: 100%;
  }

  .mt-4 {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .row {
    gap: 40px;
    justify-content: center;
    text-align: center;
  }

  .mobileApp {
    background: #fafafa;
    width: 100%;
  }

  .mobileApp h2 {
    font-size: 28px;
    font-weight: 700;
  }

  .mobileData {
    color: #9196ad;
    font-size: 16px;
    width: 100%;
  }

  .img {
    width: 300px;
    height: 180px;
  }
}

.qrCode {
  width: 56px;
  height: 56px;
}
</style>
