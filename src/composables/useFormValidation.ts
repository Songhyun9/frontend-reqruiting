import { computed, type Ref } from 'vue';
import { VALIDATION_PATTERNS } from '@/constants/validation';

interface FormData {
  userId: string;
  name: string;
  organization: string;
}

export function useFormValidation(formData: Ref<FormData>) {
  const isValidUserId = computed(() => {
    const { userId } = formData.value;
    return userId && VALIDATION_PATTERNS.userId.test(userId);
  });

  const isValidName = computed(() => {
    const { name } = formData.value;
    return name && VALIDATION_PATTERNS.name.test(name);
  });

  const isValidOrganization = computed(() => {
    const { organization } = formData.value;
    return !organization || VALIDATION_PATTERNS.organization.test(organization);
  });

  const isFormValid = computed(() => {
    return isValidUserId.value && isValidName.value && isValidOrganization.value;
  });

  return {
    isValidUserId,
    isValidName,
    isValidOrganization,
    isFormValid,
  };
}
