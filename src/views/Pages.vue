<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h1>Pages for : {{ $route.params.projectName }}</h1>
      </b-col>
      <b-col>
        <button class="btn btn-primary" v-b-modal.modal1>new page</button>
      </b-col>
    </b-row>
    <div class="row" v-for="page in pages" :key="page.id">
      <div class="col col-sm-2"></div>
      <div class="col col-sm-8">
        <b-list-group>
          <b-list-group-item>
            <a :href="'/versions/' + page.id + '/' + page.name">{{
              page.name
            }}</a>
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col col-sm-2"></div>
    </div>

    <div>
      <!-- Modal Component -->
      <b-modal
        id="modal1"
        title="New Page"
        ref="modal"
        @ok="handleOk"
        @shown="clearName"
      >
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input
            type="text"
            placeholder="Page Name"
            v-model="name"
          ></b-form-input>
        </form>
      </b-modal>
    </div>

    <BlockUI :message="msg" v-if="showLoader"></BlockUI>
  </b-container>
</template>

<script>
const axios = require("axios");
export default {
  name: "pages",
  data() {
    return {
      pages: "",
      name: "",
      authenticated: true,
      showLoader: false,
      msg: "Please wait..."
    };
  },
  mounted() {
    this.$emit("authenticated", true);
    this.showLoader = true;
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("project_id", this.$route.params.projectId);
    axios
      .post(
        "https://adeo-spark.adeogroup.co.uk/api/pages/show_all_by_project",
        formData,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => (this.pages = result.data.page.original))
      .then(result => (this.showLoader = false));
  },
  methods: {
    clearName() {
      this.name = "";
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.name) {
        alert("Please enter project name");
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.$emit("authenticated", true);
      this.showLoader = true;
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("project_id", this.$route.params.projectId);
      formData.append("name", this.name);
      axios
        .post("https://adeo-spark.adeogroup.co.uk/api/pages/create", formData, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          }
        })
        .then(response => (this.pages = response.data.pages.original))
        .then(result => (this.showLoader = false));
      this.clearName();
      this.$refs.modal.hide();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
i {
  color: #fff;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
