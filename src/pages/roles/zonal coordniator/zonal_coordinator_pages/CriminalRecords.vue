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
          <h1 class="text-[22px] font-semibold tracking-tight text-black">Criminal Records</h1>
        </div>
  
        <Motion
          tag="div"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <!-- Header controls (search + refresh left) -->
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
  
          <!-- MOBILE: card list -->
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
                  <div class="text-[15px] font-semibold text-black/85">
                    {{ row.criminalRecordId }}
                  </div>
                  <div class="mt-1 text-[14px] font-semibold text-black truncate">
                    {{ row.fullName }}
                  </div>
                  <div class="mt-1 text-[13px] text-black/60">
                    <span class="font-medium text-black/70">{{ row.crimeType }}</span>
                    <span class="mx-2 text-black/30">•</span>
                    <span>{{ row.zone }}</span>
                  </div>
                </div>
  
                <Motion
                  tag="span"
                  class="inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-[12px] font-semibold"
                  :class="statusPill(row.status)"
                  :whileTap="{ scale: 0.98 }"
                  :transition="{ duration: 0.12 }"
                >
                  {{ row.status || "—" }}
                </Motion>
              </div>
  
              <div class="mt-4 grid grid-cols-2 gap-3 text-[13px]">
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">Division</div>
                  <div class="mt-1 font-semibold text-black/80 truncate">{{ row.division }}</div>
                </div>
                <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                  <div class="text-black/45 text-[12px] font-medium">Date Reported</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.dateReported }}</div>
                </div>
              </div>
  
              <div class="mt-3 grid grid-cols-2 gap-3 text-[13px]">
                <div class="rounded-xl border border-black/10 bg-white p-3">
                  <div class="text-black/45 text-[12px] font-medium">State Command</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.stateCommand }}</div>
                </div>
                <div class="rounded-xl border border-black/10 bg-white p-3">
                  <div class="text-black/45 text-[12px] font-medium">LGA</div>
                  <div class="mt-1 font-semibold text-black/80">{{ row.lga }}</div>
                </div>
              </div>
  
              <!-- View only -->
              <div class="mt-4 flex items-center justify-end">
                <Motion
                  tag="button"
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2
                         text-[13px] font-semibold text-black/70 hover:bg-black/5"
                  @click="goView(row)"
                  :whileHover="{ scale: 1.02 }"
                  :whileTap="{ scale: 0.98 }"
                  :transition="{ duration: 0.12 }"
                >
                  <Eye class="h-4 w-4 text-black/60" />
                  View
                </Motion>
              </div>
            </Motion>
  
            <div v-if="filteredAll.length === 0" class="py-10 text-center">
              <div class="text-[14px] font-semibold text-black">No Criminal Records</div>
              <div class="mt-2 text-[13px] text-black/60">No records found.</div>
            </div>
          </div>
  
          <!-- DESKTOP/TABLET: table -->
          <div class="hidden sm:block">
            <div class="overflow-x-auto">
              <table class="min-w-[1280px] w-full border-collapse">
                <thead>
                  <tr class="bg-white">
                    <th class="thCell">Criminal Record ID</th>
                    <th class="thCell">Full Name</th>
                    <th class="thCell">Crime Type</th>
                    <th class="thCell">Zone</th>
                    <th class="thCell">State Command</th>
                    <th class="thCell">Division</th>
                    <th class="thCell">LGA</th>
                    <th class="thCell">Date Reported</th>
                    <th class="thCell">Status</th>
                    <th class="thCell thCell--last">Action</th>
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
                    <td class="tdCell font-semibold text-black/80">{{ row.criminalRecordId }}</td>
                    <td class="tdCell font-semibold text-black/70">{{ row.fullName }}</td>
                    <td class="tdCell">{{ row.crimeType }}</td>
                    <td class="tdCell">{{ row.zone }}</td>
                    <td class="tdCell">{{ row.stateCommand }}</td>
                    <td class="tdCell">{{ row.division }}</td>
                    <td class="tdCell">{{ row.lga }}</td>
                    <td class="tdCell">{{ row.dateReported }}</td>
  
                    <td class="tdCell">
                      <Motion
                        tag="span"
                        class="inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-semibold"
                        :class="statusPill(row.status)"
                        :whileHover="{ scale: 1.03 }"
                        :whileTap="{ scale: 0.98 }"
                        :transition="{ duration: 0.12 }"
                      >
                        {{ row.status || "—" }}
                      </Motion>
                    </td>
  
                    <!-- View only -->
                    <td class="tdCell tdCell--last">
                      <div class="flex items-center justify-center">
                        <Motion
                          tag="button"
                          type="button"
                          class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                          title="View"
                          @click="goView(row)"
                          :whileHover="{ scale: 1.08 }"
                          :whileTap="{ scale: 0.95 }"
                          :transition="{ duration: 0.12 }"
                        >
                          <Eye class="h-4 w-4 text-black/55" />
                        </Motion>
                      </div>
                    </td>
                  </Motion>
  
                  <tr v-if="filteredAll.length === 0">
                    <td class="tdCell tdCell--last text-center text-black/50" colspan="10">
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
  import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
  import { Motion } from "@motionone/vue";
  import { useRoute, useRouter } from "vue-router";
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Search, RotateCw, ChevronLeft, ChevronRight, Eye } from "lucide-vue-next";
  
  const router = useRouter();
  const route = useRoute();
  
  const user = { name: "Helena John", role: "Headquarters", avatarUrl: "" };
  
  const search = ref("");
  const page = ref(1);
  const pageSize = 9;
  
  // ✅ Officer is the source of truth for criminal records (as you requested)
  const CR_KEY = "ncrms_officer_criminal_records";
  const CR_EVENT = "ncrms-officer-criminal-records-updated";
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(CR_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  
  // local table state (HQ view)
  const rows = ref([]);
  
  function syncRows() {
    rows.value = safeRead();
    page.value = Math.min(page.value, totalPages.value);
    if (page.value < 1) page.value = 1;
  }
  
  // ✅ View-only navigation for HQ
  function goView(row) {
    // Use a Headquarters route for the view screen (recommended)
    // Create this page later if it doesn't exist yet.
    router.push({ path: `/headquarters/criminal-records/${row.id}` });
  }
  
  const filteredAll = computed(() => {
    const q = String(search.value || "").trim().toLowerCase();
    if (!q) return rows.value;
  
    return rows.value.filter((r) => {
      const hay = [
        r.criminalRecordId,
        r.fullName,
        r.crimeType,
        r.zone,
        r.stateCommand,
        r.division,
        r.lga,
        r.dateReported,
        r.status,
      ]
        .join(" ")
        .toLowerCase();
  
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
  
  // refresh when returning / when route changes
  watch(
    () => route.fullPath,
    () => {
      syncRows();
    }
  );
  
  function prevPage() {
    page.value = Math.max(1, page.value - 1);
  }
  function nextPage() {
    page.value = Math.min(totalPages.value, page.value + 1);
  }
  
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
  
  function onRefresh() {
    syncRows();
  }
  
  // listen to Officer updates
  function onUpdated() {
    syncRows();
  }
  
  function statusPill(status) {
    const s = String(status || "").toLowerCase();
    if (s === "open") return "border-green-200 bg-green-50 text-green-700";
    if (s === "closed") return "border-[#98A2B3] bg-[#F2F4F7] text-[#667085]";
    return "border-orange-200 bg-orange-50 text-orange-700";
  }
  
  onMounted(() => {
    syncRows();
    window.addEventListener(CR_EVENT, onUpdated);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener(CR_EVENT, onUpdated);
  });
  </script>
  
  <style scoped>
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