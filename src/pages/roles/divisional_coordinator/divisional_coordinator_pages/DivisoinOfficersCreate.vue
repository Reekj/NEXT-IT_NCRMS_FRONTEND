<template>
    <DivisionalCoordinatorLayout :user="user">
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">Surulere Division</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">Add Division Officer</h2>
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
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Division ID</label>
              <input
                v-model="model.divisionId"
                type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Rank</label>
              <div class="relative">
                <select
                  v-model="model.rank"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option value="">Select...</option>
                  <option v-for="r in ranks" :key="r" :value="r">{{ r }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Role</label>
              <div class="relative">
                <select
                  v-model="model.role"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option value="">Select...</option>
                  <option v-for="r in roles" :key="r" :value="r">{{ r }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit</label>
              <input
                v-model="model.unit"
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
                  <option value="Suspended">Suspended</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
          </div>
  
          <!-- Permissions -->
          <div class="mt-12">
            <div class="text-[18px] font-medium text-[#111827]">Permissions</div>
            <div class="mt-6 border-t border-black/10" />
  
            <div class="mt-8 grid grid-cols-1 gap-y-10 md:grid-cols-4">
              <label v-for="p in permissions" :key="p" class="flex items-center gap-3 text-[14px] text-[#111827]">
                <input type="checkbox" v-model="model.permissions" :value="p" class="h-4 w-4" />
                {{ p }}
              </label>
            </div>
          </div>
  
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
    </DivisionalCoordinatorLayout>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { ChevronDown } from "lucide-vue-next"
  import DivisionalCoordinatorLayout from "../layout/Layout.vue"
  
  const OFFICERS_KEY = "ncrms_dc_division_officers"
  const OFFICERS_EVENT = "ncrms-dc-division-officers-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(OFFICERS_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function safeWrite(next) {
    localStorage.setItem(OFFICERS_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(OFFICERS_EVENT))
  }
  
  const router = useRouter()
  
  const user = ref({
    name: "Helena John",
    role: "Divisional Coordinator",
    avatarUrl: "",
  })
  
  const ranks = ["Sergeant", "Corporal", "Inspector"]
  const roles = ["Officer"]
  
  const permissions = [
    "Staff Directory - View",
    "Staff Directory - Add/Edit",
    "Staff Report - View",
    "Staff Report - Generate",
    "Criminal Record - View",
    "Criminal Record - Generate",
    "Incident Report - View",
    "Incident Report - Generate",
  ]
  
  const model = ref({
    fullName: "",
    divisionId: "",
    rank: "",
    role: "",
    unit: "",
    status: "",
    dateCreated: "",
    permissions: [],
  })
  
  function uid() {
    return `co-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  function onSave() {
    const list = safeRead()
  
    const next = {
      id: uid(),
      ...model.value,
      dateCreated: new Date().toISOString().slice(0, 10),
      status: model.value.status || "Active",
    }
  
    safeWrite([next, ...list])
    router.push({ path: "/divisional-coordinator/division-officers" })
  }
  
  function onCancel() {
    router.push({ path: "/divisional-coordinator/division-officers" })
  }
  </script>
  