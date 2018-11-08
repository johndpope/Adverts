<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" validation>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                :rules="[v => !!v]"
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                v-model="password"
                :counter="6"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :rules="[v => !!v]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="onSubmit"
              :disabled="!valid"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    validations: {
      password: {required, minLength: minLength(6), maxLength: maxLength(16)},
      email: { required, email }
    },
    data () {
      return {
        email: '',
        password: '',
        valid: false
      }
    },
    methods: {
      onSubmit () {
        const user = {}
        if (this.$refs.form.validate()) {
          user.email = this.email
          user.password = this.password
        }
        console.log(user)
      }
    },
    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Name must be more then 6 characters long')
        !this.$v.password.maxLength && errors.push('Name must be less then 16 characters long')
        !this.$v.password.required && errors.push('Name is required.')
        return errors
      }
    }
  }
</script>
