<!-- src/pages/roles/divisional_coordinator/divisional_coordinator_pages/DivisionUnitEdit.vue -->
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
          <h2 class="text-[18px] font-semibold text-[#111827]">Edit Division Unit</h2>
        </div>
  
        <!-- Body -->
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Name</label>
              <input
                v-model="model.unitName"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Type</label>
              <input
                v-model="model.unitType"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Total Officers</label>
              <div class="relative">
                <select
                  v-model="model.totalOfficers"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option value="">Select...</option>
                  <option v-for="n in officerOptions" :key="n" :value="String(n)">{{ n }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Head</label>
              <input
                v-model="model.unitHead"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
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
  const STORAGE_EVENT = "ncrms-dc-division-units-updated"
  
  const officerOptions = Array.from({ length: 30 }, (_, i) => i + 1)
  
  function readUnits() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function writeUnits(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT))
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
      // fallback so it never renders blank
      model.value = {
        unitName: "Intelligence Unit",
        unitType: "Intelligence",
        totalOfficers: "12",
        unitHead: "A. Kehinde",
        dateCreated: "2025-01-12",
        status: "Active",
      }
    }
  })()
  
  function onUpdate() {
    const existing = readUnits()
    const next = existing.map((r) => {
      if (String(r.id) !== id) return r
      return {
        ...r,
        unitName: String(model.value.unitName || "").trim(),
        unitType: String(model.value.unitType || "").trim(),
        totalOfficers: String(model.value.totalOfficers || "").trim(),
        unitHead: String(model.value.unitHead || "").trim(),
        dateCreated: String(model.value.dateCreated || "").trim(),
        status: String(model.value.status || "").trim(),
      }
    })
  
    writeUnits(next)
    router.push({ name: "dc-division-units" })
  }
  
  function onCancel() {
    router.push({ name: "dc-division-units" })
  }
  </script>
  