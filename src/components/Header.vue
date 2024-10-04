<template>
  <header class="bg-blue-600 text-white">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold flex items-center">
        <BookOpen class="mr-2" />
        Physics Problem DB
      </router-link>
      <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/problems" class="hover:text-blue-200">Problems</router-link></li>
          <li v-if="user"><router-link to="/problems/new" class="hover:text-blue-200">New Problem</router-link></li>
          <li v-if="user">
            <button @click="handleSignOut" class="flex items-center hover:text-blue-200">
              <LogOut class="mr-1" :size="18" />
              Logout
            </button>
          </li>
          <li v-else>
            <router-link to="/login" class="flex items-center hover:text-blue-200">
              <LogIn class="mr-1" :size="18" />
              Login
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BookOpen, LogOut, LogIn } from 'lucide-vue-next'
import { supabase } from '../supabase'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  user.value = currentUser
})

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
  } else {
    user.value = null
    router.push('/login')
  }
}
</script>