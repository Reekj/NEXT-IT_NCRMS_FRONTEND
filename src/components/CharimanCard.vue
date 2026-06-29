<template>
  <section class="commissioner-section relative overflow-hidden bg-[#F4F6FA]">
    <div class="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F6FA_100%)]"></div>
    <div class="absolute inset-0 opacity-[0.035] technical-grid"></div>

    <div class="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12">
      <div class="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
        <!-- Image block -->
        <div class="relative">
          <div class="absolute -left-5 -top-5 h-28 w-28 border-l-[3px] border-t-[3px] border-[#0A2395]"></div>
          <div class="absolute -bottom-5 -right-5 h-28 w-28 border-b-[3px] border-r-[3px] border-[#0A2395]"></div>

          <div class="commissioner-image group relative min-h-[620px] overflow-hidden bg-[#DDE6F6] shadow-[0_34px_90px_rgba(3,11,47,0.15)]">
            <!-- Replace this placeholder div with image when ready -->
            <div
              class="absolute inset-0 bg-[linear-gradient(135deg,#DDE6F6_0%,#F8FAFF_45%,#C9D8F2_100%)]"
              aria-label="Chairman photo placeholder"
            ></div>

            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,11,47,0)_48%,rgba(3,11,47,0.82)_100%)]"></div>

            <div class="absolute left-0 top-0 h-full w-[5px] bg-[#0A2395]"></div>
            <div class="absolute right-0 top-0 h-28 w-28 border-b border-l border-white/25"></div>

            <div class="absolute bottom-0 left-0 right-0 border-t border-white/16 bg-[#030B2F]/78 px-7 py-6 text-white backdrop-blur-md">
              <div class="text-[23px] font-black tracking-[-0.02em]">Gen. Muhammad Bada</div>
              <div class="mt-1 text-[18px] font-light text-white/65">State Commissioner</div>
            </div>
          </div>
        </div>

        <!-- Text content -->
        <div class="relative border-l border-[#07111F]/12 pl-8 lg:pl-12">
          <div class="mb-7 flex items-center gap-4">
            <span class="h-[3px] w-24 bg-[#0A2395]"></span>
            <span class="text-[12px] font-black uppercase tracking-[0.28em] text-[#0A2395]">
              Executive Oversight
            </span>
          </div>

          <p class="max-w-3xl text-[22px] font-light leading-[1.85] text-[#07111F]/62 lg:text-[26px]">
            NCRMS is a centralized, secure, and interoperable digital platform designed to collect, manage, and
            share criminal records across all relevant agencies in real-time. The project aims to develop a
            centralized and secure database application System to store, manage, retrieve, and report
            organizational data. The system supports role-based access control, ensures data integrity, and
            provides forensic features to enhance reliability and security.
          </p>

          <div class="mt-11 border-t border-[#07111F]/10 pt-8">
            <h3 class="text-[30px] font-black tracking-[-0.04em] text-[#07111F]">
              Gen. Muhammad Bada
            </h3>
            <p class="mt-2 text-[22px] font-light text-[#07111F]/52">
              State Commissioner
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Static section. Replace placeholder image block with the real chairman image when available.
</script>

<style scoped>
.commissioner-section {
  font-feature-settings: "cv02", "cv03", "cv04", "cv11";
}

.technical-grid {
  background-image:
    linear-gradient(rgba(7, 17, 31, 0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(7, 17, 31, 0.35) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: linear-gradient(180deg, transparent 0%, black 18%, black 72%, transparent 100%);
}

.commissioner-image {
  transform-style: preserve-3d;
  transition:
    transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.55s ease;
}

.commissioner-image:hover {
  transform: perspective(1300px) rotateX(1.5deg) rotateY(-2deg) translateY(-8px);
  box-shadow: 0 44px 110px rgba(3, 11, 47, 0.2);
}

@media (max-width: 640px) {
  .commissioner-image {
    min-height: 420px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .commissioner-image {
    transition: none;
  }

  .commissioner-image:hover {
    transform: none;
  }
}
</style>