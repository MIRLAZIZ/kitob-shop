<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script  setup>
 import { useI18n } from "vue-i18n";
 const {t} = useI18n()

onMounted(() => {
  tranlateFunction(t)
})


</script>
