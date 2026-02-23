<!-- src/pages/roles/zonal coordniator/zonal_coordinator_pages/ZonalOfficerEdit.vue -->
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
          <h2 class="text-[18px] font-semibold text-[#111827]">Edit Zonal Officer</h2>
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
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../layout/Layout.vue"
  
  const STORAGE_KEY = "zc_zonal_officers"
  
  const route = useRoute()
  const router = useRouter()
  const id = String(route.params.id || "")
  
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
  
  onMounted(() => {
    const list = safeRead()
    const found = list.find((r) => r.id === id)
    if (!found) {
      router.push({ name: "zc-zonal-officers" })
      return
    }
    model.value = {
      ...model.value,
      ...found,
      permissions: { ...blankPermissions(), ...(found.permissions || {}) },
    }
  })
  
  function onUpdate() {
    const list = safeRead()
    const idx = list.findIndex((r) => r.id === id)
    if (idx < 0) {
      router.push({ name: "zc-zonal-officers" })
      return
    }
  
    const nextBadgeId = String(model.value.badgeId || "").trim() || id
    const nextId = nextBadgeId
  
    const updated = {
      ...list[idx],
      id: nextId,
      fullName: String(model.value.fullName || "").trim(),
      badgeId: nextBadgeId,
      assignedState: String(model.value.assignedState || "").trim(),
      phone: String(model.value.phone || "").trim(),
      dateCreated: String(model.value.dateCreated || "").trim(),
      permissions: { ...blankPermissions(), ...(model.value.permissions || {}) },
    }
  
    // If badgeId changed and collides, overwrite that target
    const collideIdx = list.findIndex((r) => r.id === nextId)
    if (collideIdx >= 0 && collideIdx !== idx) list.splice(collideIdx, 1)
  
    list[idx] = updated
    safeWrite(list)
    router.push({ name: "zc-zonal-officers" })
  }
  
  function onCancel() {
    router.push({ name: "zc-zonal-officers" })
  }
  </script>
  