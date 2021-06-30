<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <b-row>
                        <b-col align-self="start">
                            <img src="./assets/365-petition-logo.png" height="100px" align="left">
                        </b-col>
                    </b-row>
                    <b-row>
                    </b-row>
                </b-col>
                <b-col>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.login-collapse>Existing user: Login</b-button>
                        </b-card-header>
                        <b-collapse id="login-collapse" visible>
                            <b-card-body>
                                <b-row>
                                    <b-col>
                                        <b-form @submit.stop.prevent="login(loginForm.email, loginForm.password)">
                                            <b-container>
                                                <b-row align-v="center">
                                                    <b-col align="left" cols="3">
                                                        <label>Email:</label>
                                                    </b-col>
                                                    <b-col cols="9">
                                                        <b-form-input
                                                                id="login-email-input"
                                                                name="login-email-input"
                                                                v-model="$v.loginForm.email.$model"
                                                                :state="validateLoginState('email')"
                                                                placeholder="Enter your email"
                                                        ></b-form-input>
                                                        <b-form-invalid-feedback>Required, Must be a valid email</b-form-invalid-feedback>
                                                    </b-col>
                                                </b-row>
                                                <b-row align-v="center">
                                                    <b-col align="left" cols="3">
                                                        <label>Password:</label>
                                                    </b-col>
                                                    <b-col cols="9">
                                                        <b-form-input
                                                                id="login-password-input"
                                                                name="login-password-input"
                                                                type="password"
                                                                v-model="$v.loginForm.password.$model"
                                                                :state="validateLoginState('password')"
                                                                placeholder="Enter your password"
                                                        ></b-form-input>
                                                        <b-form-invalid-feedback>Required</b-form-invalid-feedback>
                                                    </b-col>
                                                </b-row>
                                                <b-row>
                                                    <b-col align="right">
                                                        <b-button type="submit" variant="primary">Login</b-button>
                                                    </b-col>
                                                </b-row>
                                            </b-container>
                                        </b-form>
                                    </b-col>
                                </b-row>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body class="mb-1">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <b-button block v-b-toggle.register-collapse>New user: Register</b-button>
                        </b-card-header>
                        <b-collapse id="register-collapse">
                            <b-card-body>
                                <b-form @submit.stop.prevent="register()" @reset.stop.prevent="resetForm()">
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
                                                    <b-form-invalid-feedback>Required
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
                                                    <b-form-invalid-feedback>Required
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
                                                <b-form-group id="password-group" label="Password:"
                                                              label-for="password-input">
                                                    <b-form-input
                                                            id="password-input"
                                                            name="password-input"
                                                            type="password"
                                                            v-model="$v.form.password.$model"
                                                            :state="validateState('password')"
                                                            placeholder="Enter password"
                                                    ></b-form-input>
                                                    <b-form-invalid-feedback>Required, Password must be at least 8
                                                        alphanumeric
                                                        characters and
                                                        contain a letter (upper and lower) and a number
                                                    </b-form-invalid-feedback>
                                                </b-form-group>
                                            </b-col>
                                            <b-col>
                                                <b-form-group id="passwordRepeat-group" label="Repeat Password:"
                                                              label-for="passwordRepeat-input">
                                                    <b-form-input
                                                            id="passwordRepeat-input"
                                                            name="passwordRepeat-input"
                                                            type="password"
                                                            v-model="$v.form.passwordRepeat.$model"
                                                            :state="validateState('passwordRepeat')"
                                                            placeholder="Repeat password"
                                                    ></b-form-input>
                                                    <b-form-invalid-feedback>Required, Passwords must match
                                                    </b-form-invalid-feedback>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <b-form-group id="country-group" label="Country (optional):"
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
                                                <b-form-group id="city-group" label="City (optional):"
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
                                                <b-form-group id="image-group"
                                                              label="Upload profile picture (optional):"
                                                              label-for="image-input">
                                                    <b-form-file
                                                            id="image-input"
                                                            name="image-input"
                                                            v-model="$v.form.image.$model"
                                                            :state="validateState('image')"
                                                            placeholder="Choose a file or drop it here..."
                                                            drop-placeholder="Drop file here..."
                                                            accept="image/jpeg, image/png, image/gif"
                                                    ></b-form-file>
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
                                </b-form>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </b-col>
            </b-row>
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
    name: 'Home',
    data() {
      return {
        form: {
          email: null,
          firstName: null,
          surname: null,
          city: null,
          country: null,
          password: null,
          passwordRepeat: null,
          image: null,
        },
        loginForm: {
          email: null,
          password: null,
        },
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
        password: {
          required,
          passwordValidate,
        },
        passwordRepeat: {
          required,
          sameAsPassword: sameAs('password'),
        },
        image: {},
      },
      loginForm: {
        email: {
          required,
          email,
        },
        password: {
          required,
        },
      },
    },
    mounted: function() {
      this.checkLoginState();
    },
    methods: {
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      validateLoginState(name) {
        const {$dirty, $error} = this.$v.loginForm[name];
        return $dirty ? !$error : null;
      },
      checkLoginState: function() {
        if (this.$cookies.get('Token')) {
          this.$router.push('/petitions');
        }
      },
      register: function() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        let data = this.produceData();
        this.axios.post('http://localhost:4941/api/v1/users/register', data).then((response) => {
          this.login(this.form.email, this.form.password, true);
        }).catch(err => {
          alert(err.response.statusText);
        });
      },
      login: function(email, password, reg = false) {
        if (!reg) {
          this.$v.loginForm.$touch();
          if (this.$v.loginForm.$anyError) {
            return;
          }
        }
        let data = {
          'email': email,
          'password': password,
        };
        this.axios.post('http://localhost:4941/api/v1/users/login', data).then((response) => {
          this.$cookies.set('Token', response.data.token, '7d');
          this.$cookies.set('UserId', response.data.userId, '7d');
          if (reg) {
            if (this.form.image != null) {
              let headers = {
                'Content-Type': this.form.image.type,
                'X-Authorization': this.$cookies.get('Token'),
              };
              let url = 'http://localhost:4941/api/v1/users/' + response.data.userId + '/photo';
              this.axios.put(url, this.form.image, {headers: headers}).then((response2) => {
                this.$eventBus.$emit('login', 'true');
                this.$router.push('/petitions');
              }).catch((err2) => {
                alert(err2.response.statusText);
              });
            } else {
              this.$eventBus.$emit('login', 'true');
              this.$router.push('/petitions');
            }
          } else {
            this.$eventBus.$emit('login', 'true');
            this.$router.push('/petitions');
          }
        }).catch((err) => {
          alert(err.response.statusText);
        });
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
      produceData: function() {
        let name = this.form.firstName + ' ' + this.form.surname;
        let result = {
          'name': name,
          'email': this.form.email,
          'password': this.form.password,
        };
        if (this.form.city) {
          result['city'] = this.form.city;
        }
        if (this.form.country) {
          result['country'] = this.form.country;
        }
        return result;
      },
    },
  };
</script>

<style scoped>

</style>
