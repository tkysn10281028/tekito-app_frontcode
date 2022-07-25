<template>
  <div id="homepage"></div>
</template>

<script>
export default {
  created: function () {
    this.$router.push("/login");
  },
};
</script>