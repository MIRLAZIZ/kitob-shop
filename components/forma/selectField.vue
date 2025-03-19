<template>
    <div>
       
                <label for="" class="processingLabel mb-1">{{ $t(props.title) }}<span>*</span></label>


                <select v-model="selectValue" class="form-select shadow-none " >


                
                  <option :value="item.value"  v-for="item in props.data">{{ item.name }}</option>
                 
                </select>
                <small v-if="selectEror" style="color: red">{{
                  selectEror.message
                }}</small>
             
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const {t} =  useI18n()

const props = defineProps({
  title: {
    type: String
  },
  data: {
    type: Array
  }
   
})

const selectEror = ref(null)


 const selectValue = defineModel()

 watch(selectValue, (newValue) => {
   selectEror.value = isEmpty(newValue, t(props.title));
 })
 const selectValidate = () => {  

   selectEror.value =  isEmpty(selectValue.value, t(props.title));
   return selectEror.value
 }
 defineExpose({selectValidate})

</script>

<style scoped>

</style>