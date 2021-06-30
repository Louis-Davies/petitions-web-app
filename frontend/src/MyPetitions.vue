<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>
        <b-container>
            <b-row>
                <b-col><h1> My Petitions</h1></b-col>
            </b-row>
        </b-container>
        <div id="search">
            <b-form inline @submit.stop.prevent="getPetitions">
                <b-container>
                    <b-row>
                        <b-col>
                            <h2>Search: </h2>
                        </b-col>
                        <b-col>
                            <b-form-input
                                    id="param-1"
                                    v-model="searchQuery"
                                    placeholder="Search...">
                            </b-form-input>
                        </b-col>
                        <b-col>
                            <b-form-select
                                    v-model="categoryId"
                                    :options="categories">
                            </b-form-select>
                        </b-col>
                        <b-col>
                            <b-form-select
                                    v-model="sortType"
                                    :options="sortTypes">
                            </b-form-select>
                        </b-col>
                        <b-col>
                            <b-button type="submit" variant="primary">Submit</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
        </div>
        <b-row>
            <b-col>
                <b-pagination
                        v-model="currentPage"
                        :total-rows="totalPetitions"
                        :per-page="noPerPage"
                        first-number
                        last-number
                        align="center"></b-pagination>
            </b-col>
        </b-row>
        <div>
            <div v-for="petition in petitions.slice((currentPage-1)*noPerPage, currentPage*noPerPage)">
                <b-card class="petition"
                        style="margin: 1em"
                        :title="petition.title"
                        @click="goToPetition(petition.petitionId)"
                        :img-src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo'"
                        img-left
                        img-height="200px">
                    <b-container>
                        <b-row>
                            <b-col align="left"><b>Category:</b></b-col>
                            <b-col align="right"><p>{{ petition.category }}</p></b-col>
                        </b-row>
                        <b-row>
                            <b-col align="left"><b>Author Name:</b></b-col>
                            <b-col align="right"><p>{{ petition.authorName }}</p></b-col>
                        </b-row>
                        <b-row>
                            <b-col align="left"><b>No. of Signatures:</b></b-col>
                            <b-col align="right"><b>{{ petition.signatureCount }}</b></b-col>
                        </b-row>
                    </b-container>
                </b-card>
            </div>
            <b-row>
                <b-col>
                    <b-pagination
                            v-model="currentPage"
                            :total-rows="totalPetitions"
                            :per-page="noPerPage"
                            first-number
                            last-number
                            align="center"></b-pagination>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Petitions',
    data() {
      return {
        error: '',
        errorFlag: false,
        petitions: [],
        categories: [
          {value: null, text: 'Filter by a category'}
        ],
        sortTypes: [
          { value: null, text: 'Sort by...' },
          { value: 'ALPHABETICAL_ASC', text: 'Title alphabetical' },
          { value: 'ALPHABETICAL_DESC', text: 'Title alphabetical reverse' },
          { value: 'SIGNATURES_ASC', text: 'Signatures least' },
          { value: 'SIGNATURES_DESC', text: 'Signatures most' }
        ],
        categoryId: null,
        sortType: null,
        searchQuery: '',
        noPerPage: 10,
        currentPage: 1,
        totalPetitions: 0
      };
    },
    mounted: function() {
      this.checkLogin();
      this.getPetitions();
      this.getCategories();
    },
    methods: {
      checkLogin: function() {
        if (!this.$cookies.get('Token')) {
          this.$router.push('/');
        }
      },
      getPetitions: function() {
        let params = {
          'authorId': this.$cookies.get('UserId')
        };
        if (this.searchQuery) {
          params['q'] = this.searchQuery;
        }
        if (this.categoryId) {
          params['categoryId'] = this.categoryId;
        }
        if (this.sortType) {
          params['sortBy'] = this.sortType;
        }
        this.axios.get('http://localhost:4941/api/v1/petitions', {
          params: params
        }).then((response) => {
          this.petitions = response.data;
          this.totalPetitions = this.petitions.length;
        }).catch((error) => {
          this.error = error;
          this.errorFlag = true;
        });
      },
      getCategories: function() {
        this.axios.get('http://localhost:4941/api/v1/petitions/categories').then((response) => {
          this.buildCategories(response.data);
        }).catch((error) => {
          this.error = error;
          this.errorFlag = true;
        });
      },
      buildCategories: function(categoriesData) {
        for (let i = 0; i < categoriesData.length; i++) {
          this.categories.push({
            value: categoriesData[i].categoryId,
            text: categoriesData[i].name
          });
        }
      },
      goToPetition: function(petitionId) {
        this.$router.push('/petitions/' + petitionId);
      }
    }
  };
</script>

<style scoped>
    .petition:hover {
        cursor: pointer;
    }
</style>
