import { JSXElement } from 'solid-js'

interface Props {
    children: JSXElement
}

const Main = ({ children }: Props) => {
    return <main class="max-w-read mx-auto py-24 px-6">{children}</main>
}

export default Main
