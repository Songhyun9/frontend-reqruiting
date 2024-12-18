export const VALIDATION_PATTERNS = {
  userId: /^[a-zA-Z0-9]+$/,
  name: /^[^\\/:*?"<>|]+$/,
  organization: /^[^\\/:*?"<>|]*$/,
};

export const VALIDATION_MESSAGES = {
  userId: {
    required: 'ID를 입력해주세요',
    pattern: '알파벳과 숫자만 사용 가능합니다',
  },
  name: {
    required: '이름을 입력해주세요',
    pattern: '특수문자 \\ / : * ? " < > | 는 사용할 수 없습니다',
  },
  organization: {
    pattern: '특수문자 \\ / : * ? " < > | 는 사용할 수 없습니다',
  },
};
