<template>
    <ZonalCoordinatorLayout>
      <!-- Zone label (top-left like Figma) -->
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">South-West</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <!-- Title -->
        <div class="px-6 pt-7 sm:px-8">
          <h1 class="text-[22px] font-semibold text-[#111827]">State Commands</h1>
        </div>
  
        <!-- Toolbar -->
        <div class="flex flex-col gap-4 px-6 pb-6 pt-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="relative w-full max-w-[320px]">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
              <input
                v-model="q"
                type="text"
                placeholder="Search ..."
                class="h-10 w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 text-[13px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <!-- Refresh -->
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="onRefresh"
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-[#F9FAFB]"
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshCw class="h-4 w-4 text-[#111827]" />
            </Motion>
          </div>
  
          <!-- New -->
          <Motion
            as="button"
            type="button"
            :whileHover="{ scale: 1.02 }"
            :whileTap="{ scale: 0.98 }"
            @click="goNew"
            class="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-[13px] font-semibold text-white
                   bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
          >
            <UserPlus class="h-4 w-4" />
            New
          </Motion>
        </div>
  
        <!-- Desktop table -->
        <div class="hidden overflow-x-auto px-6 pb-6 sm:px-8 lg:block">
          <table class="w-full table-fixed border border-[#D9D9D9] text-left">
            <thead class="bg-[#FAFAFA]">
              <tr>
                <th
                  v-for="(h, idx) in headers"
                  :key="h"
                  class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]"
                  :class="idx === headers.length - 1 ? 'border-r-0' : ''"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="bg-white hover:bg-[#FBFBFD]">
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.stateName }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.stateId }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.zone }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.totalLgas }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.commissioner }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.phone }}
                </td>
  
                <!-- Status -->
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  <span
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
                    :class="row.status === 'Active'
                      ? 'border-[#16A34A] bg-[#ECFDF3] text-[#16A34A]'
                      : 'border-[#98A2B3] bg-[#F2F4F7] text-[#667085]'"
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="row.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#98A2B3]'"
                    />
                    {{ row.status }}
                  </span>
                </td>
  
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.dateCreated }}
                </td>
  
                <!-- Actions (last column no right border) -->
                <td class="border-b border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  <div class="flex items-center gap-4">
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="goView(row.id)"
                      title="View"
                      aria-label="View"
                    >
                      <Eye class="h-4 w-4" />
                    </button>
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="goEdit(row.id)"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <Pencil class="h-4 w-4" />
                    </button>
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="onDelete(row.id)"
                      title="Delete"
                      aria-label="Delete"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Mobile cards -->
        <div class="space-y-4 px-6 pb-6 sm:px-8 lg:hidden">
          <Motion
            v-for="row in filteredRows"
            :key="row.id"
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.25 }"
            class="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-[14px] font-semibold text-[#111827]">{{ row.stateName }}</div>
                <div class="mt-1 text-[12px] text-[#667085]">{{ row.stateId }} • {{ row.zone }}</div>
              </div>
  
              <span
                class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
                :class="row.status === 'Active'
                  ? 'border-[#16A34A] bg-[#ECFDF3] text-[#16A34A]'
                  : 'border-[#98A2B3] bg-[#F2F4F7] text-[#667085]'"
              >
                <span class="h-2 w-2 rounded-full" :class="row.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#98A2B3]'" />
                {{ row.status }}
              </span>
            </div>
  
            <div class="mt-4 grid grid-cols-2 gap-3 text-[12px]">
              <div>
                <div class="text-[#667085]">Total LGAs</div>
                <div class="font-medium text-[#111827]">{{ row.totalLgas }}</div>
              </div>
              <div>
                <div class="text-[#667085]">Date Created</div>
                <div class="font-medium text-[#111827]">{{ row.dateCreated }}</div>
              </div>
              <div class="col-span-2">
                <div class="text-[#667085]">Commissioner</div>
                <div class="font-medium text-[#111827]">{{ row.commissioner }}</div>
              </div>
              <div class="col-span-2">
                <div class="text-[#667085]">Phone No.</div>
                <div class="font-medium text-[#111827]">{{ row.phone }}</div>
              </div>
            </div>
  
            <div class="mt-4 flex items-center gap-3">
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="goView(row.id)"
              >
                <Eye class="h-4 w-4" /> View
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="goEdit(row.id)"
              >
                <Pencil class="h-4 w-4" /> Edit
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="onDelete(row.id)"
              >
                <Trash2 class="h-4 w-4" /> Delete
              </Motion>
            </div>
          </Motion>
        </div>
  
        <!-- Pagination -->
        <div class="px-6 pb-7 sm:px-8">
          <div class="flex justify-center">
            <div class="inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">‹ Previous</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">1</button>
              <button class="bg-[#F2F4F7] px-3 py-2 text-[13px] text-[#111827]">2</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">3</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">4</button>
              <span class="px-3 py-2 text-[13px] text-[#667085]">…</span>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">13</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">14</button>
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">Next ›</button>
            </div>
          </div>
        </div>
      </Motion>
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { computed, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Eye, Pencil, RefreshCw, Search, Trash2, UserPlus } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../../zonal coordniator/layout/Layout.vue"
  
  const router = useRouter()
  const q = ref("")
  
  const headers = [
    "State Name",
    "State ID",
    "Zone",
    "Total LGAs",
    "Commissioner",
    "Phone No.",
    "Status",
    "Date Created",
    "Actions",
  ]
  
  const rows = ref([
    { id: "Z01-01-A", stateName: "Oyo State", stateId: "Z01-01", zone: "SW Zone", totalLgas: "22", commissioner: "A. Johnson", phone: "07010001020", status: "Active", dateCreated: "12 Jan 2025" },
    { id: "Z01-02-A", stateName: "Osun State", stateId: "Z01-02", zone: "SW Zone", totalLgas: "20", commissioner: "K. Adeyemi", phone: "07010001020", status: "Inactive", dateCreated: "12 Jan 2025" },
    { id: "Z01-03-A", stateName: "Lagos State", stateId: "Z01-03", zone: "SW Zone", totalLgas: "20", commissioner: "P. Daniel", phone: "07010001020", status: "Active", dateCreated: "12 Jan 2025" },
    { id: "Z01-04-A", stateName: "Ogun State", stateId: "Z01-04", zone: "SW Zone", totalLgas: "19", commissioner: "Usman K.", phone: "07010001020", status: "Inactive", dateCreated: "12 Jan 2025" },
    { id: "Z01-01-B", stateName: "Oyo State", stateId: "Z01-01", zone: "SW Zone", totalLgas: "22", commissioner: "Phillip J.", phone: "07010001020", status: "Active", dateCreated: "12 Jan 2025" },
    { id: "Z01-02-B", stateName: "Osun State", stateId: "Z01-02", zone: "SW Zone", totalLgas: "22", commissioner: "O. Adedoyin", phone: "07010001020", status: "Active", dateCreated: "12 Jan 2025" },
    { id: "Z01-03-B", stateName: "Lagos State", stateId: "Z01-03", zone: "SW Zone", totalLgas: "19", commissioner: "Phillip J.", phone: "07010001020", status: "Inactive", dateCreated: "12 Jan 2025" },
    { id: "Z01-04-B", stateName: "Ogun State", stateId: "Z01-04", zone: "SW Zone", totalLgas: "22", commissioner: "O. Adedoyin", phone: "07010001020", status: "Inactive", dateCreated: "12 Jan 2025" },
    { id: "Z01-04-C", stateName: "Ogun State", stateId: "Z01-04", zone: "SW Zone", totalLgas: "19", commissioner: "K. Adeyemi", phone: "07010001020", status: "Active", dateCreated: "12 Jan 2025" },
  ])
  
  const filteredRows = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return rows.value
    return rows.value.filter((r) => {
      return (
        r.stateName.toLowerCase().includes(s) ||
        r.stateId.toLowerCase().includes(s) ||
        r.zone.toLowerCase().includes(s) ||
        r.commissioner.toLowerCase().includes(s) ||
        r.phone.toLowerCase().includes(s) ||
        r.status.toLowerCase().includes(s) ||
        r.dateCreated.toLowerCase().includes(s)
      )
    })
  })
  
  function onRefresh() {
    q.value = ""
  }
  
  function goNew() {
    router.push({ name: "zc-state-commands-create" })
  }
  function goView(id) {
    router.push({ name: "zc-state-commands-view", params: { id } })
  }
  function goEdit(id) {
    router.push({ name: "zc-state-commands-edit", params: { id } })
  }
  function onDelete(id) {
    rows.value = rows.value.filter((r) => r.id !== id)
  }
  </script>
  