import { RotateCcw } from "lucide-solid"
import { JSX, Show } from "solid-js"
import Button from "./Button"

interface LoadingStateProps {
    loading: boolean
    error?: Error | null
    loadingText?: string
    errorText?: string
    onRetry?: () => void
    children: JSX.Element
}

export default function LoadingState(props: LoadingStateProps) {
    return (
        <Show
            when={!props.loading && !props.error}
            fallback={
                <div class="flex items-center justify-center py-12">
                    <Show
                        when={props.error}
                        fallback={
                            <div class="flex flex-col items-center gap-2">
                                <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-sky-500" />
                                <p class="text-sm font-bold text-sky-200">
                                    {props.loadingText ?? "Loading"}
                                </p>
                            </div>
                        }
                    >
                        <div class="flex flex-col items-center gap-2">
                            <p class="text-sm font-bold text-red-400">
                                {props.errorText ?? "Failed to load"}
                            </p>
                            <Show when={props.onRetry}>
                                <Button
                                    variant="red"
                                    icon={<RotateCcw size={16} />}
                                    onClick={props.onRetry}
                                >
                                    Retry
                                </Button>
                            </Show>
                        </div>
                    </Show>
                </div>
            }
        >
            {props.children}
        </Show>
    )
}
