<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand to="/"><img src="./assets/365-petition-logo.png" height="30px"></b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item to="/petitions">Find a Petition</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="isLoggedIn"
                            to="/petitions/startPetition">
                    Start a Petition
                </b-nav-item>
                <b-nav-item v-if="!isLoggedIn" to="/">Login</b-nav-item>
                <b-nav-dropdown v-if="isLoggedIn" right :text="usersName" align="left">
                    <b-dropdown-item to="/MyProfile">My Profile</b-dropdown-item>
                    <b-dropdown-item to="/petitions/myPetitions">My Petitions</b-dropdown-item>
                    <b-dropdown-item to="/MyProfile/edit">Edit Profile</b-dropdown-item>
                    <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                </b-nav-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
  export default {
    name: 'Nav',
    data() {
      return {
        isLoggedIn: false,
        usersName: '',
      };
    },
    mounted: function() {
      this.getSession();
      this.$eventBus.$on('login', () => {
        this.getSession();
      });

    },
    created() {

    },
    methods: {
      getSession: function() {
        if (this.$cookies.get('Token') !== null) {
          this.isLoggedIn = true;
        }
        if (this.isLoggedIn) {
          this.axios.get('http://localhost:4941/api/v1/users/' + this.$cookies.get('UserId')).then((response) => {
            this.usersName = response.data.name;
          }).catch((err) => {
            alert(err.response.statusText);
          });
        }
      },
      logout: function() {
        if (this.isLoggedIn) {
          let headers = {
            'X-Authorization': this.$cookies.get('Token'),
          };
          this.axios.post('http://localhost:4941/api/v1/users/logout', {}, {headers: headers}).then((response) => {
            this.isLoggedIn = false;
            this.$cookies.remove('Token');
            this.$cookies.remove('UserId');
            this.$router.push('/');
          }).catch((err) => {
            alert(err.response.statusText);
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
