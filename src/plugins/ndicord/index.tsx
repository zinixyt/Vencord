/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import ErrorBoundary from "@components/ErrorBoundary";
import { Heading } from "@components/Heading";
import { Devs } from "@utils/constants";
import { ModalContent, ModalRoot, ModalSize, openModal } from "@utils/modal";
import definePlugin, { StartAt } from "@utils/types";

import { settings } from "./settings";
import { NDIIconXS } from "./ui/uiUtils";
import { vcNdiPanel } from "./ui/vcPanel";

/**
 * Renders a debug button in the chat bar.
 * Only visible if we are in a chat and the user has enabled the test button in settings.
 */
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
            <NDIIconXS />
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
        icon: NDIIconXS,
        render: NDIButton
    },
    settings,

    patches: [
        {
            // Find the module responsible for the "Voice Connected" bottom tray
            find: "center-control-tray",
            replacement: {
                // Regex Breakdown:
                // 1. \i.eventPromptsContainer -> Anchor to the identifier above the tray
                // 2. \i.wrapper -> Finds the main container of the buttons
                // 3. children:\[ -> Stops right at the start of the children array
                match: /\i.eventPromptsContainer.*?ref:\i.*?\i.wrapper.*?children:\[/,
                // Injects the custom panel component ($self.vcNdiPanel)
                // into the children array alongside the existing controls.
                replace: "$&$self.vcNdiPanel(),"
            }
        }
    ],

    // Wraps the custom UI component in an ErrorBoundary.
    // This ensures that if the NDI panel crashes, it doesn't break the entire Voice Tray.
    vcNdiPanel: ErrorBoundary.wrap(vcNdiPanel, { noop: true })
});
