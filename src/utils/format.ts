/**
 * 한국 휴대폰 번호 형색으로 포맷팅 (01012345678 -> 010-1234-5678)
 */
export const formatPhone = (phone?: string | null): string => {
  if (!phone) return "-";
  
  // 숫자만 추출
  const cleaned = phone.replace(/\D/g, "");
  
  // 11자리 (010-1234-5678)
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  
  // 10자리 (010-123-4567 또는 02-1234-5678)
  if (cleaned.length === 10) {
    if (cleaned.startsWith("02")) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  
  // 9자리 (02-123-4567)
  if (cleaned.length === 9 && cleaned.startsWith("02")) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  }

  return phone;
};
