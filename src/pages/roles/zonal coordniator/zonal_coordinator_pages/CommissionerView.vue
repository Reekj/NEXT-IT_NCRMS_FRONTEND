<!-- src/pages/roles/zonal coordniator/zonal_coordinator_pages/CommissionerView.vue -->
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
          <h2 class="text-[18px] font-semibold text-[#111827]">View Commissioner</h2>
        </div>
  
        <div class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Full Name</label>
              <input v-model="model.fullName" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Commissioner ID</label>
              <input v-model="model.commissionerId" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Zone</label>
              <input v-model="model.zone" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Assigned State</label>
              <input v-model="model.assignedState" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Phone No.</label>
              <input v-model="model.phone" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Email Address</label>
              <input v-model="model.email" readonly type="text"
                class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#6B7280] outline-none" />
            </div>
  
            <div>
              <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
              <div class="relative">
                <select v-model="model.status" disabled
                  class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 pr-12 text-[14px] text-[#6B7280]
                         outline-none disabled:cursor-not-allowed">
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
                <input v-model="model.dateCreated" readonly type="date"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 pr-12 text-[14px] text-[#6B7280]
                         outline-none" />
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
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../layout/Layout.vue"
  
  const STORAGE_KEY = "zc_commissioners"
  
  const route = useRoute()
  const router = useRouter()
  const id = String(route.params.id || "")
  
  const model = ref({
    fullName: "",
    commissionerId: "",
    zone: "",
    assignedState: "",
    phone: "",
    email: "",
    status: "",
    dateCreated: "",
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
  
  onMounted(() => {
    const list = safeRead()
    const found = list.find((r) => r.id === id)
    if (!found) {
      router.push({ name: "zc-commissioners" })
      return
    }
    model.value = { ...model.value, ...found }
  })
  
  function onBack() {
    router.push({ name: "zc-commissioners" })
  }
  function goEdit() {
    router.push({ name: "zc-commissioners-edit", params: { id } })
  }
  </script>
  