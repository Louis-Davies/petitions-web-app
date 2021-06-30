<template>
    <div id="foot">
        <b-container>
            <b-row>
                <b-col>
                    <p class="top-line">University of Canterbury</p>
                </b-col>
                <b-col>
                    <p class="top-line">SENG-365 Assignment 2</p>
                </b-col>
                <b-col>
                    <p class="top-line">By Anonymous Student</p>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <p>Web Client</p>
                </b-col>
                <b-col>
                    <p>Last edited 25/05/2020</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  export default {
    name: 'Foot',
  };
</script>

<style scoped>
    #foot {
        background-color: white;
    }
    .top-line {
        margin-top: 12pt;
    }
</style>