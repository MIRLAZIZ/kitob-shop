import { defineStore } from "pinia";
import { toast } from "vue3-toastify";




export const useNotification = defineStore("notification", {
    state: () => ({
    }),

    actions: {
        succesToast(data) {
            toast.success(data, {

                autoClose: 3000

            })

        },

        errorToast(data) {
            toast.error(data, {
                autoClose: 3000

            })
        },

        errorData(data) {
            let dataObject = Object.keys(data)

            dataObject.forEach(item => {
                data[item].forEach(elemet => {
                    this.errorToast(elemet)

                })
            })
        }
    }
})