<!-- src/pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficerCreate.vue -->
<template>
    <ZonalCoordinatorLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">South-West</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">Add Zonal Officer</h2>
        </div>
  
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Full Name</label>
              <input
                v-model="model.fullName"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Badge ID</label>
              <input
                v-model="model.badgeId"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Assigned State</label>
              <input
                v-model="model.assignedState"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
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
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Phone Number</label>
              <input
                v-model="model.phone"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
          </div>
  
          <!-- Permissions -->
          <div class="mt-10 border-t border-black/10 pt-8">
            <div class="text-[18px] font-medium text-[#111827]">Permissions</div>
  
            <div class="mt-6 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              <label v-for="p in permissionItems" :key="p.key" class="flex items-center gap-3 text-[14px] text-[#111827]">
                <input
                  v-model="model.permissions[p.key]"
                  type="checkbox"
                  class="h-4 w-4 rounded border-black/20 text-[#0A2395] focus:ring-[#0A2395]/20"
                />
                <span>{{ p.label }}</span>
              </label>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="onSave"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
            >
              Save
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
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../layout/Layout.vue"
  
  const STORAGE_KEY = "zc_zonal_officers"
  const router = useRouter()
  
  const permissionItems = [
    { key: "staffDirectoryView", label: "Staff Directory - View" },
    { key: "staffDirectoryAddEdit", label: "Staff Directory - Add/Edit" },
    { key: "staffReportView", label: "Staff Report - View" },
    { key: "staffReportGenerate", label: "Staff Report - Generate" },
    { key: "criminalRecordView", label: "Criminal Record - View" },
    { key: "criminalRecordGenerate", label: "Criminal Record - Generate" },
    { key: "incidentReportView", label: "Incident Report - View" },
    { key: "incidentReportGenerate", label: "Incident Report - Generate" },
  ]
  
  function blankPermissions() {
    return {
      staffDirectoryView: false,
      staffDirectoryAddEdit: false,
      staffReportView: false,
      staffReportGenerate: false,
      criminalRecordView: false,
      criminalRecordGenerate: false,
      incidentReportView: false,
      incidentReportGenerate: false,
    }
  }
  
  const model = ref({
    fullName: "",
    badgeId: "",
    assignedState: "",
    phone: "",
    dateCreated: "",
    permissions: blankPermissions(),
  })
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
  
  function onSave() {
    const list = safeRead()
  
    const badgeId = String(model.value.badgeId || "").trim()
    const fullName = String(model.value.fullName || "").trim()
  
    if (!badgeId || !fullName) {
      alert("Please fill in Full Name and Badge ID.")
      return
    }
  
    const record = {
      id: badgeId,
      fullName,
      badgeId,
      assignedState: String(model.value.assignedState || "").trim(),
      phone: String(model.value.phone || "").trim(),
      dateCreated: String(model.value.dateCreated || "").trim(),
      permissions: { ...blankPermissions(), ...(model.value.permissions || {}) },
    }
  
    const idx = list.findIndex((r) => r.id === record.id)
    if (idx >= 0) list[idx] = record
    else list.unshift(record)
  
    safeWrite(list)
    router.push({ name: "zc-zonal-officers" })
  }
  
  function onCancel() {
    router.push({ name: "zc-zonal-officers" })
  }
  </script>
  