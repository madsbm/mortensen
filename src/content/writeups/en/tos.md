---
title: tOS
tagline: A bare-metal x86_64 operating system, written in Rust.
summary: A largely dependency-free kernel with its own memory management, synchronisation primitives, NVMe and network drivers, an ext2 filesystem and an experimental TCP/IP stack.
tags: [Rust, x86_64, Kernel]
role: Solo project
stack: [Rust, x86_64, ACPI, NVMe, E1000, ext2, TCP/IP]
---

## Why build an OS

tOS is where I go to understand what actually happens underneath the software I write for a living. It's largely dependency-free on purpose: if something in the kernel works, it's because I wrote it and know why.

## What's implemented

### Memory

- A virtual-memory manager with 4 KiB, 2 MiB and 1 GiB pages.
- Three allocators layered on each other: a bootstrap allocator for early boot, a buddy allocator for physical frames and a slab allocator for kernel objects.

### Platform

- APIC support for interrupts.
- A custom ACPI table parser and AML evaluator.

### Concurrency

- Hand-written synchronisation primitives: spinlock, MPSC channel, ring buffer and RWLock.
- A custom bounded MPMC queue.

### Drivers and storage

- An NVMe driver and an ext2 filesystem on top of it.
- An Intel E1000 network driver.

### Networking

- An experimental stack covering Ethernet, ARP, IPv4, UDP and TCP, with sockets and checksum validation.

## Known limitations

- There's no user mode yet, so everything runs in ring 0.
- The TCP implementation is experimental. It has no congestion control and lacks other advanced TCP features.

## The MPMC queue

In the workloads I benchmarked, the bounded MPMC queue reached roughly 2× the throughput of several established Rust implementations.

That result holds for those workloads on that hardware, not in general. The benchmark methodology, hardware and steps to reproduce it belong next to the code, and that's where they'll live.
