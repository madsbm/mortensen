---
title: PacketPlots
tagline: Plots til hver spiller i én fælles Minecraft-verden, virtualiseret på pakkeniveau.
summary: Et system i Java og Netty, der omskriver Minecraft-protokollen for hver forbindelse, så hver spiller får sit eget plot i en verden, alle deler.
tags: [Java, Netty, Protokoller]
role: Soloprojekt
stack: [Java, Netty, Minecraft-protokollen]
---

## Idéen

Alle spillere står i den samme fælles multiplayer-verden, men hver af dem får sit eget plot. I stedet for at adskille spillerne på serveren virtualiserer PacketPlots plottene for hver forbindelse, nede i netværkslaget.

## Sådan virker det

PacketPlots arbejder på pakkeniveau med Java og Netty og manipulerer Minecraft-protokollen direkte. Det meste af arbejdet gik med at reverse engineere, hvordan klienten forventer, at protokollen opfører sig, og derefter holde hver spillers billede af verden konsistent:

- **Indlæsning af chunks**, også i batches.
- **Inventar**, der åbnes og lukkes.
- **Interaktioner** og resten af den adfærd på pakkeniveau, som en klient forventer.

## Hvad jeg tog med mig

At behandle en protokol som noget, man kan opsnappe og omforme, mens begge ender stadig er enige, er en stor del af det, systemarbejde handler om.
