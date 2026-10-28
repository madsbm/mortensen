---
title: tOS
tagline: Et bare-metal x86_64-styresystem skrevet i Rust.
summary: En kerne med næsten ingen eksterne afhængigheder og sin egen hukommelseshåndtering, egne synkroniseringsprimitiver, NVMe- og netværksdrivere, et ext2-filsystem og en eksperimentel TCP/IP-stak.
tags: [Rust, x86_64, Kerne]
role: Soloprojekt
stack: [Rust, x86_64, ACPI, NVMe, E1000, ext2, TCP/IP]
---

## Hvorfor bygge et styresystem

tOS er der, hvor jeg finder ud af, hvad der egentlig foregår under den software, jeg skriver til daglig. Det har med vilje næsten ingen eksterne afhængigheder: Når noget i kernen virker, er det, fordi jeg har skrevet det og ved hvorfor.

## Hvad er implementeret

### Hukommelse

- En virtuel hukommelsesmanager med sider på 4 KiB, 2 MiB og 1 GiB.
- Tre allokatorer oven på hinanden: en bootstrap-allokator til den tidlige opstart, en buddy-allokator til fysiske frames og en slab-allokator til kerneobjekter.

### Platform

- APIC-understøttelse til interrupts.
- En egen ACPI-tabelparser og AML-evaluator.

### Concurrency

- Håndskrevne synkroniseringsprimitiver: spinlock, MPSC-kanal, ringbuffer og RWLock.
- En egen bounded MPMC-kø.

### Drivere og lager

- En NVMe-driver med et ext2-filsystem ovenpå.
- En Intel E1000-netværksdriver.

### Netværk

- En eksperimentel stak med Ethernet, ARP, IPv4, UDP og TCP samt sockets og validering af checksums.

## Kendte begrænsninger

- Der er endnu ingen user mode, så alt kører i ring 0.
- TCP-implementeringen er eksperimentel. Den har ingen congestion control og mangler andre avancerede TCP-funktioner.

## MPMC-køen

I de workloads, jeg har benchmarket, nåede den bounded MPMC-kø omkring 2× gennemløbet af flere etablerede Rust-implementeringer.

Resultatet gælder for de workloads på den hardware, ikke generelt. Benchmarkmetoden, hardwaren og trinene til at genskabe resultatet hører hjemme ved siden af koden, og det er også der, de kommer til at ligge.
