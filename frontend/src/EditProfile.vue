<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <b-avatar :src="'http://localhost:4941/api/v1/users/'+$cookies.get('UserId')+'/photo'"
                              :text="profile.initials"
                              size="200px">
                    </b-avatar>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <h1>Enter New Profile Details</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form @submit.stop.prevent="updateProfile" @reset.stop.prevent="resetForm">
                        <b-container>
                            <b-row>
                                <b-col>
                                    <b-form-group id="firstName-group" label="First Name:"
                                                  label-for="firstName-input">
                                        <b-form-input
                                                id="firstName-input"
                                                name="firstName-input"
                                                v-model="$v.form.firstName.$model"
                                                :state="validateState('firstName')"
                                                placeholder="Enter first name"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>Required, Invalid name
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="surname-group" label="Surname:"
                                                  label-for="surname-input">
                                        <b-form-input
                                                id="surname-input"
                                                name="surname-input"
                                                v-model="$v.form.surname.$model"
                                                :state="validateState('surname')"
                                                placeholder="Enter surname"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>Required, Invalid name
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group id="email-group" label="Email address:"
                                                  label-for="email-input">
                                        <b-form-input
                                                id="email-input"
                                                name="email-input"
                                                v-model="$v.form.email.$model"
                                                type="email"
                                                :state="validateState('email')"
                                                placeholder="Enter email"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>Required, Must submit a valid email
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group id="currentPassword-group" label="Current Password:"
                                                  label-for="currentPassword-input">
                                        <b-form-input
                                                id="currentPassword-input"
                                                name="currentPassword-input"
                                                type="password"
                                                v-model="$v.form.currentPassword.$model"
                                                :state="validateState('currentPassword')"
                                                placeholder="Enter current password"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>Current password required to change password
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="newPassword-group" label="New Password:"
                                                  label-for="newPassword-input">
                                        <b-form-input
                                                id="newPassowrd-input"
                                                name="newPassword-input"
                                                type="password"
                                                v-model="$v.form.newPassword.$model"
                                                :state="validateState('newPassword')"
                                                placeholder="New password"
                                        ></b-form-input>
                                        <b-form-invalid-feedback>Password must be at least 8
                                            alphanumeric
                                            characters and
                                            contain a letter (upper and lower) and a number
                                        </b-form-invalid-feedback>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group id="country-group" label="Country:"
                                                  label-for="country-input">
                                        <b-form-input
                                                id="country-input"
                                                name="country-input"
                                                v-model="$v.form.country.$model"
                                                placeholder="Enter country (optional)"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group id="city-group" label="City:"
                                                  label-for="city-input">
                                        <b-form-input
                                                id="city-input"
                                                name="country-input"
                                                v-model="$v.form.city.$model"
                                                placeholder="Enter city (optional)"
                                        ></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-button type="reset" variant="danger">Reset</b-button>
                                </b-col>
                                <b-col>
                                    <b-button type="submit" variant="primary">Submit</b-button>
                                </b-col>
                            </b-row>
                        </b-container>
                    </b-form >
                    <b-form @submit.stop.prevent="updateImage" @reset.stop.prevent="removeImage">
                        <b-row>
                            <b-col>
                                <b-form-group id="image-group"
                                              label="Upload profile picture (optional):"
                                              label-for="image-input">
                                    <b-form-file
                                            id="image-input"
                                            name="image-input"
                                            v-model="imageForm.image"
                                            placeholder="Choose a file or drop it here..."
                                            drop-placeholder="Drop file here..."
                                            accept="image/jpeg, image/png, image/gif"
                                    ></b-form-file>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-button type="reset" variant="danger">Remove Image</b-button>
                            </b-col>
                            <b-col>
                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-col>
            </b-row>
            <br>
        </b-container>
    </div>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {required, email, helpers, sameAs} from 'vuelidate/lib/validators';

  const passwordValidate = helpers.regex('passwordValidate',
      new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$'));
  const nameValidate = helpers.regex('nameValidate', /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/);

  export default {
    mixins: [validationMixin],
    name: 'EditProfile',
    data() {
      return {
        profile: {},
        form: {
          email: null,
          firstName: null,
          surname: null,
          city: null,
          country: null,
          currentPassword: null,
          newPassword: null,
        },
        imageForm: {
          image: null,
        }
      };
    },
    validations: {
      form: {
        email: {
          required,
          email,
        },
        firstName: {
          required,
          nameValidate,
        },
        surname: {
          required,
          nameValidate,
        },
        city: {},
        country: {},
        currentPassword: {
        },
        newPassword: {
          passwordValidate
        },
      },
    },
    mounted: function() {
      this.checkLoginState();
      this.getProfile();
    },
    methods: {
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      checkLoginState: function() {
        if (!this.$cookies.get('Token')) {
          this.$router.push('/petitions');
        }
      },
      getProfile: function() {
        let userId = this.$cookies.get('UserId');
        let token = this.$cookies.get('Token');
        if (userId && token) {
          let headers = {
            'X-Authorization': token
          };
          this.axios.get('http://localhost:4941/api/v1/users/'+userId, {headers: headers}).then((response) => {
            this.profile = response.data;
            let name = this.profile.name;
            this.profile.initials = name.substring(0, 1)+name.substring(name.indexOf(' ') + 1, name.indexOf(' ') + 2);
            this.fillForm();
          }).catch((err) => {
            alert(err.response.statusText);
          });
        } else {
          this.$router.push('/');
        }
      },
      fillForm: function() {
        this.form.email = this.profile.email;
        this.form.firstName = this.profile.name.substring(0, this.profile.name.indexOf(' '));
        this.form.surname = this.profile.name.substring(this.profile.name.indexOf(' ') + 1);
        this.form.city = this.profile.city;
        this.form.country = this.profile.country;
      },
      updateProfile: function() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        if (this.form.newPassword) {
          if (!this.form.currentPassword) {
            alert('Old password required to change password');
            return;
          }
        }
        let userId = this.$cookies.get('UserId');
        let data = this.produceData();
        let headers = {
          'X-Authorization': this.$cookies.get('Token'),
        };
        this.axios.patch('http://localhost:4941/api/v1/users/'+userId, data, {headers: headers}).then((response) => {
          this.$router.push('/MyProfile');
        }).catch(err => {
          alert(err.response.statusText);
        });
      },
      updateImage: function() {
        if (this.imageForm.image == null) {
          return;
        }
        if (this.imageForm.image) {
          let headers = {
            'Content-Type': this.form.image.type,
            'X-Authorization': this.$cookies.get('Token'),
          };
          let url = 'http://localhost:4941/api/v1/users/' + this.$cookies.get('UserId') + '/photo';
          this.axios.put(url, this.form.image, {headers: headers}).then((response) => {
            this.$router.push('/MyProfile');
          }).catch((err) => {
            alert(err.response.statusText);
          });
        }
      },
      resetForm: function() {
        this.form = {
          email: null,
          firstName: null,
          surname: null,
          city: null,
          country: null,
          password: null,
          passwordRepeat: null,
        };
      },
      removeImage: function() {
        let headers = {
          'X-Authorization': this.$cookies.get('Token'),
        };
        let url = 'http://localhost:4941/api/v1/users/' + this.$cookies.get('UserId') + '/photo';
        this.axios.delete(url, {headers: headers}).then((response) => {
          this.$router.push('/MyProfile');
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
      produceData: function() {
        let name = this.form.firstName + ' ' + this.form.surname;
        let result = {
          'name': name,
          'email': this.form.email,
        };
        if (this.form.city) {
          result['city'] = this.form.city;
        }
        if (this.form.country) {
          result['country'] = this.form.country;
        }
        if (this.form.newPassword) {
          result['currentPassword'] = this.form.currentPassword;
          result['password'] = this.form.newPassword;
        }
        return result;
      },
    },
  };
</script>

<style scoped>

</style>
