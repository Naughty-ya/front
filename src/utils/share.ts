export async function copyClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export function shareKakaoLink() {
  const kakao = window.Kakao
  const key = import.meta.env.VITE_KAKAO_JS_KEY

  if (!kakao.isInitialized()) {
    kakao.init(key)
  }

  kakao.Share.sendDefault({
    objectType: 'text',
    text: '',
    link: {
      // TODO: url 수정
      mobileWebUrl: 'https://example.com',
      webUrl: 'https://example.com'
    }
  })
}
