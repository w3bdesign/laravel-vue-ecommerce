<template>
    <section>
        <form-kit type="form" @submit="submitHandler">
            <form-kit
                type="text"
                label="First name"
                v-model="formData.firstName"
                validation="required|alphanumeric"
                validation-visibility="live"
                placeholder="First name"
                outer-class="mb-5"
                label-class="block mb-1 font-bold text-sm"
                inner-class="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500"
                input-class="w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400"
                help-class="text-xs text-gray-500"
            />
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
        </form-kit>
        <div v-if="formSubmitted">
            <h2>Form Submission</h2>
            <pre wrap>{{ formData }}</pre>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive } from "vue";

const formSubmitted = ref(false);

const formData = reactive({ firstName: "" });

const submitHandler = () => {
    formSubmitted.value = true;
    alert("Submitted!");
    console.log("Form data: ", formData);
};
</script>
