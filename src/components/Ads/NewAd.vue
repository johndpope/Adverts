<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" class="mb-3" validation>
          <v-text-field
            name="title"
            label="Title"
            type="text"
            v-model="title"
            :error-messages="titleErrors"
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
            :rules="[v => !!v]"
          ></v-text-field>
          <v-textarea
              name="description"
              label="Description"
              type="text"
              v-model="description"
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
              :rules="[v => !!v]"
            ></v-textarea>
        </v-form>
        <v-layout row>
          <v-flex xs12>
            <v-btn
              color="warning"
              class="mb-3"
            >
            Upload
            <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src="" alt="" height="100px">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              label="Add image to promo?"
              v-model="promo"
              color="primary"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              class="success"
              @click="createAd"
            >Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { required } from 'vuelidate/lib/validators'

  export default {
    validations: {
      title: { required },
      description: { required }
    },
    data () {
      return {
        title: '',
        description: '',
        promo: false,
        valid: false
      }
    },
    methods: {
      createAd () {
        const ad = {}
        if (this.$refs.form.validate()) {
          ad.title = this.title
          ad.description = this.description
          ad.promo = this.promo
        }
        console.log(ad)
      }
    },
    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title is required')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.required && errors.push('Description is required')
        return errors
      }
    }
  }
</script>
