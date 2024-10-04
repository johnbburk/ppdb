<template>
  <span v-html="renderedLatex"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import katex from 'katex';

const props = defineProps<{
  latex: string;
}>();

const renderedLatex = computed(() => {
  try {
    return katex.renderToString(props.latex, {
      throwOnError: false,
      displayMode: false,
    });
  } catch (error) {
    console.error('Error rendering LaTeX:', error);
    return props.latex;
  }
});
</script>