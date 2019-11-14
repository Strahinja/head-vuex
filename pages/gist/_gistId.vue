<template>
  <div class="container">
    <div>
      <h1>Gist: {{gistId}}</h1>
      <p>
        <NLink to="/" class="button--grey">Back home</NLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `GistId: ${this.gist.gistId}`,
      description: this.gist.data.description
    };
  },
  asyncData() {
    return {
      name: process.server ? "server" : "client"
    };
  },
  async middleware({ store }) {
    await store.dispatch("gists/loadGists");
  },
  computed: {
    gistId() {
      return this.$route.params.gistId;
    },
    gist() {
      const theGist = this.$store.getters["gists/gistById"](this.gistId);
      console.log("about.vue.gist: theGist = ", theGist);
      if (theGist) {
        return theGist;
      } else {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
h1 {
  font-weight: 400;
}
.name {
  color: #00C48D;
}
p {
  margin-top: 20px;
}
</style>
