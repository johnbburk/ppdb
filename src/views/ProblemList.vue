<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Physics Problems</h2>
    <ul class="space-y-4">
      <li v-for="problem in problems" :key="problem.id" class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">{{ problem.title }}</h3>
          <div class="space-x-2">
            <router-link :to="`/problems/${problem.id}`" class="text-blue-600 hover:text-blue-800">
              <Edit :size="20" />
            </router-link>
            <button @click="deleteProblem(problem.id)" class="text-red-600 hover:text-red-800">
              <Trash2 :size="20" />
            </button>
          </div>
        </div>
        <div class="mt-2">
          <span v-for="tag in problem.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {{ tag }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Edit, Trash2 } from 'lucide-vue-next'
import { supabase } from '../supabase'

interface Problem {
  id: string
  title: string
  tags: string[]
}

const problems = ref<Problem[]>([])

onMounted(async () => {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
  if (error) console.error('Error fetching problems:', error)
  else problems.value = data
})

const deleteProblem = async (id: string) => {
  const { error } = await supabase
    .from('problems')
    .delete()
    .eq('id', id)
  if (error) console.error('Error deleting problem:', error)
  else problems.value = problems.value.filter(p => p.id !== id)
}
</script>