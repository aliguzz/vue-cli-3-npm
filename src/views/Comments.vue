<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <h2>Comments for Version : {{ $route.params.versionId }}</h2>
      </b-col>
      <b-col>
        <button class="btn btn-primary" v-b-modal.modal1>Add Comment</button>
      </b-col>
    </b-row>
    <div class="row">
      <div class="col col-sm-1"></div>
      <div class="col col-sm-5">
        <b-list-group>
          <b-list-group-item>
            <b-img
              height="400"
              class="float-left"
              width="400"
              :src="
                'https://adeo-spark.adeogroup.co.uk/uploads/images/' +
                  user_id +
                  '/' +
                  $route.params.versionimage
              "
              fluid
              alt="Responsive image"
            />
          </b-list-group-item>
        </b-list-group>
      </div>
      <div class="col col-sm-3">
        <div class="row" v-for="comment in comments" :key="comment.id">
          <b-list-group>
            <b-list-group-item>
              <strong>{{ comment.comment }}</strong>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div class="col col-sm-1"></div>
    </div>

    <div>
      <!-- Modal Component -->
      <b-modal
        id="modal1"
        title="New Comment"
        ref="modal"
        @ok="handleOk"
        @shown="clearName"
      >
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input
            v-model="comment"
            type="text"
            placeholder="Add Comment here"
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
  name: "comments",
  data() {
    return {
      comments: "",
      comment: "",
      user_id: "",
      showLoader: false,
      msg: "Please wait..."
    };
  },
  mounted() {
    this.showLoader = true;
    let token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("version_id", this.$route.params.versionId);
    axios
      .post(
        "https://adeo-spark.adeogroup.co.uk/api/comments/show_all_by_version",
        formData,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(result => {
        this.user_id = result.data.user_id;
        this.comments = result.data.comments.original;
      })
      .then(result => (this.showLoader = false));
  },
  methods: {
    clearName() {
      this.comment = "";
    },
    handleOk(evt) {
      // Prevent modal from closing
      evt.preventDefault();
      if (!this.comment) {
        alert("Please enter comment");
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.showLoader = true;
      let token = localStorage.getItem("token");
      let formData = new FormData();
      formData.append("user_id", localStorage.getItem("user_id"));
      formData.append("version_id", this.$route.params.versionId);
      formData.append("comment", this.comment);
      axios
        .post(
          "https://adeo-spark.adeogroup.co.uk/api/comments/create",
          formData,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + token
            }
          }
        )
        .then(result => {
          this.user_id = result.data.user_id;
          this.comments = result.data.comments.original;
        })
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
