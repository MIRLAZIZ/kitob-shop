<script setup>
import { ref, computed, onMounted } from "vue";

const codeLength = 6;
const smsCode = ref(Array(codeLength).fill(""));
const code = defineModel();
const inputRefs = ref([]);

// Har bir input faolligini aniqlash
const isDisabled = computed(() => 
  smsCode.value.map((_, index) => index > 0 && !smsCode.value[index - 1])
);

// Barcha input hodisalarini boshqarish
const handleEvent = (index, event) => {
  if (event.type === "input") {
    // Faqat raqamlar qabul qilinadi
    const value = event.target.value.replace(/\D/g, "");
    smsCode.value[index] = value.substring(0, 1);
    
    // Keyingi inputga avtomatik o'tish
    if (value && index < codeLength - 1) {
      inputRefs.value[index + 1]?.focus();
    }
  } 
  else if (event.type === "keydown" && event.key === "Backspace" && !smsCode.value[index] && index > 0) {
    // Backspace bosilganda oldingi inputga qaytish
    smsCode.value[index - 1] = "";
    inputRefs.value[index - 1]?.focus();
  }
  
  // Kodni yangilab ota komponentga jo'natish
  code.value = smsCode.value.join("");
};

onMounted(() => {
  inputRefs.value[0]?.focus(); // Boshlanishda birinchi inputga fokus berish
});
</script>

<template>
  <div class="sms-code-container">
    <input
      v-for="(digit, index) in smsCode"
      :key="index"
      ref="inputRefs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      v-model="smsCode[index]"
      :disabled="isDisabled[index]"
      @input="handleEvent(index, $event)"
      @keydown="handleEvent(index, $event)"
      class="sms-code-input"
      :class="{ 'disabled': isDisabled[index] }"
    />
  </div>
</template>

<style scoped>
.sms-code-container {
  display: flex;
  gap: 10px;
}

.sms-code-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background: white;
}

.sms-code-input.disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.sms-code-input:focus {
  border-color: #2196F3;
}
</style>