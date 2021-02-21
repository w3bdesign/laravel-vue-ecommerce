<template>
  <div class="p-6 flex-container">
    <section class="text-gray-700">
      <div class="mx-auto lg:w-1/2 md:w-2/3">
        <div class="flex flex-wrap -m-2">
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="firstName"
              class="text-input"
              label="First name"
              :validation="[['required'], ['min', 3]]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="lastName"
              class="text-input"
              label="Last name"
              :validation="[['required'], ['min', 3]]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="address1"
              class="text-input"
              label="Address"
              :validation="[['required'], ['min', 3]]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="postcode"
              class="text-input"
              label="Postal code"
              :validation="[['required'], ['number']]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="city"
              class="text-input"
              label="City"
              :validation="[['required'], ['min', 2]]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="email"
              class="text-input"
              label="Email"
              :validation="[['required'], ['email']]"
              type="text"
            >
          </div>
          <div class="w-full p-2 lg:w-1/2">
            <input
              name="phone"
              class="text-input"
              label="Phone"
              :validation="[['required'], ['number']]"
              type="text"
            >
          </div>
          <div class="w-1/2 p-2">
            <input
              name="paymentMethod"
              class="invisible"
              value="cod"
              type="hidden"
            >
          </div>
        </div>
        <button class="submitButton">
          Submit button comes here
        </button>
        <input
          v-model="email"
          name="email"
        >
        <span>{{ emailError }}</span>

        <input
          v-model="password"
          name="password"
          type="password"
        >
        <span>{{ passwordError }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent, // onMounted, reactive, computed, toRefs,
} from 'vue';

import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

export default defineComponent({
  setup() {
    const schema = yup.object({
      email: yup.string().required().email(),
      name: yup.string().required(),
      password: yup.string().required().min(8),
    });

    // Create a form context with the validation schema
    useForm({
      validationSchema: schema,
    });

    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    return {
      email,
      emailError,
      password,
      passwordError,
    };
  },
});
</script>

<style scoped>
.text-input {
  @apply p-2 text-gray-800 placeholder-gray-800 border border-gray-400 rounded shadow-md;
}

.submitButton {
  @apply p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700;
}
</style>
