<template>
    <div>
        <label class="form-label">Yangi parolni takrorlang <span class="text-danger">*</span></label>

        <div class="input-container">

            <input class="form-control shadow-none" placeholder="Yangi parolni takrorlang"
                v-model="confirm_password" :type="is_eye ? 'password' : 'text'" />
                 <img src="/assets/profile/eye.png" alt="" class="eye-icon"  @click="is_eye = !is_eye">
        </div>

     
        


        <small v-if="errorConfirm_password" class="text-danger"> {{ errorConfirm_password.message }}</small>


    </div>
</template>

<script setup>
const props = defineProps({
    password: {
        type: String,
    }
})
const confirm_password = defineModel()
const errorConfirm_password = ref(null)
const is_eye = ref(true)

watch(confirm_password, (newValue) => {
    if (newValue) {
        errorConfirm_password.value = confirmedValidator(newValue, props.password)
    }
})

const validationConfirmPassword = () => {
   
    errorConfirm_password.value = confirmedValidator(confirm_password.value, props.password)
    return errorConfirm_password.value

}

defineExpose({ validationConfirmPassword })

</script>

<style lang="scss" scoped>



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