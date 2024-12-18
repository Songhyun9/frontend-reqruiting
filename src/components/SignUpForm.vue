<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from './InputText.vue';
import { useFormValidation } from '@/composables/useFormValidation';
import { VALIDATION_MESSAGES, VALIDATION_PATTERNS } from '@/constants/validation';

type FieldName = 'userId' | 'name' | 'organization';

interface FormData {
  userId: string;
  name: string;
  organization: string;
}

const FORM_FIELDS: Record<
  FieldName,
  {
    label: string;
    optional?: boolean;
  }
> = {
  userId: { label: 'User ID' },
  name: { label: 'Name' },
  organization: { label: 'Organization', optional: true },
};

const formData = ref<FormData>({
  userId: '',
  name: '',
  organization: '',
});

const dirtyFields = ref<Record<FieldName, boolean>>({
  userId: false,
  name: false,
  organization: false,
});

const { isValidUserId, isValidName, isValidOrganization, isFormValid } = useFormValidation(formData);

const getValidationState = computed(() => ({
  userId: isValidUserId.value,
  name: isValidName.value,
  organization: isValidOrganization.value,
}));

const getFieldError = (field: FieldName): string => {
  if (!dirtyFields.value[field]) return '';

  const value = formData.value[field];
  const { optional } = FORM_FIELDS[field];

  if (!optional && !value) {
    return VALIDATION_MESSAGES[field].required;
  }

  if (value && !VALIDATION_PATTERNS[field].test(value)) {
    return VALIDATION_MESSAGES[field].pattern;
  }

  return '';
};

const handleFieldChange = (field: FieldName) => {
  dirtyFields.value[field] = true;
};

const handleSubmit = () => {
  Object.keys(dirtyFields.value).forEach((field) => {
    dirtyFields.value[field as FieldName] = true;
  });

  if (!isFormValid.value) return;

  const formDataString = Object.entries(formData.value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  alert(formDataString);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 py-4">
    <InputText
      v-for="(field, key) in FORM_FIELDS"
      :key="key"
      :label="field.label"
      v-model="formData[key as FieldName]"
      :error="getFieldError(key as FieldName)"
      :is-valid="getValidationState[key as FieldName]"
      @input="() => handleFieldChange(key as FieldName)"
    />

    <button
      type="submit"
      :disabled="!isFormValid"
      class="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  </form>
</template>
