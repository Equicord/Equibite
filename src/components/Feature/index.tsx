import Fa from 'solid-fa'

interface Props {
    icon: any
    title: string
    excerpt: string
}

const Feature = (props: Props) => {
    return (
        <div class="w-full p-6 flex flex-col gap-1 bg-neutral-900 rounded-2xl">
            <div class="size-12 p-0.5 bg-gradient-to-t from-neutral-900 to-neutral-600 rounded-full">
                <div class="size-full flex justify-center items-center bg-neutral-950 rounded-full">
                    <Fa icon={props.icon} class="text-gray-300" />
                </div>
            </div>

            <h3 class="text-lg text-neutral-300 font-bold">{props.title}</h3>

            <p class="text-sm text-neutral-400 font-medium">{props.excerpt}</p>
        </div>
    )
}

export default Feature
