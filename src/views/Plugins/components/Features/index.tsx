import { Urls } from "@utils/index";

type Author = {
    name: string;
    id: string;
};

type Commands = {
    name: string;
    description: string;
};

type Plugin = {
    commands: Commands[];
    hasCommands: boolean;
    name: string;
    description: string;
    authors: Author[];
};


export const fetchPlugins = async (): Promise<Plugin[]> => {
    const response = await fetch(Urls.PLUGINS_URL);
    if (!response.ok) throw new Error("Failed to fetch plugins");
    return response.json();
};