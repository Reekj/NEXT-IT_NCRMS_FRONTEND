<template>
    <section class="bg-white">
      <!-- Matches Figma: Width 1440, padding: top/bottom 80, left/right 100 -->
      <div class="mx-auto w-full max-w-[1440px] px-[100px] py-[80px]">
        <div class="grid grid-cols-12 items-start gap-10">
          <!-- Left image / placeholder block -->
          <div class="col-span-5">
            <div
              class="aspect-square w-full rounded-[12px] bg-[#EDEDED]"
              aria-label="Chairman photo placeholder"
            />
          </div>
  
          <!-- Right text content -->
          <div class="col-span-7">
            <p class="max-w-[520px] text-[14px] font-light leading-[24px] text-black/70">
              NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
              share criminal records across all relevant agencies in real-time. The project aims to develop a
              centralized and secure database application System to store, manage, retrieve, and report
              organizational data. The system supports role-based access control, ensures data integrity, and
              provides forensic features to enhance reliability and security.
            </p>
  
            <div class="mt-10">
              <h3 class="text-[20px] font-extrabold leading-tight text-black">
                Gen. Muhammad Bada
              </h3>
              <p class="mt-2 text-[14px] text-black/70">State Commissioner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // No logic needed for this static Figma section.
  // Later we can accept props for name, title, and image src.
  </script>
  