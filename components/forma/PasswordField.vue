<template>
    <div>
        <label  class="form-label">{{ $t('order.enter_password') }} <span class="text-danger">*</span></label>

        <div  class="input-container" >
            <input v-model="password" class="form-control mb-1 shadow-none" :type="is_eye ? 'password' : 'text'" :placeholder="$t('order.enter_password')" />
           

            <img src="/assets/profile/eye.png" alt="" class="eye-icon" @click="is_eye = !is_eye" >


            


        </div>
        <small v-if="passwordError" class="text-danger "> {{ passwordError?.message }}</small>
    </div>
</template>

<script setup>
const password = defineModel()
const passwordError = ref(null)
const is_eye = ref(true)






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

<style scoped>

/* Inputni ichida icon joylash */
.input-container {
  position: relative;
}

.input-container input {
  padding-right: 40px; /* Ko'zcha uchun joy qoldirish */
}

.eye-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  cursor: pointer;
}

</style>

