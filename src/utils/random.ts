// 이거 이름 Props 가 아니라 Params 로 하시는 거 어떤가용?
type NickNameProps = {
  id: number
  name: string
}

function getRandomName(names: NickNameProps[]) {
  const idx = Math.floor(Math.random() * names.length)
  return names[idx].name
}

export { getRandomName }
