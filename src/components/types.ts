
export type Item = {
  title: string,
  done: boolean,
  id: string
}

export interface TodoProps {
  todo: Item,
  onToggle: (arg: string) => void
}