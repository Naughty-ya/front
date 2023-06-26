export async function shareClipboard(text: string) {
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
    objectType: 'feed',
    content: {
      title: '너 T야?',
      description: 'AI가 판별해주는 나의 T 성향!',
      imageUrl:
        'https://github.com/Naughty-ya/front/blob/main/public/kakao-share.png',
      link: {
        webUrl: import.meta.env.VITE_SHARE_URL
      }
    },
    buttons: [
      {
        title: '테스트하러 가기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      }
    ]
  })
}

export function shareTwitter() {
  const text = '너 T야? - AI가 판별해주는 나의 T 성향!'
  const url = import.meta.env.VITE_SHARE_URL
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)
}
