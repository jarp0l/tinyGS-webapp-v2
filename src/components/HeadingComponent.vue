<template>
  <v-container>
    <div class="text-h5 text-grey-darken-3 text-center font-weight-bold">
      {{ heading }}
    </div>
  </v-container>
</template>

<script setup>
defineProps(["heading"]);
</script>
