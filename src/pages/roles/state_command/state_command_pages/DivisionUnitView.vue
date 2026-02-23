<!-- src/pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitView.vue -->
<template>
    <DivisionalCoordinatorLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">Surulere Division</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <!-- Header -->
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">View Division Unit</h2>
        </div>
  
        <!-- Body -->
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Name</label>
              <input
                v-model="model.unitName"
                readonly
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Type</label>
              <input
                v-model="model.unitType"
                readonly
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Total Officers</label>
              <input
                v-model="model.totalOfficers"
                readonly
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Head</label>
              <input
                v-model="model.unitHead"
                readonly
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
              <div class="relative">
                <select
                  v-model="model.status"
                  disabled
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 pr-12 text-[14px] text-[#6B7280]
                         outline-none disabled:cursor-not-allowed"
                >
                  <option value="">Select...</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Date Created</label>
              <div class="relative">
                <input
                  v-model="model.dateCreated"
                  readonly
                  type="date"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 pr-12 text-[14px] text-[#6B7280]
                         outline-none"
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
              @click="onBack"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                     shadow-sm hover:bg-[#F9FAFB]"
            >
              Back
            </Motion>
  
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="goEdit"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
            >
              Edit
            </Motion>
          </div>
        </div>
      </Motion>
    </DivisionalCoordinatorLayout>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown } from "lucide-vue-next"
  import DivisionalCoordinatorLayout from "../layout/Layout.vue"
  
  const route = useRoute()
  const router = useRouter()
  const id = String(route.params.id || "")
  
  const STORAGE_KEY = "ncrms_dc_division_units"
  
  function readUnits() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  const model = ref({
    unitName: "",
    unitType: "",
    totalOfficers: "",
    unitHead: "",
    dateCreated: "",
    status: "",
  })
  
  ;(() => {
    const existing = readUnits()
    const found = existing.find((r) => String(r.id) === id)
    if (found) {
      model.value = {
        unitName: found.unitName || "",
        unitType: found.unitType || "",
        totalOfficers: String(found.totalOfficers || ""),
        unitHead: found.unitHead || "",
        dateCreated: found.dateCreated || "",
        status: found.status || "",
      }
    } else {
      model.value = {
        unitName: "Intelligence Unit",
        unitType: "Intelligence",
        totalOfficers: "16",
        unitHead: "Micheal Jackson",
        dateCreated: "2025-01-12",
        status: "Active",
      }
    }
  })()
  
  function onBack() {
    router.push({ name: "dc-division-units" })
  }
  function goEdit() {
    router.push({ name: "dc-division-units-edit", params: { id } })
  }
  </script>
  