/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Button } from "@components/Button";
import ErrorBoundary from "@components/ErrorBoundary";
import { Heading } from "@components/Heading";
import { Paragraph } from "@components/Paragraph";
import { OptionComponentMap } from "@components/settings/tabs/plugins/components";
import { cl as globalCl } from "@components/settings/tabs/plugins/components/Common";
import { classes } from "@utils/misc";
import { React, useState } from "@webpack/common";

import { optionDefs, settings } from "./settings";

// useState is provided as a named export from @webpack/common

const categories = [
    {
        id: "ui",
        label: "UI",
        keys: ["uiFlavour"]
    },
    {
        id: "engine",
        label: "NDI Engine",
        keys: ["masterSwitch", "initNdiEngineOnStartup", "ndiRuntimePath", "videoFormat"]
    },
    {
        id: "capture",
        label: "Capture",
        keys: ["captureMode"]
    },
    {
        id: "performance",
        label: "Performance",
        keys: ["offloadToWorkerThread", "masterFpsCap"]
    },
    {
        id: "advanced",
        label: "Advanced",
        keys: ["showTestButton"]
    }
];

export function NDIConfig() {
    const [active, setActive] = useState(categories[0].id);
    const s = settings.use();

    const renderSetting = (key: string) => {
        const def = optionDefs[key as keyof typeof optionDefs];
        if (!def) return null;

        const OptionComp = OptionComponentMap[def.type];
        if (!OptionComp) return null;

        return (
            <OptionComp
                key={key}
                option={def}
                id={key}
                pluginSettings={settings.store as any}
                definedSettings={settings}
                onChange={(v: any) => settings.store[key] = v}
            />
        );
    };

    const activeCategory = categories.find(c => c.id === active) ?? categories[0];
    const categoryKeys = activeCategory.keys.filter(k => k in optionDefs);

    const rootStyle = {
        display: "flex",
        flexDirection: "column" as const,
        gap: "1rem",
        "--header-primary": "#fff"
    } as any;

    return (
        <ErrorBoundary>
            <div style={rootStyle}>
                <div style={{ display: "flex", gap: ".5rem", alignItems: "center", overflowX: "auto" }}>
                    {categories.map(cat => (
                        <Button
                            key={cat.id}
                            onClick={() => setActive(cat.id)}
                            className={classes(globalCl("section"), active === cat.id && "vc-active-category")}
                            style={active === cat.id ? { borderBottom: "2px solid var(--interactive-normal)", background: "transparent", color: "var(--header-primary)" } as any : { background: "transparent", color: "var(--text-muted)" }}
                        >
                            {cat.label}
                        </Button>
                    ))}
                </div>

                <div>
                    <Heading tag="h3">{activeCategory.label} Settings</Heading>
                    <Paragraph />
                    <div style={{ marginTop: 8 }}>
                        {categoryKeys.length === 0 && (
                            <Paragraph>No options in this category</Paragraph>
                        )}
                        {categoryKeys.map(k => (
                            <>{renderSetting(k)}
                                <br /></>
                        ))}
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}
export default NDIConfig;
