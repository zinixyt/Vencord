/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import { NDIConfig } from "./SettingsAbout";

export const optionDefs = {
    masterSwitch: {
        type: OptionType.BOOLEAN,
        description: "Master toggle for the NDI Engine",
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
        description: "Select Capture Method",
        options: [
            { label: "Canvas Scrape", value: "Canvas Scrape", default: true },
            { label: "Direct Hook", value: "Direct Hook" }
        ]
    },
    videoFormat: {
        type: OptionType.SELECT,
        description: "Select NDI video format",
        options: [
            { label: "UYVY", value: "UYVY" },
            { label: "BGRA", value: "BGRA", default: true }
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
    },
    showTestButton: {
        type: OptionType.BOOLEAN,
        description: "Show the NDIcord test chat input button",
        default: true
    }
} as const;

export const settings = definePluginSettings({
    config: {
        type: OptionType.COMPONENT,
        component: NDIConfig
    }
}).withPrivateSettings<{
    masterSwitch?: boolean;
    ndiRuntimePath?: string;
    initNdiEngineOnStartup?: boolean;
    workingMode?: string;
    videoFormat?: string;
    offloadToWorkerThread?: boolean;
    masterFpsCap?: number;
    showTestButton?: boolean;
}>();
