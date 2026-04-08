<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

navigateTo('/account/profile', { redirectCode: 301, replace: true })
</script>
