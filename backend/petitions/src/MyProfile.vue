<template>
    <b-container>
        <b-row>
            <b-col>
                <b-avatar :src="'http://localhost:4941/api/v1/users/'+$cookies.get('UserId')+'/photo'"
                          :text="profile.initials"
                          size="200px">
                </b-avatar>
            </b-col>
        </b-row>
        <br>
        <b-row>
            <b-col>
                <b-button to="/MyProfile/edit">Edit Profile</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-card style="margin: 1em" align="left">
                    <b-row>
                        <b-col>
                            <b-row>
                                <b-col><b>Name:</b></b-col>
                                <b-col align="right"><p>{{profile.name}}</p></b-col>
                            </b-row>
                            <b-row>
                                <b-col><b>Email:</b></b-col>
                                <b-col align="right"><p>{{profile.email}}</p></b-col>
                            </b-row>
                            <b-row v-if="profile.city">
                                <b-col><b>City:</b></b-col>
                                <b-col align="right"><p>{{profile.city}}</p></b-col>
                            </b-row>
                            <b-row v-if="profile.country">
                                <b-col><b>Country:</b></b-col>
                                <b-col align="right"><p>{{profile.country}}</p></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'MyProfile',
    data() {
      return {
        profile: {},
      }
    },
    mounted: function() {
      this.getProfile();
    },
    methods: {
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
          }).catch((err) => {
            alert(err.response.statusText);
          });
        } else {
          this.$router.push('/');
        }
      }
    }
  };
</script>

<style scoped>

</style>