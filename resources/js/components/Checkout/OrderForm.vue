<template>
    <section>
        <div class="container p-4 mx-auto mt-2 flex-container">
            <form-kit type="form" @submit="submitHandler" :actions="false">
                <section>
                    <div class="w-64 mx-auto lg:w-1/2">
                        <div class="flex flex-wrap mt-2">
                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="firstName"
                                    label="First name"
                                    v-model="formData.firstName"
                                    validation="required|alpha|length:2,30"
                                    validation-visibility="live"
                                    placeholder="First name"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>
                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="lastName"
                                    label="Last name"
                                    v-model="formData.lastName"
                                    validation="required|alpha|length:2,30"
                                    validation-visibility="live"
                                    placeholder="Last name"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>
                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="address"
                                    label="Address"
                                    v-model="formData.address"
                                    validation="required|alpha|length:5,30"
                                    validation-visibility="live"
                                    placeholder="Address"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>

                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="zipcode"
                                    label="Zip code"
                                    v-model="formData.zipcode"
                                    validation="required|number|length:4,8"
                                    validation-visibility="live"
                                    placeholder="Zip code"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>

                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="city"
                                    label="City"
                                    v-model="formData.city"
                                    validation="required|alpha|length:3,10"
                                    validation-visibility="live"
                                    placeholder="City"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>

                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="state"
                                    label="State"
                                    v-model="formData.state"
                                    validation="required|alpha|length:2,10"
                                    validation-visibility="live"
                                    placeholder="State"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>
                            <div class="p-2 lg:w-1/2">
                                <form-kit
                                    type="text"
                                    name="email"
                                    label="Email"
                                    v-model="formData.email"
                                    validation="required|email|length:5,30"
                                    validation-visibility="live"
                                    placeholder="Email"
                                    outer-class="mb-5"
                                    label-class="block mb-1 font-bold text-sm"
                                    inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                                    input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                                    help-class="text-xs text-gray-500"
                                />
                            </div>
                        </div>
                        <form-kit
                            type="submit"
                            label="Checkout"
                            input-class="px-6 py-2 font-semibold text-white rounded-md
      hover:opacity-90      
      transition-all
      duration-500
      ease-in-out      
      focus:outline-none 
      bg-blue-600"
                        />
                    </div>
                </section>
            </form-kit>
        </div>
        <div v-if="formSubmitted">
            <h2>Form Submission:</h2>
            <pre wrap>{{ formData }}</pre>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const formSubmitted = ref(false);

const formData = reactive({
    firstName: "",
    lastName: "",
    address: "",
    zipcode: "",
    city: "",
    state: "",
    email: "",
});

const submitHandler = () => {
    formSubmitted.value = true;
    alert("Submitted!");
    console.log("Form data: ", formData);
};
</script>
