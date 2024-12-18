<script setup lang="ts">
import { ref } from 'vue';

interface InputTextProps {
  label: string;
  error?: string;
  isValid?: boolean;
}
defineProps<InputTextProps>();
const model = defineModel<string>();
const inputRef = ref<HTMLInputElement | null>(null);

const handleClear = () => {
  model.value = '';
  inputRef.value?.focus();
};
</script>

<template>
  <label class="flex flex-col gap-2">
    {{ label }}
    <div class="relative">
      <input
        ref="inputRef"
        v-model="model"
        type="text"
        autocomplete="off"
        :class="[
          'w-full border rounded-md h-10 px-4 transition-colors',
          'hover:border-blue-400 focus:outline-none',
          {
            'border-red-500': !!error,
            'border-green-500': !error && isValid && model,
            'border-gray-400': !error && (!isValid || !model),
          },
        ]"
      />
      <button
        v-if="model"
        type="button"
        @click="handleClear"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
    </div>
    <span v-if="error" class="text-sm text-red-500">
      {{ error }}
    </span>
  </label>
</template>
