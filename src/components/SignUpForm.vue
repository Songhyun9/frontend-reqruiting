<script setup lang="ts">
import { ref, computed } from 'vue';
import InputText from './InputText.vue';

const userId = ref('');
const name = ref('');
const organization = ref('');

const userIdDirty = ref(false);
const nameDirty = ref(false);
const organizationDirty = ref(false);

const handleUserIdInput = () => {
  userIdDirty.value = true;
};

const handleNameInput = () => {
  nameDirty.value = true;
};

const handleOrganizationInput = () => {
  organizationDirty.value = true;
};

const isValidUserId = computed(() => {
  if (!userId.value) return false;
  return /^[a-zA-Z0-9]+$/.test(userId.value);
});

const isValidName = computed(() => {
  if (!name.value) return false;
  return !/[\\/:*?"<>|]/.test(name.value);
});

const isValidOrganization = computed(() => {
  return !/[\\/:*?"<>|]/.test(organization.value);
});

const isFormValid = computed(() => {
  return isValidUserId.value && isValidName.value && isValidOrganization.value;
});

const userIdError = computed(() => {
  if (!userIdDirty.value) return '';
  if (!userId.value) return 'ID를 입력해주세요';
  if (!isValidUserId.value) return '알파벳과 숫자만 사용 가능합니다';
  return '';
});

const nameError = computed(() => {
  if (!nameDirty.value) return '';
  if (!name.value) return '이름을 입력해주세요';
  if (!isValidName.value) return '특수문자 \\ / : * ? " < > | 는 사용할 수 없습니다';
  return '';
});

const organizationError = computed(() => {
  if (!organizationDirty.value) return '';
  if (!organization.value) return false;
  if (!isValidOrganization.value) return '특수문자 \\ / : * ? " < > | 는 사용할 수 없습니다';
  return '';
});

const handleSubmit = () => {
  userIdDirty.value = true;
  nameDirty.value = true;
  organizationDirty.value = true;

  if (!isFormValid.value) {
    return;
  }

  alert(`User ID: ${userId.value}\nName: ${name.value}\nOrganization: ${organization.value}`);
};
</script>

<template>
  <form class="flex flex-col gap-4 py-4" @submit.prevent="handleSubmit">
    <InputText
      label="User ID"
      v-model="userId"
      :error="userIdError"
      :is-valid="isValidUserId"
      @input="handleUserIdInput"
    />
    <InputText label="Name" v-model="name" :error="nameError" :is-valid="isValidName" @input="handleNameInput" />
    <InputText
      label="Organization"
      v-model="organization"
      :error="organizationError"
      :is-valid="isValidOrganization"
      :optional="true"
      @input="handleOrganizationInput"
    />
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="!isFormValid"
    >
      Submit
    </button>
  </form>
</template>
