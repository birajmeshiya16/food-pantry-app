<template>
  <div class="container">
    <ForgotPasswordForm :showSuccess="showSuccess" :successMessage="successMessage"
    :showError="showError" :errorMessage="errorMessage"
    @clicked="onFormSubmit"
    />

  </div>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'

export default {
  name: 'ForgotPassword',
  components: {
    ForgotPasswordForm
  },
  data() {
    return {
      showSuccess: false,
      successMessage: "",
      errorMessage: "",
      showError: false,
    }
  },
  methods: {
    onFormSubmit(email) {
    const auth = getAuth()
    sendPasswordResetEmail(auth, email).then(() => {
          this.showError = false;
          this.showSuccess = true;
          this.successMessage = 'Email sent with a link to reset your password.  Please check you spam folder if you do not see it in a few minutes.';
       }).catch(() => {
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = 'An error occurred.  Check you entered the correct email for your account.';
       });
    }
  }
}
</script>

<style></style>
