<template>
  <div>
    <label for="" class="processingLabel mb-1">{{ $t(props.title) }}<span>*</span></label>
    <input v-model="full_name" type="text" class="form-control shadow-none" :placeholder="$t(props.title)" />

    <small v-if="full_name_error" style="color: red">{{
      full_name_error.message
      }}</small>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const props = defineProps({
  title: {
    type: String
  },
  rules: {
    type: Array
  }
})
const full_name = defineModel()
const full_name_error = ref(null)



watch(full_name, (newValue) => {

  if (props.rules?.includes('requredLength')) {

    full_name_error.value = validateLength(newValue, t(props.title), 5)


  }

  else if (props.rules?.includes('required')) {
    full_name_error.value = isEmpty(newValue, t(props.title));

  }
});


const validationFullName = () => {
  if (props.rules?.includes('requredLength')) {

    full_name_error.value = validateLength(full_name.value, t(props.title), 5)
    return full_name_error.value


  }

  else if (props.rules?.includes('required')) {

    
    full_name_error.value = isEmpty(full_name.value, t(props.title));
    return full_name_error.value

  }
}


defineExpose({validationFullName})






</script>

<style scoped></style>