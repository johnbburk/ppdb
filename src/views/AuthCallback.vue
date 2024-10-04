<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-xl">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const message = ref('Completing sign-in process...')

onMounted(async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error during auth callback:', error)
      throw error
    }
    if (data.session) {
      console.log('Session established successfully:', data.session)
      message.value = 'Sign-in successful. Redirecting...'
      router.push('/problems')
    } else {
      console.error('No session data received')
      message.value = 'Sign-in failed. Redirecting to login...'
      setTimeout(() => router.push('/login'), 2000)
    }
  } catch (error) {
    console.error('Error during auth callback:', error)
    message.value = 'An error occurred. Redirecting to login...'
    setTimeout(() => router.push('/login'), 2000)
  }
})
</script>