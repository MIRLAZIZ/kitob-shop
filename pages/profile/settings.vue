<template>
<div>
    <div class="wrapper ">
        <h1 class="wrapper_h1">{{ $t("home.profile.Profile settings") }}</h1>

        <!-- contaner  -->
        <div class=" bg- p-2">

            <div class=" p-4  rounded">

                <div class="d-flex  justify-content-between  align-items-center">
                    <h2 class="fs-6 font-600">{{ $t("home.profile.personal information") }}</h2>
                    <img v-show="content == null" src="/assets/profile/Vector.png" alt="">

                </div>

                <div class="d-flex ">

                    <div class="main_div me-4 mt-2">

                      

                        <div class="main_section "  :style="{padding: !form.image ? '20px' : 0}" >
                            <img src="/assets/profile/doira.png" alt=""   v-if="(!form.image)" />
                            <img v-else :src="'https://kytabshop.al-raqam.com/' + form.image" alt="" class="userImg" />
                        </div>

                        <div class="main_image mt-4 ">
                            <label for="myfile">Select a image</label>
                            <input type="file" @change="fileUplaod" style="display: none;" id="myfile">
                        </div>
                    </div>

                    <div class="">
                        <div>
                            <div :class="{'content' : content==1}" @click="content = 1" class="form">

                                <div class="d-flex">
                                    <div class="">
                                        <label for="email" class="form-label">{{ $t("home.profile.first name last name") }}</label>
                                        <input v-model="form.full_name" type="text" class="form-control form_input " id="full_name" placeholder="Enter name" name="full_name">

                                    </div>

                                    <div style="margin:0px 0px 0px 20px" class="mt-1">
                                        <label for="email" class="form-label">{{ $t("home.profile.Date of birth") }} </label>
                                        <input v-model="form.birth_date" type="date" class="form-control form_input" id="date" placeholder="Enter date" name="birth_date">
                                    </div>
                                </div>

                                <div class="d-flex">
                                    <div class="mt-1">
                                        <label for="text" class="form-label">{{ $t("home.profile.Phone number") }}</label>
                                        <input v-model="form.phone" type="text" class="form-control form_input " placeholder="Telefon raqam" name="phone">
                                    </div>
                                    <div style="margin:0px 0px 0px 20px" class="mt-1">
                                        <label for="text" class="form-label">{{$t("home.profile.sex")}}</label>

                                        <select v-model="form.gender" class="form-select form-control form_input" id="sel1" name="sellist1">
                                            <option>male</option>
                                            <option>female</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-1">
                                    <label for="text" class="form-label">Email</label>
                                    <input v-model="form.email" type="text" class="form-control" placeholder="email" name="email">
                                </div>
                                <div class="mt-1">
                                    <label for="text" class="form-label">{{ $t("home.profile.Address") }}</label>
                                    <input v-model="form.address" type="text" class="form-control" placeholder="Manzil" name="address">
                                </div>
                                <div v-show="content == 1" class="mt-3 button">
                                    <button>{{ $t("home.profile.Cancellation") }}</button>
                                    <button type="button" @click="send">{{ $t("home.profile.Save changes") }}</button>
                                </div>
                            </div>
                        </div>

                        <!-- password  -->
                        <div>
                            <div class="form_password">

                                <div class="form_password_flex">
                                    <h1>{{ $t("home.profile.change password") }}</h1>
                                    <img src="../../assets/profile/Vector.png" alt="">

                                </div>

                                <div :class="{'template' : template==1}" @click="template = 1" class=" d-flex" style="justify-content:space-around">

                                    <div class="mt-1">
                                        <label for="email" class="label">{{ $t("home.profile.Current password") }}</label>
                                        <input v-model="forms.old_password" type="text" class="form-control input " placeholder="Joriy parol" name="old_pasword">
                                    </div>

                                    <div class="mt-1 mx-2">
                                        <label for="email" class="label">{{ $t("home.profile.New Password") }}</label>
                                        <input v-model="forms.new_password" type="text" class="form-control input" placeholder="yangi parol" name="new_password">
                                    </div>

                                    <div class="mt-1">
                                        <label for="email" class="label">{{ $t("home.profile.New Password") }}</label>
                                        <input v-model="forms.confirm_new_password" type="text" class="form-control input " placeholder="yangi parol" name="confirm_password">
                                    </div>
                                </div>

                                <div v-show="template == 1" class="mt-3 button">
                                    <button>{{ $t("home.profile.Cancellation") }}</button>
                                    <button type="button" @click="Check">{{ $t("home.profile.Save changes") }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>
</template>

<script setup>
let form = ref({
    full_name: null,
    phone: null,
    email: "",
    address: "",
    image: null,
    birth_date: "",
    gender: "",
})
let forms = ref({
    old_password: null,
    new_password: null,
    confirm_new_password: null
})

const store = ProfileHistory()
const content = ref(null)
const template = ref(null)

const send = async () => {
    await store.Settings(form.value)
        .then((res) => {
            localStorage.setItem('userData', JSON.stringify(res.result))

            localStorage.setItem('token', res.result.token)
            localStorage.setItem('refreshToken', res.result.refresh_token)
            useNuxtApp().$toast.success(res.message, {
                autoClose: 2000,
                dangerouslyHTMLString: true,
            })

        })
        .catch(error => {
            useNuxtApp().$toast.error(error.response._data.message, {
                autoClose: 2000,
                dangerouslyHTMLString: true,
            });
        })
}
const Check = async () => {
    if (forms.value.new_password == forms.value.confirm_new_password) {
        await store.Password(forms.value);
    } else {}
}
const fileUplaod = async (e) => {
    const form = new FormData();
    form.append('image', e.target.files[0]);
    await store.Images(form)
}

onMounted(() => {
    store.Setting()
        .then(() => {
            // form.value.phone = store.settings.phone
            form.value = store.settings
        })
})
</script>

<style lang="scss" scoped>
.wrapper {

    background-color: #FAFAFA;
    padding: 16px;
    border-radius: 12px;
}

.wrapper_h1 {
    height: 44px;
    font-size: 20px;

    text-align: left;
    padding-top: 18px;
}

.main {
    border-radius: 10px;
    background-color: #ffffff;
    margin: 20px 30px 0px 30px;
    display: flex;
}

.main_div {
    align-items: center;
    justify-content: center;

}

.main_div h2 {
    margin: 18px 10px 20px 0px;
    width: 100%;
    height: 40px;

    font-family: Manrope;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: 0.02em;
    text-align: left;
    color: #010416;
    padding-top: 18px;
}

.main_image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;

}

.main_image label {

    background-color: rgb(92, 92, 226);
    color: white;
    padding: 3px;
    border-radius: 3px;
    align-items: center;
}

.main_section {
    width: 150px;
    height: 150px;
    border-radius: 7px;
    background-color: #f3f3f3;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin: 20px 30px 0px 20px;
}

.main_section img {
    width: 100%;
    height: 100%;
    border-radius: 7px;
}

.form-label {
    font-family: Manrope;
    font-size: 12px;
    text-align: left;
    color: #35363D;
}

.form_input {
    width: 100%;
    height: 34px;
    border-radius: 5px;
    background-color: #FFFFFF;
}

.button {
    display: flex;
    justify-content: flex-end;
}

.button button {
    margin: 0px 0px 0px 20px;
    background-color: #F6F6F6;
    border: none;
    border-radius: 5px;
    height: 34px;
    color: #35363D;
}

.button button:hover {
    background-color: #307CCE;
    color: #FFFFFF
}

.form_password {
    height: 180px;
    border-radius: 10px;
    background-color: #FFFFFF;
    margin: 20px 0px 0px 0px;
    padding: 16px;
}

.form_password h1 {
    // width: 150px;
    font-family: Manrope;
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #35363D;
}

.form_password_flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-family: Manrope;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    color: #35363D;
}

.input {
    // width: 234px;
    height: 34px;
    border-radius: 5px;
    background-color: #FFFFFF;
}

input::placeholder {
    font-size: 12px;
}


</style>
