/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Button } from "@components/Button";
import { Heading } from "@components/Heading";
import { Devs } from "@utils/constants";
import { ModalContent, ModalRoot, ModalSize, openModal } from "@utils/modal";
import definePlugin, { IconComponent, StartAt } from "@utils/types";

import { settings } from "./settings";

// --- ICONS & TEST BUTTON STUFF (Kept as is) ---
const NDIIcon: IconComponent = ({ height = 20, width = 20, className }) => (
    <svg height={height} width={width} viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
);

const NDIButton: ChatBarButtonFactory = ({ isAnyChat }) => {
    const s = settings.use();
    if (!isAnyChat || !s.masterSwitch || !s.showTestButton) return null;
    return (
        <ChatBarButton tooltip="NDIcord Test" onClick={() => {
            openModal(props => (
                <ModalRoot {...props} size={ModalSize.DYNAMIC} role="dialog">
                    <ModalContent>
                        <div style={{ padding: "1em", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Heading style={{ color: "white" }}>NDIcord Test</Heading>
                            <p style={{ color: "white" }}>Plugin is active!</p>
                        </div>
                    </ModalContent>
                </ModalRoot>
            ));
        }}>
            <NDIIcon />
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "NDIcord",
    description: "Adds NDI streaming support to Discord. (Intended for content creators and streamers)",
    authors: [Devs.zinixyt],
    // Render a basic chat input button for testing.
    startAt: StartAt.Init,
    chatBarButton: {
        icon: NDIIcon,
        render: NDIButton
    },
    settings,

    // --- THE FIX ---
    patches: [
        {
            find: "center-control-tray",
            replacement: {
                match: /(\(0,\s*([a-zA-Z0-9_$]+)\.jsxs\)\("div",[\s\S]*?className:\s*([a-zA-Z0-9_$]+)\.buttonSection[\s\S]*?)(,\s*\(0,\s*[a-z]+\.jsx[\s\S]*?onDisconnectCall:)/,
                replace: '$1,(0, $2.jsxs)("div",{className: $3.buttonSection, children: [(0, $2.jsx)($self.NDIPanel, {})] }) $4'
            }
        }],

    // 4. Your Component Logic
    // This is called by the replacement above
    NDIPanel() {
        return (
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    // Add a little padding to match the native tray feel
                    paddingLeft: "8px"
                }}
            >
                <Button
                    size="small"
                    onClick={() => console.log("NDI Stream Started")}
                >
                    NDI
                </Button>
            </div>
        );
    }
});
