export function formatVietnameseDate(value){
  return value ? new Date(value).toLocaleDateString("vi-VN") : "";
}
