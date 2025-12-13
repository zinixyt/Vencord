/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { Devs } from "@utils/constants";
import definePlugin, { IconComponent, StartAt } from "@utils/types";

import { settings } from "./settings";

const NDIIcon: IconComponent = ({ height = 20, width = 20, className }) => (
    <svg height={height} width={width} viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
);

const NDIButton: ChatBarButtonFactory = ({ isAnyChat }) => {
    const s = settings.use();

    if (!isAnyChat) return null;
    if (!s.masterSwitch) return null;
    if (!s.showTestButton) return null;

    return (
        <ChatBarButton
            tooltip="NDIcord Test"
            onClick={() => console.log("NDIcord test button clicked")}
        >
            <NDIIcon />
        </ChatBarButton>
    );
};

export default definePlugin({
    name: "NDIcord",
    description: "A vencord plugin that adds NDI streaming support to Discord. (For content creators)",
    authors: [Devs.zinixyt],
    // Render a basic chat input button for testing. Clicking it will print a message to the console.
    startAt: StartAt.Init,
    chatBarButton: {
        icon: NDIIcon,
        render: NDIButton
    },

    settings,

    // settings are defined in `./settings.ts` and rendered via the `config` component
});
