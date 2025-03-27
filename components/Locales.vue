<template>
    <div>
        <select class="section_select hover:border-blue-600 text-body" v-model="$i18n.locale" @change="changeLanuage">
          <option value="uz">O'zbekcha</option>
          <option value="ru">Rus</option>
        </select>
    </div>
</template>

<script setup>
const changeLanuage = (e) => {
  localStorage.setItem("language", e.target.value);
};

</script>

<style lang="scss" scoped>

.section_select {
  appearance: auto; /* Standart select ikonkasini tiklaydi */
  border: 1px solid #ccc; /* Select atrofida chiziq qo‘shadi */
  padding: 8px; /* Ichki padding */
  background-color: white; /* Fon rangini aniqlaydi */
  border-radius: 5px; /* Burchaklarni yumshatadi */
}
.section_select option {
  font-weight: 600;
  font-size: 16px;
}

</style>