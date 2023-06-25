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
      description: 'AI가 판별해주는 나의 T 성향',
      imageUrl:
        'http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
      link: {
        webUrl: import.meta.env.VITE_KAKAO_SHARE_URL
      }
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      },
      {
        title: '앱으로 보기',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com'
        }
      }
    ]
  })
}

export function shareTwitter() {}
