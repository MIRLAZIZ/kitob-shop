<template>
    <div>
        <label for="locale-select" class="me-1">
                <img src="~assets/contact/solar_global-bold.png" alt=""
              /></label>
              <select
                id="locale-select"
                v-model="$i18n.locale"
                @change="changeLanuage"
              >
                <option value="uz">O'zbek</option>
                <option value="ru">
                  Ruscha
                </option>
              </select>

    </div>
</template>

<script setup>
const changeLanuage = (e) => {
  localStorage.setItem("language", e.target.value);
};

</script>

<style lang="scss" scoped>

</style>