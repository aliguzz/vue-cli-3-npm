<template>
  <div class="home blue-bg">
    <projects />
  </div>
</template>

<script>
// @ is an alias to /src
import projects from "@/components/projects.vue";

export default {
  name: "home",
  components: {
    projects
  }
};
</script>
