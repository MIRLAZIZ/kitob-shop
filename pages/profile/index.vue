<template>
    <div  >
      <div class="main  ">
        
      <div class=" row " v-if="(store?.notifications?.result)" >
        <h1 class="h1">{{$t("home.profile.Notification")}}</h1>
        <div class="row ">
          <div class="main_list col " >
            <div class="img1 col-sm-6"  v-for="(item,index) in store?.notifications?.result" :key="index" @click="selectImg(item.id)">
              <div>
                <img :src="'https://beta.kytab.uz'+item.parent.image"  alt="">
                <!-- <pre>{{ item.parent.image }}</pre> -->
              </div>  
                <div >
                    <h2>{{item.parent.title}}</h2>
                    <p>{{item.parent.body.substring(0,90)}}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <TableNotfound />
      </div>
    </div>
    </div>
  </template>
  <script setup>

  const store = ProfileHistory()

  onMounted(()=>{
    store.Notification()
  })


const selectImg = (id) =>{
  const router = useRouter()
  router.push(`/profile/Notification/${id}`)
}

  </script>
  
  <style lang="scss" scoped>
  .nuxt-link-exact-active {
    text-decoration: none;
    border-bottom: none;
  }
  .nuxt-link-exact{
    border-bottom: none;
  }
  .main {
   
    border-radius: 10px;
    background-color:#FAFAFA;    
    min-height: 380px;
 
  }
  
  </style>