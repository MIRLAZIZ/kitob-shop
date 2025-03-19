<template>
    <div>
        <label for="password" class="form-label">Parol <span>*</span></label>
        <input v-model="password" class="form-control mb-1" type="password" placeholder="parol 8 ta bo'lsin" />
        <small v-if="passwordError" class="text-danger "> {{ passwordError?.message }}</small>
    </div>
</template>

<script setup>
const password = defineModel()
const passwordError = ref(null)



// const props = defineProps({
//   title: {
//     type:String
//   }
// })




watch(password, (newValue) => {
    passwordError.value = passwordValidator(newValue)
},
);


const validatsiyaPassword = () => {
    passwordError.value = passwordValidator(password.value)
    return passwordError.value

}
defineExpose({ validatsiyaPassword })




</script>

<style lang="scss" scoped></style>