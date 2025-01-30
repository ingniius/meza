<script setup lang="ts"></script>

<template>
  <header class="flex h-[64px] flex-row items-center justify-start px-8 py-4">
    <h3 class="text-2xl font-medium">Meza</h3>
  </header>

  <main class="flex min-h-screen flex-col items-center justify-center">
    <slot />
  </main>

  <footer class="flex h-[64px] flex-row items-center justify-end px-8 py-4">
    <span>Copyright © {{ new Date().getFullYear() }}</span>
  </footer>
</template>
