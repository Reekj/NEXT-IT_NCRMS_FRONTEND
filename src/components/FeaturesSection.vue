<template>
    <section class="bg-white">
      <div class="mx-auto w-full max-w-[1440px] px-[100px] py-[80px]">
        <div class="flex flex-col items-center gap-[64px]">
          <!-- Heading + subtitle -->
          <div class="text-center">
            <h2 class="text-[64px] font-extrabold leading-[1.1] tracking-tight text-[#200A95]">
              Powerful Features for Law Enforcement
            </h2>
            <p class="mx-auto mt-4 max-w-[760px] text-[24px] font-light leading-6 text-black/60">
              Our platform provides the tools and data you need to conduct thorough background
              checks and criminal record searches efficiently.
            </p>
          </div>
  
          <!-- Cards grid -->
          <div class="grid w-full grid-cols-2 gap-[32px]">
            <div
              v-for="item in features"
              :key="item.title"
              class="rounded-[14px] h-[326px] border border-black/10 bg-white px-[28px] py-[26px] shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <div class="flex flex-col">
                <div class="grid h-16 w-16 place-items-center rounded-[10px] bg-[#DBEAFE] text-[24px]">
                  <component :is="item.icon" class="h-5 w-5 text-[#155DFC]" />
                </div>
  
                <h3 class="mt-4 text-[24px] font-bold text-black">
                  {{ item.title }}
                </h3>
  
                <p class="mt-2 text-[24px] font-light leading-6 text-black/60">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
          <!-- /Cards grid -->
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import {
    Search,
    Database,
    Clock,
    ShieldCheck,
    FileText,
    Lock,
  } from "lucide-vue-next";
  
  const features = [
    {
      icon: Search,
      title: "Advanced Search",
      description:
        "Powerful search capabilities with multiple filters including name, location, case number and date ranges.",
    },
    {
      icon: Database,
      title: "Comprehensive Database",
      description:
        "Access to millions of criminal records from federal, state, and local jurisdictions nationwide.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Database is continuously updated to ensure you have access to the most current information available.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Compliant",
      description:
        "NCRMS compliant platform with encryption and strict access controls to protect sensitive data.",
    },
    {
      icon: FileText,
      title: "Verified Records",
      description:
        "All records are verified and sourced directly from official government and law enforcement databases.",
    },
    {
      icon: Lock,
      title: "Data Security",
      description:
        "Enterprise-grade security with multi-factor authentication and encrypted data transmission.",
    },
  ];
  </script>
``  