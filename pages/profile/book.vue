<template>
    <div>
      <div class="main"   >
      
        <div >
       
        <h1 class="h1">{{ $t("home.profile.My books") }}</h1>
        <div class="main_div">
          <div  class="main_p" :class="{'price' :content == 1}" @click="content = 1">{{ $t("home.profile.Electronic book") }}</div>
          <div  class="main_p" :class="{'price' :content == 2}" @click="content = 2">{{ $t("home.profile.Audio book") }}</div>
        </div>
        <div>
          <div v-if="(store.books?.result?.ebooks?.length)">
            <div   v-show="content == 1"><TableBook/> </div>
          </div>

          
          <div v-else>
               <div   v-show="content == 1"><TableNotfound/></div>
          </div>

        </div>


        <div>
          <div v-if="(store.books?.result?.audios?.length)">
            <div   v-show="content == 2"><TableAudio/> </div>

          </div>
          <div v-else>
            <div   v-show="content == 2"><TableNotfound/></div>
          </div>

        </div>

        
      </div>
        
      </div>

    </div>
  </template>
  
  <script setup>
  const store = ProfileHistory()
  const content = ref(null)
  onMounted(() => {
    content.value = 1;
    store.Book()
  })
  // console.log(store.books.result.book,'store.book');
  
  </script>
  
  <style lang="scss" scoped>
  .main {  
    background-color: #fafafa;
    border-radius: 12px;
    padding: 16px;
  }
  .h1 {
   
    font-family: Manrope;
    font-size: 20px;
    font-weight: 600; 
    text-align: left;
    color: #35363d;  
    padding-top: 18px;
  }
  .main_div {   
    display: flex;
  }
  .price{
    // background-color: red;
    // border-radius: 5px;
    border-bottom:2px solid green;
    color: rgb(244, 54, 82);
    
  }
  .main_p {
    
    top: 292px;
    left: 509px;
    font-family: Manrope;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.02em;
    // text-align: left;
    color: #1c5793;
    margin: 15px 0px 30px 30px;
    // background-color: red;
    padding: 5px;
    cursor: pointer;

  }
  .nuxt-link-exact-active .nuxt-link,
  .NuxtLink .nuxt-link-exact .nuxt-link {
    text-decoration: none;
  }
  
  </style>