/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

export default definePlugin({
    name: "NDIcord",
    description: "A vencord plugin that adds NDI streaming support to Discord. (For content creators)",
    authors: [Devs.zinixyt],
    options: {
        masterSwitch: {
            type: OptionType.BOOLEAN,
            description: "Master toggle for NDIcord",
            default: true
        },
        ndiRuntimePath: {
            type: OptionType.STRING,
            description: "Path to NDI Runtime (Leave blank for default path)",
            default: "C:\\"
        },
        initNdiEngineOnStartup: {
            type: OptionType.BOOLEAN,
            description: "Initialize NDI Engine on Discord startup",
            default: true
        },
        workingMode: {
            type: OptionType.SELECT,
            description: "Select NDIcord working mode",
            default: "Canvas Scrape",
            options: [
                { label: "Canvas Scrape", value: "Canvas Scrape" },
                { label: "Direct Hook", value: "Direct Hook" }
            ]
        },
        videoFormat: {
            type: OptionType.SELECT,
            description: "Select NDI video format",
            default: "BGRA",
            options: [
                { label: "UYVY", value: "UYVY" },
                { label: "BGRA", value: "BGRA" }
            ]
        },
        offloadToWorkerThread: {
            type: OptionType.BOOLEAN,
            description: "Offload NDI processing to a Worker Thread (May improve performance)",
            default: true
        },
        masterFpsCap: {
            type: OptionType.SLIDER,
            description: "Set a master FPS cap for NDI output",
            default: 30,
            markers: [5, 15, 30, 60],
            min: 5,
            max: 60,
            step: 5
        }
    }
});
