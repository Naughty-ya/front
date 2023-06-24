export async function copyClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export function shareKakaoLink() {
  window.Kakao.Link.createCustomButton({
    container: '#kakao-link-btn',
    templateId: 73967,
    templateArgs: {}
  })
}
