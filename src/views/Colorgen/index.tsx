import { createSignal, createEffect } from "solid-js";
import './styles.css';

function getBrightness(r: any, g: any, b: any) {
    return (r + g + b) / 3;
}

function getLuminance(r: number, g: number, b: number) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getHue(r: number, g: number, b: number) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    if (diff === 0) return 0;

    let hue = 0;
    switch (max) {
        case r:
            hue = ((g - b) / diff) % 6;
            break;
        case g:
            hue = (b - r) / diff + 2;
            break;
        case b:
            hue = (r - g) / diff + 4;
            break;
    }

    return hue * 60;
}

function getSaturation(r: number, g: number, b: number) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    if (max === 0) return 0;
    return diff / max;
}

export default function EquicordColors() {
    const [step, setStep] = createSignal(32);
    const [sortBy, setSortBy] = createSignal("none");
    type Color = { r: number; g: number; b: number };
    const [allColors, setAllColors] = createSignal<Color[]>([]);
    const [loading, setLoading] = createSignal(false);
    const [sortedColors, setSortedColors] = createSignal<Color[]>([]);

    const totalColors = () => Math.pow(Math.ceil(256 / step()), 3);

    async function generateColors() {
        let s = step();
        if (isNaN(s) || s <= 0) s = 1;

        const maxStepCount = Math.ceil(256 / s);
        const totalItems = Math.pow(maxStepCount, 3);
        setLoading(totalItems > 1000);

        if (totalItems <= 1000) {
            const colors = [];
            for (let r = 0; r < 256; r += s) {
                for (let g = 0; g < 256; g += s) {
                    for (let b = 0; b < 256; b += s) {
                        colors.push({ r, g, b });
                    }
                }
            }
            setAllColors(colors);
            setLoading(false);
        } else {
            let colors: any[] | ((prev: never[]) => never[]) = [];
            let itemCount = 0;
            const batchSize = 50;

            while (itemCount < totalItems) {
                const batchColors = [];
                let batchCount = 0;

                while (batchCount < batchSize && itemCount < totalItems) {
                    const rIndex = Math.floor(itemCount / (maxStepCount * maxStepCount));
                    const gIndex = Math.floor(
                        (itemCount % (maxStepCount * maxStepCount)) / maxStepCount
                    );
                    const bIndex = itemCount % maxStepCount;

                    batchColors.push({
                        r: rIndex * s,
                        g: gIndex * s,
                        b: bIndex * s,
                    });

                    batchCount++;
                    itemCount++;
                }

                colors = [...colors, ...batchColors];
                setAllColors(colors);
                await new Promise((res) => requestAnimationFrame(res));
            }
            setLoading(false);
        }
    }

    createEffect(() => {
        const sortVal = sortBy();
        if (sortVal === "none") {
            setSortedColors(allColors());
            return;
        }

        const sorted = [...allColors()];

        sorted.sort((a, b) => {
            switch (sortVal) {
                case "brightness":
                    return getBrightness(b.r, b.g, b.b) - getBrightness(a.r, a.g, a.b);
                case "luminance":
                    return getLuminance(b.r, b.g, b.b) - getLuminance(a.r, a.g, a.b);
                case "hue":
                    return getHue(a.r, a.g, a.b) - getHue(b.r, b.g, b.b);
                case "saturation":
                    return getSaturation(b.r, b.g, b.b) - getSaturation(a.r, a.g, a.b);
                case "red":
                    return b.r - a.r;
                case "green":
                    return b.g - a.g;
                case "blue":
                    return b.b - a.b;
                default:
                    return 0;
            }
        });

        setSortedColors(sorted);
    });

    createEffect(() => {
        if (sortBy() === "none") {
            setSortedColors(allColors());
        }
    });

    createEffect(() => {
        generateColors();
    }, [step]);

    const onStepInput = (e: { target: { value: string; }; }) => {
        const val = parseInt(e.target.value);
        if (val > 0 && val <= 256) {
            setStep(val);
        }
    };
    const onSortChange = (e: { target: { value: any; }; }) => setSortBy(e.target.value);

    return (
        <>
            <h1 style={{ "text-align": "center" }}>Equicord Colors</h1>

            <div class="controls">
                <label for="stepInput">Step Size:</label>
                <input
                    id="stepInput"
                    type="number"
                    min="1"
                    max="256"
                    step="4"
                    value={step()}
                    onInput={onStepInput}
                />
                <span class="color-count">({totalColors()} colors)</span>

                <label for="sortSelect">Sort by:</label>
                <select id="sortSelect" value={sortBy()} onChange={onSortChange}>
                    <option value="none">Default Order</option>
                    <option value="brightness">Brightness</option>
                    <option value="luminance">Luminance</option>
                    <option value="hue">Hue</option>
                    <option value="saturation">Saturation</option>
                    <option value="red">Red Value</option>
                    <option value="green">Green Value</option>
                    <option value="blue">Blue Value</option>
                </select>
            </div>

            <div class="colors">
                {loading() && <div id="loading">Generating colors...</div>}
                {!loading() &&
                    sortedColors().map(({ r, g, b }) => {
                        const color = `rgb(${r},${g},${b})`;
                        return (
                            <div
                                class="item"
                                style={{ "background-color": color }}
                                data-r={r}
                                data-g={g}
                                data-b={b}
                            >
                                <img
                                    src={"/logo.png"}
                                    class="logo"
                                    loading="lazy"
                                    alt=""
                                />
                                <span>{color}</span>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
