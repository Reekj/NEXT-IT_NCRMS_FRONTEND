<template>
    <StateCommandLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">Lagos</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">Add Division Unit</h2>
        </div>
  
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Name</label>
              <input v-model="model.unitName" type="text" class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Type</label>
              <input v-model="model.unitType" type="text" class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Total Officers</label>
              <div class="relative">
                <select v-model="model.totalOfficers" class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                  outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10">
                  <option value="">Select...</option>
                  <option v-for="n in officerOptions" :key="n" :value="String(n)">{{ n }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit Head</label>
              <div class="relative">
                <select v-model="model.unitHead" class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                  outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10">
                  <option value="">Select...</option>
                  <option v-for="h in headOptions" :key="h" :value="h">{{ h }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Date Created</label>
              <div class="relative">
                <input v-model="model.dateCreated" type="date" class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                  outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
                <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
              <div class="relative">
                <select v-model="model.status" class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                  outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10">
                  <option value="">Select...</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
          </div>
  
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <Motion as="button" type="button" :whileHover="{ scale: 1.02 }" :whileTap="{ scale: 0.98 }" @click="onSave"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm">
              Save
            </Motion>
  
            <Motion as="button" type="button" :whileHover="{ scale: 1.02 }" :whileTap="{ scale: 0.98 }" @click="onCancel"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                     shadow-sm hover:bg-[#F9FAFB]">
              Cancel
            </Motion>
          </div>
        </div>
      </Motion>
    </StateCommandLayout>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown } from "lucide-vue-next"
  import StateCommandLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const STORAGE_KEY = "ncrms_sc_division_units"
  const STORAGE_EVENT = "ncrms-sc-division-units-updated"
  
  const officerOptions = Array.from({ length: 30 }, (_, i) => i + 1)
  const headOptions = ["Micheal Jackson", "A. Kehinde", "S. Ibrahim", "T. Okafor"]
  
  const model = ref({
    unitName: "",
    unitType: "",
    totalOfficers: "",
    unitHead: "",
    dateCreated: "",
    status: "",
  })
  
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
  
  function nextId(existing) {
    const nums = existing
      .map((r) => String(r.id || ""))
      .map((id) => (id.match(/^DU-(\d+)$/)?.[1] ? Number(id.match(/^DU-(\d+)$/)[1]) : 0))
    const max = nums.length ? Math.max(...nums) : 0
    return `DU-${String(max + 1).padStart(3, "0")}`
  }
  
  function onSave() {
    const existing = readUnits()
    const payload = {
      id: nextId(existing),
      unitName: String(model.value.unitName || "").trim(),
      unitType: String(model.value.unitType || "").trim(),
      totalOfficers: String(model.value.totalOfficers || "").trim(),
      unitHead: String(model.value.unitHead || "").trim(),
      dateCreated: String(model.value.dateCreated || "").trim(),
      status: String(model.value.status || "").trim(),
    }
    writeUnits([payload, ...existing])
    router.push({ name: "sc-division-units" })
  }
  
  function onCancel() {
    router.push({ name: "sc-division-units" })
  }
  </script>
  