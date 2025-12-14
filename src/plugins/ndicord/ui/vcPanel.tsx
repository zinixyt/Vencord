/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { NDIIconL } from "./uiUtils";

export function vcNdiPanel() {
    console.log("Rendering NDI Panel Button");
    return (
        <div style={{
            // Flexbox & Layout
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            // Box Model
            padding: "4px",
            borderRadius: "12px",
            // Theming (Discord Variables)
            background: "var(--background-surface-high)",
            border: "1px solid var(--border-muted)",
            // Positioning (Optional, just to be safe)
            height: "40px"
        }}>
            <NDIIconL width={24} height={24} />
        </div>
    );
}
