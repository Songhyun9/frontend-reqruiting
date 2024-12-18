<script setup lang="ts">
import { ref } from 'vue';

type InputTextProps = {
  label: string;
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
  <label class="flex flex-col gap-4">
    {{ label }}
    <div class="relative">
      <input
        ref="inputRef"
        class="w-full border-gray-400 border rounded-md h-10 px-4 hover:border-blue-400 invalid:border-red-500 focus:border-green-400 focus:outline-none"
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
  </label>
</template>
