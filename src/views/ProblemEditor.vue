<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">{{ id ? 'Edit Problem' : 'Create New Problem' }}</h2>
    <input
      v-model="title"
      type="text"
      placeholder="Problem Title"
      class="w-full p-2 mb-4 border rounded"
    />
    <div class="mb-4">
      <div class="flex mb-2">
        <input
          v-model="newTag"
          @keyup.enter="addTag"
          type="text"
          placeholder="Add a tag"
          class="flex-grow p-2 border rounded-l"
        />
        <button @click="addTag" class="bg-blue-600 text-white px-4 py-2 rounded-r">Add</button>
      </div>
      <div class="flex flex-wrap gap-2">
        <span v-for="tag in tags" :key="tag" class="bg-gray-200 px-2 py-1 rounded flex items-center">
          {{ tag }}
          <button @click="removeTag(tag)" class="ml-2 text-red-600">&times;</button>
        </span>
      </div>
    </div>
    <editor-content :editor="editor" class="prose max-w-full mb-4 p-4 border rounded" />
    <button @click="saveProblem" class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
      Save Problem
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { supabase } from '../supabase';
import 'katex/dist/katex.min.css';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const title = ref('');
const tags = ref<string[]>([]);
const newTag = ref('');

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: 'Write your problem here...',
    }),
  ],
  content: '',
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
    },
  },
});

onMounted(async () => {
  if (id) {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.error('Error fetching problem:', error);
    else {
      title.value = data.title;
      tags.value = data.tags;
      editor.value?.commands.setContent(data.content);
    }
  }
});

const addTag = () => {
  if (newTag.value && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value);
    newTag.value = '';
  }
};

const removeTag = (tagToRemove: string) => {
  tags.value = tags.value.filter(tag => tag !== tagToRemove);
};

const saveProblem = async () => {
  const problemData = {
    title: title.value,
    tags: tags.value,
    content: editor.value?.getHTML(),
  };

  if (id) {
    const { error } = await supabase
      .from('problems')
      .update(problemData)
      .eq('id', id);
    if (error) console.error('Error updating problem:', error);
  } else {
    const { error } = await supabase
      .from('problems')
      .insert(problemData);
    if (error) console.error('Error creating problem:', error);
  }

  router.push('/problems');
};
</script>