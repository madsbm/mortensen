---
title: PacketPlots
tagline: Per-player plots in one shared Minecraft world, virtualised at the packet level.
summary: A Java and Netty system that rewrites the Minecraft protocol per connection, so every player gets their own plot inside a world everyone shares.
tags: [Java, Netty, Protocols]
role: Solo project
stack: [Java, Netty, Minecraft protocol]
---

## The idea

Every player stands in the same shared multiplayer world, but each of them gets their own plot. Instead of separating players on the server, PacketPlots virtualises the plots per connection, in the network layer.

## How it works

PacketPlots works at the packet level with Java and Netty, manipulating the Minecraft protocol directly. Most of the work went into reverse engineering how the client expects that protocol to behave, then keeping every player's view of the world consistent:

- **Chunk loading**, including batched chunk loading.
- **Inventory** open and close.
- **Interactions** and the rest of the packet-level behaviour a client expects.

## What I took from it

Treating a protocol as something you can intercept and reshape, while keeping both ends in agreement, is a large part of what systems work is about.
