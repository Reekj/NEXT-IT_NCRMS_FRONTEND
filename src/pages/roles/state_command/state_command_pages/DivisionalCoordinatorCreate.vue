<template>
    <StateCommandLayout :user="user">
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">LAGOS</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">Add Coordinator</h2>
        </div>
  
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Full Name</label>
              <input v-model="model.fullName" type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Coordinator ID</label>
              <input v-model="model.coordinatorId" type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Zone</label>
              <div class="relative">
                <select v-model="model.zone"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10">
                  <option value="">Select...</option>
                  <option v-for="z in zones" :key="z" :value="z">{{ z }}</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Assigned Division</label>
              <input v-model="model.assignedDivision" type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Phone No.</label>
              <input v-model="model.phone" type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Email Address</label>
              <input v-model="model.email" type="email"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
              <div class="relative">
                <select v-model="model.status"
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10">
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
                <input v-model="model.dateCreated" type="date"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10" />
                <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
              </div>
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
    </StateCommandLayout>
  </template>
  
  <script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import { Calendar, ChevronDown } from "lucide-vue-next"
import StateCommandLayout from "../layout/Layout.vue"

/** same sync pattern as Edit/View */
const DIV_COORDS_KEY = "ncrms_sc_divisional_coordinators"
const DIV_COORDS_EVENT = "ncrms-sc-divisional-coordinators-updated"

function safeRead() {
  try {
    const raw = localStorage.getItem(DIV_COORDS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeWrite(next) {
  localStorage.setItem(DIV_COORDS_KEY, JSON.stringify(Array.isArray(next) ? next : []))
  window.dispatchEvent(new CustomEvent(DIV_COORDS_EVENT))
}

const router = useRouter()

const user = ref({
  name: "Helena John",
  role: "State Command",
  avatarUrl: "",
})

const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"]

const model = ref({
  fullName: "",
  coordinatorId: "",
  zone: "",
  assignedDivision: "",
  phone: "",
  email: "",
  status: "",
  dateCreated: "",
})

function uid() {
  return `dc-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
}

function onSave() {
  const list = safeRead()

  const next = {
    id: uid(),
    ...model.value,
    dateCreated: model.value.dateCreated || new Date().toISOString().slice(0, 10),
    status: model.value.status || "Active",
  }

  safeWrite([next, ...list])
  router.push({ path: "/state-command/divisional-coordinators" })
}

function onCancel() {
  router.push({ path: "/state-command/divisional-coordinators" })
}
</script>
