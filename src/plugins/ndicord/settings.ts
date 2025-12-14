/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

import { NDIConfig } from "./settingsPanel";

export const optionDefs = {
    masterSwitch: {
        type: OptionType.BOOLEAN,
        description: "Master toggle for the NDI Engine",
        default: true
    },
    ndiRuntimePath: {
        label: "NDI Runtime Path",
        type: OptionType.STRING,
        description: "Path to NDI Runtime (Leave blank for default path)",
        default: "C:\\"
    },
    initNdiEngineOnStartup: {
        label: "Initialize NDI Engine on Startup",
        type: OptionType.BOOLEAN,
        description: "Initialize NDI Engine on Discord startup",
        default: true
    },
    captureMode: {
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
        label: "Master FPS Cap",
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
    },
    uiFlavour: {
        label: "UI Flavour",
        type: OptionType.SELECT,
        description: "Select the UI flavour for NDIcord settings",
        options: [
            { label: "Non-Intrusive", value: "nonIntrusive", description: "A minimal UI that blends with Discord's settings.", default: true },
            { label: "Pro-Production", value: "proProduction", description: "A detailed UI with advanced options for professional content creators." },
            { label: "Balanced", value: "balanced", description: "A balanced UI with essential options and a clean layout." }
        ]
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
    uiFlavour?: string;
}>();
