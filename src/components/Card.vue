<template>
  <div class="subnav">
      hey there
  </div>
</template>

<script>
  export default {
    data() {
      return {
        checked: false,
        title: 'Check me'
      }
    },
    methods: {
      check() {
        this.checked = !this.checked;
      }
    }
  }
</script>