<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-8">Login to Physics Problem Database</h1>
    <button
      @click="signInWithGoogle"
      class="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
    >
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" class="w-6 h-6 mr-2" />
      Sign in with Google
    </button>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const error = ref('')

const signInWithGoogle = async () => {
  try {
    const { data, error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (signInError) {
      console.error('SignIn Error:', signInError)
      throw signInError
    }
    
    if (data.url) {
      console.log('Redirect URL:', data.url)
      window.location.href = data.url
    } else {
      console.error('No redirect URL provided')
      error.value = 'Failed to get redirect URL. Please try again.'
    }
  } catch (err) {
    console.error('Error signing in with Google', err)
    error.value = 'Failed to sign in with Google. Please try again.'
  }
}
</script>