<script setup lang="ts">
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/images/favicon.ico" }],
  htmlAttrs: { lang: "en" },
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
@import "./assets/css/bootstrap.css";

@theme {
  --font-sans: "Inter", sans-serif;
}
</style>
