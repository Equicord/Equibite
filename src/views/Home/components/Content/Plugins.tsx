"use client";

import Button from "@components/UI/Button";
import Switch from "@components/UI/Switch";
import {
    cleanDescription,
    fetchPlugins,
    getAvailabilityText,
    type Plugin,
} from "@utils/plugin";
import { Globe, Puzzle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PluginProps {
    title: string;
    description: string;
}

function DiscordPlugin({ title, description }: PluginProps) {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="w-full max-w-92 rounded-xl bg-neutral-900 px-4 py-6 md:px-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">{title}</h1>
                <Switch
                    onClick={() => setEnabled(!enabled)}
                    checked={enabled}
                />
            </div>

            <p className="text-sm font-medium text-neutral-400">
                {description}
            </p>
        </div>
    );
}

function getRandomPlugins(plugins: Plugin[], count: number): Plugin[] {
    const equicordPlugins = plugins.filter(
        p =>
            p.filePath.toLowerCase().startsWith("src/equicordplugins") &&
            p.description &&
            p.description.length > 20 &&
            p.description.length < 150,
    );

    const shuffled = [...equicordPlugins].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export default function FeaturePlugins() {
    const [randomPlugins, setRandomPlugins] = useState<Plugin[] | null>(null);

    useEffect(() => {
        fetchPlugins("equicord").then(list => {
            if (list && list.length > 0) {
                setRandomPlugins(getRandomPlugins(list, 2));
            }
        });
    }, []);

    const fallbackPlugins = [
        {
            title: "ShowBadgesInChat",
            description:
                "Shows the message author's badges beside their name in chat. Available on all platforms.",
        },
        {
            title: "BetterActivities",
            description:
                "Shows activity icons in the member list and allows showing all activities. Available on all platforms.",
        },
    ];

    const displayPlugins = randomPlugins
        ? randomPlugins.map(p => ({
            title: p.name,
            description: `${cleanDescription(p.description)}. ${getAvailabilityText(p.name, p.required, p.target)}.`,
        }))
        : fallbackPlugins;

    return (
        <div className="flex justify-between gap-6 max-md:flex-col">
            <div className="flex w-full flex-col gap-6 rounded-xl bg-neutral-900 px-8 py-12 md:w-2/3 md:justify-between">
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-xl font-semibold">
                        <Puzzle fill="#ffffff10" size={24} />
                        Third-party plugins
                    </span>

                    <p className="font-medium text-neutral-400">
                        Access a wide variety of plugins, including 200+ plugins
                        alongside the existing ones in Vencord.
                    </p>
                </div>

                <Link href="/plugins" className="w-fit">
                    <Button variant="secondary" icon={<Globe size={16} />}>
                        Explore plugins
                    </Button>
                </Link>
            </div>

            <div className="flex w-full flex-col items-center justify-center py-6 max-md:px-8 max-sm:gap-3">
                <div className="scale-95 brightness-75 md:translate-y-3 lg:translate-x-24">
                    <DiscordPlugin
                        title={displayPlugins[0].title}
                        description={displayPlugins[0].description}
                    />
                </div>
                <div className="-translate-y-6 shadow-lg md:-translate-y-3 lg:-translate-x-24">
                    <DiscordPlugin
                        title={displayPlugins[1].title}
                        description={displayPlugins[1].description}
                    />
                </div>
            </div>
        </div>
    );
}
