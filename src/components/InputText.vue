<script setup lang="ts">
import { ref } from 'vue';

type InputTextProps = {
  label: string;
  error?: string;
  isValid?: boolean;
  optional?: boolean;
};

const model = defineModel<string>();
defineProps<InputTextProps>();
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
        class="w-full border rounded-md h-10 px-4 hover:border-blue-400 focus:outline-none transition-colors"
        :class="{
          'border-red-500': error,
          'border-green-500': !error && isValid && model,
          'border-gray-400': !error && (!isValid || !model),
        }"
        type="text"
        autocomplete="off"
        v-model="model"
      />
      <button
        v-if="model"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        @click="handleClear"
      >
        ✕
      </button>
    </div>
    <span v-if="error" class="text-sm text-red-500">{{ error }}</span>
  </label>
</template>
