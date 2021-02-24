<template>
  <div class="p-4 flex-container">
    <section>
      <div
        v-if="customerDetails.firstName"
      >
        <h3 class="h-10 p-4 text-xl font-bold text-center">
          Saved details
        </h3>
        <div class="mx-auto mt-2 md:w-2/3 lg:w-1/2">
          <div class="flex flex-wrap">
            <div class="p-2 lg:w-1/2">
              First name:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.firstName }}
            </div>
            <div class="p-2 lg:w-1/2">
              Last name:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.lastName }}
            </div>
            <div class="p-2 lg:w-1/2">
              Address:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.address }}
            </div>
            <div class="p-2 lg:w-1/2">
              Zip:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.zipcode }}
            </div>
            <div class="p-2 lg:w-1/2">
              State:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.state }}
            </div>
            <div class="p-2 lg:w-1/2">
              Email:
            </div>
            <div class="p-2 lg:w-1/2">
              {{ customerDetails.email }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-64 mx-auto lg:w-1/2">
        <h3
          v-if="customerDetails.firstName"
          class="h-10 p-4 text-xl font-bold text-center"
        >
          Modify details
          <br>
        </h3>
        <div class="flex flex-wrap mt-2">
          <div class="p-2 lg:w-1/2">
            <label for="firstName">First name</label>
            <input
              id="firstName"
              v-model="firstName"
              name="firstName"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.firstName
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="lastName">Last name</label>
            <input
              id="lastName"
              v-model="lastName"
              name="lastName"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.lastName
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="address">Address</label>
            <input
              id="address"
              v-model="address"
              name="address"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.address
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="zipcode">Zip code</label>
            <input
              id="zipcode"
              v-model="zipcode"
              name="zipcode"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.zipcode
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="city">City</label>
            <input
              id="city"
              v-model="city"
              name="city"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.city
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="state">State</label>
            <input
              id="state"
              v-model="state"
              name="state"
              class="text-input"
              type="text"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.state
            }}</span>
          </div>
          <div class="p-2 lg:w-1/2">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              class="text-input"
              type="email"
              @input="onSubmit"
            >
            <span class="text-lg text-red-500">{{
              errors.email
            }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';

import { useStore } from 'vuex';
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';

export default defineComponent({
  setup() {
    const store = useStore();

    const schema = object({
      firstName: string().required(),
      lastName: string().required(),
      address: string().required(),
      city: string().required(),
      state: string().required(),
      zipcode: string().required(),
      email: string().required().email(),
    });

    // Create a form context with the validation schema
    const { meta, errors, handleSubmit } = useForm({
      validationSchema: schema,
    });

    const onSubmit = handleSubmit((values, { resetForm }) => {
      store.dispatch('saveCustomerDetails', values);
      if (meta.value.valid) {
        store.dispatch('setCheckoutFormToValid', true);
        resetForm();
      }
    });

    const { value: firstName } = useField('firstName');
    const { value: lastName } = useField('lastName');
    const { value: address } = useField('address');
    const { value: city } = useField('city');
    const { value: state } = useField('state');
    const { value: zipcode } = useField('zipcode');
    const { value: email } = useField('email');

    const customerDetails = computed(() => store.getters.customerDetails);

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
      customerDetails,
      meta,
    };
  },
});
</script>

<style scoped>
.text-input {
  @apply w-full p-2 text-gray-800 placeholder-gray-800 border border-gray-400 rounded shadow-md;
}

.submitButton {
  @apply p-2 mt-4 mx-auto mb-4 text-lg font-bold text-white bg-blue-500;
  @apply rounded hover:bg-blue-700 cursor-pointer;
}
</style>
