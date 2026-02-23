<!-- src/pages/roles/headquarters/headquarters_pages/DivisionsLocations.vue -->
<template>
    <HeadquartersLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
        class="space-y-6"
      >
        <div class="flex items-center justify-between gap-4">
          <h1 class="text-[22px] font-semibold tracking-tight text-black">Divisions & Operations</h1>
        </div>
  
        <Motion
          tag="div"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <!-- Header controls (Search + refresh) -->
          <div
            class="flex flex-col gap-4 border-b border-black/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
          >
            <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div class="relative w-full sm:w-[280px]">
                <Search
                  class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 sm:h-4 sm:w-4"
                />
                <input
                  v-model.trim="search"
                  type="text"
                  placeholder="Search ..."
                  class="h-11 w-full rounded-xl border border-black/10 bg-white pl-11 pr-3 text-[14px]
                         text-black/70 outline-none placeholder:text-black/35
                         focus:border-black/20 focus:ring-4 focus:ring-black/5 sm:h-10 sm:rounded-lg sm:text-[13px]"
                />
              </div>
  
              <Motion
                tag="button"
                type="button"
                class="grid h-11 w-full place-items-center rounded-xl border border-black/10 bg-white text-black/55
                       transition hover:bg-black/5 sm:h-10 sm:w-10 sm:rounded-lg"
                aria-label="Refresh"
                @click="onRefresh"
                :whileHover="{ scale: 1.03 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.14 }"
              >
                <RotateCw class="h-5 w-5 sm:h-4 sm:w-4" />
              </Motion>
            </div>
  
            <div class="hidden sm:block text-[13px] text-black/45">
              Showing <span class="font-semibold text-black/70">{{ pagedRows.length }}</span> of
              <span class="font-semibold text-black/70">{{ filteredAll.length }}</span>
            </div>
          </div>
  
          <!-- MOBILE: big card list -->
          <div class="sm:hidden p-5 space-y-4">
            <Motion
              v-for="row in pagedRows"
              :key="row.id"
              tag="div"
              class="rounded-2xl border border-black/10 bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
              :initial="{ opacity: 0, y: 10 }"
              :animate="{ opacity: 1, y: 0 }"
              :whileHover="{ y: -2 }"
              :transition="{ duration: 0.18, easing: 'ease-out' }"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-[14px] font-semibold text-black/85">{{ row.division }}</div>
                  <div class="mt-1 text-[13px] text-black/60">{{ row.zone }}</div>
                </div>
                <div class="text-[13px] font-semibold text-black/70">{{ row.state }}</div>
              </div>
  
              <div class="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">State</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.state }}</div>
                </div>
  
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">LGA</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.lga }}</div>
                </div>
              </div>
            </Motion>
  
            <div v-if="filteredAll.length === 0" class="py-10 text-center">
              <div class="text-[14px] font-semibold text-black">No Records</div>
              <div class="mt-2 text-[13px] text-black/60">No matching divisions found.</div>
            </div>
          </div>
  
          <!-- DESKTOP/TABLET: table -->
          <div class="hidden sm:block">
            <div class="overflow-x-auto">
              <table class="min-w-[980px] w-full border-collapse">
                <thead>
                  <tr class="bg-white">
                    <th class="thCell">Division</th>
                    <th class="thCell">Zone</th>
                    <th class="thCell">State</th>
                    <th class="thCell thCell--last">LGA</th>
                  </tr>
                </thead>
  
                <Motion
                  tag="tbody"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  :transition="{ staggerChildren: 0.04 }"
                >
                  <Motion
                    v-for="row in pagedRows"
                    :key="row.id"
                    tag="tr"
                    class="hover:bg-black/[0.01]"
                    :initial="{ opacity: 0, y: 6 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :whileHover="{ y: -1 }"
                    :transition="{ duration: 0.16, easing: 'ease-out' }"
                  >
                    <td class="tdCell font-semibold text-black/70">{{ row.division }}</td>
                    <td class="tdCell">{{ row.zone }}</td>
                    <td class="tdCell">{{ row.state }}</td>
                    <td class="tdCell tdCell--last">{{ row.lga }}</td>
                  </Motion>
  
                  <tr v-if="filteredAll.length === 0">
                    <td class="tdCell tdCell--last text-center text-black/50" colspan="4">
                      No records found.
                    </td>
                  </tr>
                </Motion>
              </table>
            </div>
          </div>
  
          <!-- Pagination -->
          <div class="flex items-center justify-center px-5 py-6 sm:px-7">
            <div class="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white">
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-10 items-center gap-2 border-r border-black/10 px-4 text-[13px] text-black/60
                       hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
                @click="prevPage"
                :disabled="page === 1"
                :whileHover="page === 1 ? {} : { scale: 1.02 }"
                :whileTap="page === 1 ? {} : { scale: 0.96 }"
                :transition="{ duration: 0.12 }"
              >
                <ChevronLeft class="h-4 w-4" />
                Previous
              </Motion>
  
              <Motion
                v-for="p in pageButtons"
                :key="p.key"
                tag="button"
                type="button"
                class="h-10 min-w-10 border-r border-black/10 px-3 text-[13px] text-black/60
                       hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                :class="p.type === 'page' && p.value === page ? 'bg-black/[0.03] text-black' : ''"
                :disabled="p.type === 'dots'"
                @click="p.type === 'page' ? (page = p.value) : null"
                :whileHover="p.type === 'dots' ? {} : { scale: 1.03 }"
                :whileTap="p.type === 'dots' ? {} : { scale: 0.95 }"
                :transition="{ duration: 0.1 }"
              >
                {{ p.label }}
              </Motion>
  
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-10 items-center gap-2 px-4 text-[13px] text-black/60 hover:bg-black/5
                       disabled:cursor-not-allowed disabled:opacity-50"
                @click="nextPage"
                :disabled="page === totalPages"
                :whileHover="page === totalPages ? {} : { scale: 1.02 }"
                :whileTap="page === totalPages ? {} : { scale: 0.96 }"
                :transition="{ duration: 0.12 }"
              >
                Next
                <ChevronRight class="h-4 w-4" />
              </Motion>
            </div>
          </div>
        </Motion>
      </Motion>
    </HeadquartersLayout>
  </template>
  
  <script setup>
  import { computed, ref, watch } from "vue";
  import { Motion } from "@motionone/vue";
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Search, RotateCw, ChevronLeft, ChevronRight } from "lucide-vue-next";
  
  const user = {
    name: "Helena John",
    role: "Headquarters",
    avatarUrl: "",
  };
  
  const search = ref("");
  const page = ref(1);
  const pageSize = 9;
  
  const rows = ref([
    { id: "1", division: "Operations", zone: "Zone 1", state: "Lagos", lga: "Ikeja" },
    { id: "2", division: "Intelligence", zone: "Zone 2", state: "Kano", lga: "Nasarawa" },
    { id: "3", division: "Forensic Services", zone: "Zone 3", state: "Lagos", lga: "Ikeja" },
    { id: "4", division: "Special Crimes", zone: "Zone 4", state: "Lagos", lga: "Ikeja" },
    { id: "5", division: "Legal & Compliance", zone: "Zone 5", state: "Lagos", lga: "Ikeja" },
    { id: "6", division: "Special Crimes", zone: "Zone 6", state: "Lagos", lga: "Ikeja" },
    { id: "7", division: "Criminal Investigation", zone: "Zone 7", state: "Lagos", lga: "Ikeja" },
    { id: "8", division: "Criminal Investigation", zone: "Zone 8", state: "Lagos", lga: "Ikeja" },
    { id: "9", division: "Intelligence", zone: "Zone 9", state: "Lagos", lga: "Ikeja" },
    { id: "10", division: "Operations", zone: "Zone 10", state: "Abuja", lga: "Gwagwalada" },
    { id: "11", division: "Forensic Services", zone: "Zone 11", state: "Rivers", lga: "Obio/Akpor" },
    { id: "12", division: "Legal & Compliance", zone: "Zone 12", state: "Oyo", lga: "Ibadan North" },
  ]);
  
  const filteredAll = computed(() => {
    const q = String(search.value || "").trim().toLowerCase();
    if (!q) return rows.value;
  
    return rows.value.filter((r) => {
      const hay = `${r.division} ${r.zone} ${r.state} ${r.lga}`.toLowerCase();
      return hay.includes(q);
    });
  });
  
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredAll.value.length / pageSize)));
  
  const pagedRows = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredAll.value.slice(start, start + pageSize);
  });
  
  watch(
    () => search.value,
    () => {
      page.value = 1;
    }
  );
  
  watch(
    () => filteredAll.value.length,
    () => {
      page.value = Math.min(page.value, totalPages.value);
      if (page.value < 1) page.value = 1;
    }
  );
  
  const pageButtons = computed(() => {
    const last = totalPages.value;
    const btns = [];
  
    const addPage = (n) => btns.push({ key: `p-${n}`, type: "page", value: n, label: String(n) });
    const addDots = (key) => btns.push({ key, type: "dots", value: null, label: "..." });
  
    addPage(1);
    if (last >= 2) addPage(2);
    if (last >= 3) addPage(3);
    if (last >= 4) addPage(4);
  
    if (last > 6) addDots("dots-1");
  
    if (last >= 2) addPage(Math.max(5, last - 1));
    if (last >= 1) addPage(last);
  
    return btns;
  });
  
  function prevPage() {
    page.value = Math.max(1, page.value - 1);
  }
  function nextPage() {
    page.value = Math.min(totalPages.value, page.value + 1);
  }
  
  function onRefresh() {
    // UI-only placeholder: keep the interaction identical across HQ pages
    page.value = 1;
  }
  </script>
  
  <style scoped>
  /* FULL grid lines (vertical + horizontal) like Figma */
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.55);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(0, 0, 0, 0.02);
  }
  
  .thCell--last {
    border-right: none;
  }
  
  .tdCell {
    height: 64px;
    padding: 0 18px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.72);
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    border-right: 1px solid rgba(0, 0, 0, 0.10);
    vertical-align: middle;
    background: #fff;
  }
  
  .tdCell--last {
    border-right: none;
  }
  </style>
  