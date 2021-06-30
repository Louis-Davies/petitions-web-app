<template>
    <div>
        <b-row>
            <b-col>
                <h2>Change petition details:</h2>
            </b-col>
        </b-row>
        <b-form @submit.stop.prevent="editPetition" @reset.stop.prevent="resetForm">
            <b-container>
                <b-row>
                    <b-col>
                        <b-form-group id="title-group" label-align="left" label="Title:" label-for="title-input">
                            <b-form-input
                                    id="title-input"
                                    name="title-input"
                                    v-model="$v.form.title.$model"
                                    :state="validateState('title')"
                                    placeholder="Enter title"
                            ></b-form-input>
                            <b-form-invalid-feedback>Required, enter a title</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Category:" label-align="left" label-for="category-input">
                            <b-form-select id="category-input"
                                           :options="categories"
                                           v-model="$v.form.category.$model"
                                           :state="validateState('category')">
                            </b-form-select>
                            <b-form-invalid-feedback>Required, select a category</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Description:" label-align="left" label-for="description-input">
                            <b-form-textarea
                                    id="description-input"
                                    v-model="$v.form.description.$model"
                                    :state="validateState('description')"
                                    placeholder="Enter a description..."
                                    rows="6"
                                    max-rows="12"
                            ></b-form-textarea>
                            <b-form-invalid-feedback>Required, min length 30 characters max length 5000 characters
                            </b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Closing Date: (optional)"
                                      label-for="date-input"
                                      label-align="left">
                            <b-form-datepicker id="date-input"
                                               name="date-input"
                                               v-model="$v.form.closingDate.$model"
                                               :state="validateState('closingDate')"
                                               :min="min"
                                               placeholder="Select a closing date (optional)">
                            </b-form-datepicker>
                            <b-form-invalid-feedback>Date must be in future</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-button type="reset" variant="danger">Reset</b-button>
                    </b-col>
                    <b-col>
                        <b-button type="submit" variant="primary">Save</b-button>
                    </b-col>
                </b-row>
                <br>
            </b-container>
        </b-form>
        <b-form @submit.stop.prevent="changeImage" @reset.stop.prevent="resetImage">
            <b-row>
                <b-col>
                    <h2>Change petition image:</h2>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group id="image-group"
                                  label="Upload hero image:"
                                  label-for="image-input"
                                  label-align="left">
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
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-col>
                <b-col>
                    <b-button type="submit" variant="primary">Save</b-button>
                </b-col>
            </b-row>
            <br>
        </b-form>
    </div>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {required, minLength, maxLength} from 'vuelidate/lib/validators';

  export default {
    mixins: [validationMixin],
    name: 'EditPetition',
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const minDate = new Date(today);
      minDate.setTime(minDate.getTime() + 86400000);
      return {
        min: minDate,
        form: {
          title: null,
          category: {value: null, text: 'Select a category'},
          description: null,
          closingDate: null,
        },
        imageForm: {
          image: null,
        },
        categories: [
          {value: null, text: 'Select a category'},
        ],
      };
    },
    validations: {
      form: {
        title: {
          required,
        },
        category: {
          required,
        },
        description: {
          required,
          minLength: minLength(30),
          maxLength: maxLength(5000),
        },
        closingDate: {},
      },
    },
    mounted: function() {
      this.checkLogin();
      this.getPetition();
    },
    methods: {
      validateState(name) {
        const {$dirty, $error} = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      checkLogin: function() {
        if (!this.$cookies.get('Token')) {
          this.$router.push('/');
        }
      },
      getPetition: function() {
        let id = this.$route.params.petitionId;
        this.axios.get('http://localhost:4941/api/v1/petitions/' + id).then((response) => {
          if (this.$cookies.get('UserId') == response.data.authorId) {
            this.populateFields(response.data);
          } else {
            this.$router.push('/');
          }
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
      populateFields: function(data) {
        this.form.title = data.title;
        this.form.description = data.description;
        if (data.closingDate) {
          let date = new Date(data.closingDate);
          let today = new Date();
          if (date < today) {
            this.$router.push('/petitions/' + this.$route.params.petitionId);
          }
          this.form.closingDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().
              split('T')[0];
        }
        this.getCategories(data);
      },
      getCategories: function(petitionData) {
        this.axios.get('http://localhost:4941/api/v1/petitions/categories').then((response) => {
          this.buildCategories(response.data, petitionData);
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
      buildCategories: function(categoriesData, petitionData) {
        for (let i = 0; i < categoriesData.length; i++) {
          this.categories.push({
            value: categoriesData[i].categoryId,
            text: categoriesData[i].name,
          });
          if (petitionData.category == categoriesData[i].name) {
            this.form.category = categoriesData[i].categoryId;
          }
        }
      },
      resetForm: function() {
        this.form = {
          title: null,
          category: null,
          description: null,
          closingDate: null,
        };
      },
      resetImage: function() {
        this.imageForm = {
          image: null,
        };
      },
      changeImage: function() {
        if (this.imageForm.image == null) {
          return;
        }
        let petitionId = this.$route.params.petitionId;
        let token = this.$cookies.get('Token');
        let headers = {
          'Content-Type': this.imageForm.image.type,
          'X-Authorization': token,
        };
        this.axios.put('http://localhost:4941/api/v1/petitions/' + petitionId + '/photo', this.imageForm.image,
            {headers: headers}).then((response) => {
          this.$router.push('/petitions/' + petitionId);
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
      editPetition: function() {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        let data = {
          'title': this.form.title,
          'description': this.form.description,
          'categoryId': this.form.category,
        };
        if (this.form.closingDate) {
          data['closingDate'] = this.form.closingDate;
        }
        let token = this.$cookies.get('Token');
        let headers = {
          'X-Authorization': token,
        };
        let petitionId = this.$route.params.petitionId;
        this.axios.patch('http://localhost:4941/api/v1/petitions/' + petitionId, data, {headers: headers}).
            then((response) => {
              this.$router.push('/petitions/' + petitionId);
            }).
            catch((err) => {
              alert(err.response.statusText);
            });
      },
    },
  };
</script>

<style scoped>

</style>