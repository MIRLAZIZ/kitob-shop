<template>
    <div>

        <label  class=" mb-1">{{ $t(props.title) }}<span class="text-danger">*</span></label>
        <div class="d-flex align-items-center border bg-white rounded">
            <span class="ms-2 small">+998</span> 
            <ClientOnly>


              <input v-maska data-maska="## ### ## ##" v-model="phone" type="text" class="form-control  border-0 shadow-none " :placeholder="$t('home.enternum')" autocomplete="off" />
            </ClientOnly>
            

        </div>
        <small v-if="errorTel" class="text-danger">{{
                  errorTel.message
                }}</small>

    </div>
</template>



<script setup>

import { useI18n } from 'vue-i18n';


const props = defineProps({
  title: {
    type:String,
     default: ''
  }
})

const { t } = useI18n()
const phone = defineModel()
const errorTel = ref(null)


watch(phone, (newValue) => {
  if(newValue) {
    errorTel.value = validateLength(newValue, t(props.title), 12, 12, );
  }
},
);


const validatesiyPhone = () => {
  errorTel.value = validateLength(phone.value, "telfon nomeri", 12, 12, );
  return errorTel.value
  
}
defineExpose({validatesiyPhone})


</script>


