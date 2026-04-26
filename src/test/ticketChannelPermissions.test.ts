import { describe, it, expect } from 'vitest';
import { botTicketAllow, userTicketDeny, buildTicketPermissionOverwrites } from '../application/service/ticketChannelPermissions.js';

describe('ticketChannelPermissions', () => {
    it('every user deny permission must be present in bot allow list', () => {
        for (const perm of userTicketDeny) {
            expect(
                botTicketAllow.includes(perm),
                `Permission 0x${perm.toString(16)} is in userTicketDeny but missing from botTicketAllow — Discord will reject channel creation`,
            ).toBe(true);
        }
    });

    it('buildTicketPermissionOverwrites returns four overwrites', () => {
        const overwrites = buildTicketPermissionOverwrites('guild-id', 'bot-id', 'support-id', 'user-id');
        expect(overwrites).toHaveLength(4);
    });
});
