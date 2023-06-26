import { toast } from 'react-toastify'

export async function shareClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast('복사되었습니다!')
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
        'https://github.com/Naughty-ya/front/blob/main/public/temp-kakao-share.png?raw=true',
      link: {
        webUrl: import.meta.env.VITE_SHARE_URL
      }
    },
    buttons: [
      {
        title: '테스트하러 가기',
        link: {
          mobileWebUrl: import.meta.env.VITE_SHARE_URL,
          webUrl: import.meta.env.VITE_SHARE_URL
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
