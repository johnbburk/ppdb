<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to Physics Problem Database</h1>
    <p class="text-xl mb-8">Explore, create, and solve physics problems with ease.</p>
    <div class="flex justify-center space-x-4">
      <router-link to="/problems" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
        <BookOpen class="mr-2" />
        Browse Problems
      </router-link>
      <router-link to="/problems/new" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
        Create New Problem
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
</script>