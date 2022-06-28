<template>
   
    <section>
    <form-kit
        type="form"
        v-model="formData"
        :form-class="submitted ? 'hide' : 'show'"
        submit-label="Register"
        @submit="submitHandler"
    >
        <form-kit
            type="text"
            name="name"
            label="Your name"
            placeholder="Jane Doe"
            help="What do people call you?"
            validation="required"
        />
    </form-kit>
    </section>
</template>

<script setup>
import { reactive } from "vue";

const formData = reactive({});

const submitHandler = () => {
    alert("Submitted!");
    console.log("Form data: ", formData);
};
</script>
