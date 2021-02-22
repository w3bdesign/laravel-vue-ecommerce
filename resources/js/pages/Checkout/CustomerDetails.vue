<template>
  <div class="p-4 flex-container">
    <section class="text-gray-700">
      <div class="mx-auto md:w-2/3 lg:w-1/2">
        <form @submit.prevent="onSubmit">
          <div class="flex flex-wrap">
            <div class="p-2 lg:w-1/2">
              <input
                name="firstName"
                class="text-input"
                placeholder="First name"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.firstName }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                name="lastName"
                class="text-input"
                placeholder="Last name"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.lastName }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                name="address"
                class="text-input"
                placeholder="Address"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.address }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                name="zipcode"
                class="text-input"
                placeholder="Zip code"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.zipcode }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                name="city"
                class="text-input"
                placeholder="City"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.city }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                v-model="state"
                name="state"
                class="text-input"
                placeholder="State"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.state }}</span>
            </div>
            <div class="p-2 lg:w-1/2">
              <input
                v-model="email"
                name="email"
                class="text-input"
                placeholder="Email"
                type="text"
              >
              <span class="text-lg text-red-500">{{ errors.email }}</span>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
          >
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import {
  defineComponent, // onMounted, reactive, computed, toRefs,
} from 'vue';

import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';

export default defineComponent({
  setup() {
    const schema = object({
      firstName: string().required().min(2),
      lastName: string().required().min(2),
      address: string().required().min(3),
      city: string().required().min(2),
      state: string().required(),
      zipcode: string().required().min(4),
      email: string().required().email(),
    });

    // Create a form context with the validation schema
    const { errors, handleSubmit } = useForm({
      validationSchema: schema,
    });

    // const submitForm = () => { console.log('Submitted!'); };
    const onSubmit = handleSubmit((values) => {
      alert(JSON.stringify(values, null, 2));
    });

    const { value: firstName } = useField('firstName');
    const { value: lastName } = useField('lastName');
    const { value: address } = useField('address');
    const { value: city } = useField('city');
    const { value: state } = useField('state');
    const { value: zipcode } = useField('state');
    const { value: email } = useField('email');

    return {
      firstName,
      lastName,
      address,
      city,
      state,
      zipcode,
      email,
      errors,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.text-input {
    @apply w-full p-2 text-gray-800 placeholder-gray-800 border border-gray-400 rounded shadow-md;
}

.submitButton {
    @apply p-2 mt-4 mb-4 text-lg font-bold text-white bg-blue-500 rounded hover:bg-blue-700;
}
</style>
