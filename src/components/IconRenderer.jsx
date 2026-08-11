import * as Icons from 'lucide-react'

export default function IconRenderer({ name, ...props }) {
  const Cmp = Icons[name] || Icons.Circle
  return <Cmp {...props} />
}
