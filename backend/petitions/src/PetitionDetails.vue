<template>
    <div id="petitionDetails">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
              integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous"/>
        <b-container>
            <b-row>
                <b-img :src="'http://localhost:4941/api/v1/petitions/' + petition.petitionId + '/photo'" height="200px"
                       center></b-img>
            </b-row>
            <br>
            <b-row>
                <b-col><h1>{{petition.title}}</h1></b-col>
            </b-row>
            <b-row>
                <b-col><h2>Share:</h2></b-col>
                <b-col v-for="network in socialNetworks" v-bind:key="network.network">
                    <ShareNetwork
                            :network="network.network"
                            :key="network.key"
                            :style="{backgroundColor: network.color}"
                            :url="'http://localhost:4941/api/v1/petitions/' + petition.petitionId"
                            :title="petition.title"
                            :description="petition.description"
                            quote="Petitions are good"
                            hashtags="changeisgood"
                            :twitterUser="petition.authorName"
                    >
                        <i :class="network.icon"></i>
                        <span>{{ network.name }}</span>
                    </ShareNetwork>
                </b-col>
            </b-row>
            <b-row v-if="isOwner">
                <b-col align-self="center" cols="2">
                    <b>Options:</b>
                </b-col>
                <b-col cols="5" align-self="center">
                    <b-button variant="danger" @click="deletePetition">Delete Petition</b-button>
                </b-col>
                <b-col cols="5" align-self="center">
                    <b-button variant="info" @click="goToEdit">Edit Petition</b-button>
                </b-col>
            </b-row>
            <b-card style="margin: 1em" title="About:" align="left">
                <b-row>
                    <b-col><b>Category:</b></b-col>
                    <b-col align="right"><p>{{petition.category}}</p></b-col>
                </b-row>
                <b-row>
                    <b-col><b>No. of Signatures:</b></b-col>
                    <b-col align="right"><p>{{petition.signatureCount}}</p></b-col>
                </b-row>
                <b-row>
                    <b-col><b>Description:</b></b-col>
                </b-row>
                <b-row>
                    <b-col><p>{{petition.description}}</p></b-col>
                </b-row>
                <b-row v-if="petition.createdDate">
                    <b-col><b>Created On:</b></b-col>
                    <b-col align="right"><p>{{petition.createdDate}}</p></b-col>
                </b-row>
                <b-row>
                    <b-col><b>Closing Date:</b></b-col>
                    <b-col v-if="petition.closingDate" align="right"><p>{{petition.closingDate}}</p>
                    </b-col>
                    <b-col v-else align="right"><p>No closing date set</p></b-col>
                </b-row>
            </b-card>
            <b-row v-if="!isOwner && isLoggedIn">
                <b-col>
                    <h2>Sign this petition:</h2>
                </b-col>
                <b-col>
                    <b-button @click="signPetition" :disabled="hasSigned" variant="primary">Sign Petition</b-button>
                </b-col>
                <b-col>
                    <b-button @click="deleteSignature" :disabled="!hasSigned" variant="danger">Remove Signature
                    </b-button>
                </b-col>
            </b-row>
            <b-row v-if="!isLoggedIn">
                <b-col>
                    <b-button variant="info" to="/">Login or Register to Sign this Petition</b-button>
                </b-col>
            </b-row>
            <b-card style="margin: 1em" title="Author:" align="left">
                <b-row>
                    <b-col cols="3">
                        <b-avatar
                                :src="'http://localhost:4941/api/v1/users/'+petition.authorId+'/photo'"
                                :text="petition.initials"
                                size="110px">
                        </b-avatar>
                    </b-col>
                    <b-col cols="9">
                        <b-row>
                            <b-col><b>Name:</b></b-col>
                            <b-col align="right"><p>{{petition.authorName}}</p></b-col>
                        </b-row>
                        <b-row v-if="petition.authorCity">
                            <b-col><b>City:</b></b-col>
                            <b-col align="right"><p>{{petition.authorCity}}</p></b-col>
                        </b-row>
                        <b-row v-if="petition.authorCountry">
                            <b-col><b>Country:</b></b-col>
                            <b-col align="right"><p>{{petition.authorCountry}}</p></b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card>
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.signatories variant="info">Signatories</b-button>
                </b-card-header>
                <b-collapse id="signatories">
                    <b-card-body>
                        <div v-for="signer in signatories">
                            <b-card style="margin: 1em" align="left">
                                <b-row>
                                    <b-col cols="3">
                                        <b-avatar
                                                :src="'http://localhost:4941/api/v1/users/'+signer.signatoryId+'/photo'"
                                                :text="signer.initials"
                                                size="100px">
                                        </b-avatar>
                                    </b-col>
                                    <b-col cols="9">
                                        <b-row>
                                            <b-col><b>Name:</b></b-col>
                                            <b-col align="right"><p>{{signer.name}}</p></b-col>
                                        </b-row>
                                        <b-row v-if="signer.city">
                                            <b-col><b>City:</b></b-col>
                                            <b-col align="right"><p>{{signer.city}}</p></b-col>
                                        </b-row>
                                        <b-row v-if="signer.country">
                                            <b-col><b>Country:</b></b-col>
                                            <b-col align="right"><p>{{signer.country}}</p></b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </div>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </b-container>
    </div>
</template>

<script>
  export default {
    name: 'PetitionDetails',
    data() {
      return {
        petition: {},
        signatories: [],
        hasSigned: false,
        socialNetworks: [
          {network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333'},
          {network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2'},
          {network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500'},
          {network: 'evernote', name: 'Evernote', icon: 'fab fah fa-lg fa-evernote', color: '#2dbe60'},
          {network: 'hackernews', name: 'HackerNews', icon: 'fab fah fa-lg fa-hacker-news', color: '#ff4000'},
        ],
        isOwner: false,
        isLoggedIn: false,
      };
    },
    mounted: function() {
      this.getPetition();
      this.getSignatories();
      this.getLogginStatus();
    },
    methods: {
      getLogginStatus: function() {
        if (this.$cookies.get('Token')) {
          this.isLoggedIn = true;
        }
      },
      signPetition: function() {
        if (this.$cookies.get('Token')) {
          let token = this.$cookies.get('Token');
          let petitionId = this.petition.petitionId;
          let headers = {
            'X-Authorization': token,
          };
          this.axios.post('http://localhost:4941/api/v1/petitions/' + petitionId + '/signatures', {},
              {headers: headers}).then((response) => {
            this.hasSigned = true;
            this.getPetition();
            this.getSignatories();
          }).catch((err) => {
            alert(err.response.statusText);
          });
        } else {
          return;
        }
      },
      deleteSignature: function() {
        if (this.$cookies.get('Token')) {
          let token = this.$cookies.get('Token');
          let petitionId = this.petition.petitionId;
          let headers = {
            'X-Authorization': token,
          };
          this.axios.delete('http://localhost:4941/api/v1/petitions/' + petitionId + '/signatures', {headers: headers}).
              then((response) => {
                this.hasSigned = false;
                this.getPetition();
                this.getSignatories();
              }).
              catch((err) => {
                alert(err.response.statusText);
              });
        } else {
          return;
        }
      },
      deletePetition: function() {
        if (confirm('Are you sure you want to delete this petition?\nThis cannot be undone.')) {
          let id = this.$route.params.petitionId;
          let headers = {
            'X-Authorization': this.$cookies.get('Token'),
          };
          this.axios.delete('http://localhost:4941/api/v1/petitions/' + id, {headers: headers}).then((response) => {
            this.$router.push('/petitions/myPetitions');
          }).catch((err) => {
            alert(err.response.statusText);
          });
        } else {
          return;
        }
      },
      goToEdit: function() {
        let petitionId = this.$route.params.petitionId;
        this.$router.push('/petitions/' + petitionId + '/edit');
      },
      getPetition: function() {
        let id = this.$route.params.petitionId;
        this.axios.get('http://localhost:4941/api/v1/petitions/' + id).then((response) => {
          this.petition = response.data;
          this.petition.createdDate = this.petition.createdDate.substring(0, 10);
          this.petition.closingDate = this.petition.closingDate.substring(0, 10);
          let name = this.petition.authorName;
          this.petition.initials = name.substring(0, 1) + name.substring(name.indexOf(' ') + 1, name.indexOf(' ') + 2);
          if (this.petition.authorId == this.$cookies.get('UserId')) {
            this.isOwner = true;
          }
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
      getSignatories: function() {
        let id = this.$route.params.petitionId;
        this.axios.get('http://localhost:4941/api/v1/petitions/' + id + '/signatures').then((response) => {
          this.signatories = response.data;
          let sigs = this.signatories;
          let currentUserId = this.$cookies.get('UserId');
          for (let i = 0; i < sigs.length; i++) {
            let name = sigs[i].name;
            sigs[i].initials = name.substring(0, 1) + name.substring(name.indexOf(' ') + 1, name.indexOf(' ') + 2);
            if (currentUserId) {
              if (sigs[i].signatoryId == currentUserId) {
                this.hasSigned = true;
              }
            }
          }
        }).catch((err) => {
          alert(err.response.statusText);
        });
      },
    },
  };
</script>

<style scoped>
    .circular {
        border-radius: 50%;
    }

    a[class^="share-network-"] {
        flex: none;
        color: #FFFFFF;
        background-color: #333;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 10px 10px 0;
    }

    a[class^="share-network-"] .fah {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 10px;
        flex: 0 1 auto;
    }

    a[class^="share-network-"] span {
        padding: 0 10px;
        flex: 1 1 0%;
        font-weight: 500;
    }

    h2 {
        font-size: 20pt;
    }
</style>