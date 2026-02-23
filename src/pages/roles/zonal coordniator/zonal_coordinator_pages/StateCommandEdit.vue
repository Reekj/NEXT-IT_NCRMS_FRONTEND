<template>
    <ZonalCoordinatorLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">South-West</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <!-- Header -->
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">Edit State Command</h2>
        </div>
  
        <!-- Body -->
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <!-- State Name -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">State Name</label>
              <input
                v-model="model.stateName"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- State ID -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">State ID</label>
              <input
                v-model="model.stateId"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Zone -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Zone</label>
              <input
                v-model="model.zone"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Total LGAs -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Total LGAs</label>
              <input
                v-model="model.totalLgas"
                type="text"
                inputmode="numeric"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Commissioner -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Commissioner</label>
              <input
                v-model="model.commissioner"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Phone -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">State Phone No.</label>
              <input
                v-model="model.phone"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Status -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
              <div class="relative">
                <select
                  v-model="model.status"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option value="">Select...</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <!-- Date Created -->
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Date Created</label>
              <div class="relative">
                <input
                  v-model="model.dateCreated"
                  type="date"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
                <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="onUpdate"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
            >
              Update
            </Motion>
  
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="onCancel"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                     shadow-sm hover:bg-[#F9FAFB]"
            >
              Cancel
            </Motion>
          </div>
        </div>
      </Motion>
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../layout/Layout.vue"
  
  const route = useRoute()
  const router = useRouter()
  
  const id = String(route.params.id || "")
  
  // Hardcoded (replace with API fetch by id later)
  const model = ref({
    stateName: "Oyo State",
    stateId: "Z01-01",
    zone: "SW Zone",
    totalLgas: "22",
    commissioner: "A. Johnson",
    phone: "07010001020",
    status: "Active",
    dateCreated: "2025-01-12",
  })
  
  function onUpdate() {
    // minimal for now
    router.push({ name: "zc-state-commands" })
  }
  
  function onCancel() {
    router.push({ name: "zc-state-commands" })
  }
  </script>
  