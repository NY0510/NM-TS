import {ChatInputCommandInteraction, EmbedBuilder, type HexColorString, SlashCommandBuilder, hyperlink, inlineCode} from 'discord.js';

import type {Command} from '@/client/types';
import type {NMClient} from '@/client/Client';
import {ensurePlaying, ensureSameVoiceChannel, ensureVoiceChannel} from '@/utils/music';
import {safeReply} from '@/utils/discord/interactions';

export default {
  data: new SlashCommandBuilder().setName('clear').setDescription('대기열을 비워요.'),
  cooldown: 3,
  async execute(interaction: ChatInputCommandInteraction) {
    const client = interaction.client as NMClient;
    const player = client.manager.players.get(interaction.guildId!);

    if (!(await ensureVoiceChannel(interaction))) return; // 음성 채널에 들어가 있는지 확인
    if (!(await ensureSameVoiceChannel(interaction))) return; // 같은 음성 채널에 있는지 확인
    if (!player) return;

    player.queue.clear();

    return await safeReply(interaction, {
      embeds: [new EmbedBuilder().setTitle('대기열을 비웠어요.').setColor(client.config.EMBED_COLOR_NORMAL)],
    });
  },
} as Command;
