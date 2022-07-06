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
                  validation="required|alpha|length:3"
                  validation-visibility="live"
                  placeholder="First name"
                />
              </div>
              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="lastName"
                  label="Last name"
                  v-model="formData.lastName"
                  validation="required|alpha|length:2"
                  validation-visibility="live"
                  placeholder="Last name"
                />
              </div>
              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="address"
                  label="Address"
                  v-model="formData.address"
                  validation="required|alphanumerical|length:5"
                  validation-visibility="live"
                  placeholder="Address"
                />
              </div>

              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="zipcode"
                  label="Zip code"
                  v-model="formData.zipcode"
                  validation="required|number|length:4"
                  validation-visibility="live"
                  placeholder="Zip code"
                />
              </div>

              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="city"
                  label="City"
                  v-model="formData.city"
                  validation="required|alpha|length:3"
                  validation-visibility="live"
                  placeholder="City"
                />
              </div>

              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="state"
                  label="State"
                  v-model="formData.state"
                  validation="required|alpha|length:2"
                  validation-visibility="live"
                  placeholder="State"
                />
              </div>
              <div class="p-2 lg:w-1/2">
                <form-kit
                  type="text"
                  name="email"
                  label="Email"
                  v-model="formData.email"
                  validation="required|email|length:5"
                  validation-visibility="live"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="flex justify-center w-full align-center">
              <form-kit
                type="submit"
                label="Save details"
                input-class="px-6 py-2 font-semibold text-white rounded-md  hover:opacity-90 transition-all duration-500 ease-in-out focus:outline-none  bg-blue-600"
              />
            </div>
          </div>
        </section>
      </form-kit>
    </div>
  </section>
</template>

<script setup>
import { reactive } from "vue";

import { useCart } from "../../store/useCart";

const store = useCart();

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
  store.saveCustomerDetails(formData);
};
</script>

<style scoped>
.formkit-messages {
  color: red !important;
}
</style>
