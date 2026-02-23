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
          <h1 class="text-[22px] font-semibold tracking-tight text-black">HQ Officers</h1>
        </div>
  
        <Motion
          tag="div"
          class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
          :initial="{ opacity: 0, y: 10, scale: 0.99 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <!-- Header controls -->
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
  
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90 sm:h-10 sm:w-auto sm:rounded-lg sm:text-[13px]"
              @click="goNew"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              <UserPlus class="h-4 w-4 text-white" />
              New
            </Motion>
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
                  <div class="text-[14px] font-semibold text-black/85 truncate">{{ row.fullName }}</div>
                  <div class="mt-1 text-[13px] text-black/60 truncate">{{ row.email }}</div>
                  <div class="mt-1 text-[13px] text-black/60">{{ row.phone }}</div>
                </div>
  
                <div class="shrink-0 text-[12px] font-semibold text-black/60">
                  {{ row.dateCreated }}
                </div>
              </div>
  
              <div class="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-3">
                <div class="text-[12px] font-medium text-black/45">Permissions</div>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span
                    v-for="p in (row.permissions || []).slice(0, 4)"
                    :key="p"
                    class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-semibold text-black/70"
                  >
                    {{ permissionLabel(p) }}
                  </span>
                  <span
                    v-if="(row.permissions || []).length > 4"
                    class="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-[12px] font-semibold text-black/60"
                  >
                    +{{ (row.permissions || []).length - 4 }}
                  </span>
                </div>
              </div>
  
              <div class="mt-4 flex items-center justify-end gap-4">
                <Motion
                  tag="button"
                  type="button"
                  class="text-black/45 hover:text-black/70"
                  title="View"
                  @click="goView(row.id)"
                  :whileHover="{ scale: 1.12 }"
                  :whileTap="{ scale: 0.9 }"
                  :transition="{ duration: 0.12 }"
                >
                  <Eye class="h-5 w-5" />
                </Motion>
  
                <Motion
                  tag="button"
                  type="button"
                  class="text-black/45 hover:text-black/70"
                  title="Edit"
                  @click="goEdit(row.id)"
                  :whileHover="{ scale: 1.12 }"
                  :whileTap="{ scale: 0.9 }"
                  :transition="{ duration: 0.12 }"
                >
                  <Pencil class="h-5 w-5" />
                </Motion>
  
                <Motion
                  tag="button"
                  type="button"
                  class="text-black/45 hover:text-red-600"
                  title="Delete"
                  @click="removeRow(row.id)"
                  :whileHover="{ scale: 1.12 }"
                  :whileTap="{ scale: 0.9 }"
                  :transition="{ duration: 0.12 }"
                >
                  <Trash2 class="h-5 w-5" />
                </Motion>
              </div>
            </Motion>
  
            <div v-if="filteredAll.length === 0" class="py-10 text-center">
              <div class="text-[14px] font-semibold text-black">No HQ Officers</div>
              <div class="mt-2 text-[13px] text-black/60">
                Click <span class="font-medium">New</span> to create an HQ Officer.
              </div>
            </div>
          </div>
  
          <!-- DESKTOP/TABLET: table -->
          <div class="hidden sm:block">
            <div class="overflow-x-auto">
              <table class="min-w-[980px] w-full border-collapse">
                <thead>
                  <tr class="bg-white">
                    <th class="thCell">Full Name</th>
                    <th class="thCell">Email</th>
                    <th class="thCell">Phone</th>
                    <th class="thCell">Date Created</th>
                    <th class="thCell thCell--last">Actions</th>
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
                    <td class="tdCell font-semibold text-black/70">{{ row.fullName }}</td>
                    <td class="tdCell">{{ row.email }}</td>
                    <td class="tdCell">{{ row.phone }}</td>
                    <td class="tdCell">{{ row.dateCreated }}</td>
                    <td class="tdCell tdCell--last">
                      <div class="flex items-center gap-4">
                        <Motion
                          tag="button"
                          type="button"
                          class="text-black/40 hover:text-black/70"
                          title="View"
                          @click="goView(row.id)"
                          :whileHover="{ scale: 1.12 }"
                          :whileTap="{ scale: 0.9 }"
                          :transition="{ duration: 0.12 }"
                        >
                          <Eye class="h-4 w-4" />
                        </Motion>
  
                        <Motion
                          tag="button"
                          type="button"
                          class="text-black/40 hover:text-black/70"
                          title="Edit"
                          @click="goEdit(row.id)"
                          :whileHover="{ scale: 1.12 }"
                          :whileTap="{ scale: 0.9 }"
                          :transition="{ duration: 0.12 }"
                        >
                          <Pencil class="h-4 w-4" />
                        </Motion>
  
                        <Motion
                          tag="button"
                          type="button"
                          class="text-black/40 hover:text-red-600"
                          title="Delete"
                          @click="removeRow(row.id)"
                          :whileHover="{ scale: 1.12 }"
                          :whileTap="{ scale: 0.9 }"
                          :transition="{ duration: 0.12 }"
                        >
                          <Trash2 class="h-4 w-4" />
                        </Motion>
                      </div>
                    </td>
                  </Motion>
  
                  <tr v-if="filteredAll.length === 0">
                    <td class="tdCell tdCell--last text-center text-black/50" colspan="5">
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
  import { computed, onMounted, ref, watch } from "vue";
  import { Motion } from "@motionone/vue";
  import { useRoute, useRouter } from "vue-router";
  import HeadquartersLayout from "../layout/Layout.vue";
  import { Search, RotateCw, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, UserPlus } from "lucide-vue-next";
  
  const router = useRouter();
  const route = useRoute();
  
  const user = {
    name: "Helena John",
    role: "Headquarters",
    avatarUrl: "",
  };
  
  const STORAGE_KEY = "ncrms_headquarters_hq_officers";
  
  function readRows() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  
  function writeRows(next) {
    rows.value = next;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  
  const rows = ref([]);
  const search = ref("");
  
  const page = ref(1);
  const pageSize = 9;
  
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredAll.value.length / pageSize)));
  
  const filteredAll = computed(() => {
    const q = String(search.value || "").trim().toLowerCase();
    if (!q) return rows.value;
  
    return rows.value.filter((r) => {
      const hay = `${r.fullName} ${r.email} ${r.phone} ${r.dateCreated} ${(r.permissions || []).join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  });
  
  const pagedRows = computed(() => {
    const start = (page.value - 1) * pageSize;
    return filteredAll.value.slice(start, start + pageSize);
  });
  
  function syncRows() {
    rows.value = readRows();
    page.value = Math.min(page.value, totalPages.value);
    if (page.value < 1) page.value = 1;
  }
  
  onMounted(() => {
    syncRows();
  
    // seed demo data once (optional)
    if (!rows.value.length) {
      const demo = Array.from({ length: 9 }).map((_, i) => ({
        id: crypto?.randomUUID ? crypto.randomUUID() : `demo-${i + 1}`,
        fullName: "Micheal Jackson",
        email: "micheal@gmail.com",
        phone: "07023456789",
        dateCreated: "12 Jan 2025",
        permissions: i % 2 === 0 ? ["staff_directory_view", "staff_report_view"] : ["criminal_record_view", "incident_report_view"],
      }));
      writeRows(demo);
    }
  });
  
  watch(
    () => route.fullPath,
    () => {
      if (route.path === "/headquarters/hq-officers") syncRows();
    }
  );
  
  watch(
    () => search.value,
    () => {
      page.value = 1;
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
  
  function goNew() {
    router.push("/headquarters/hq-officers-create");
  }
  function goView(id) {
    router.push(`/headquarters/hq-officers/${id}`);
  }
  function goEdit(id) {
    router.push(`/headquarters/hq-officers/${id}/edit`);
  }
  
  function removeRow(id) {
    writeRows(rows.value.filter((r) => r.id !== id));
    page.value = Math.min(page.value, totalPages.value);
  }
  
  function onRefresh() {
    syncRows();
  }
  
  function permissionLabel(key) {
    const map = {
      staff_directory_view: "Staff Directory - View",
      staff_directory_manage: "Staff Directory - Add/Edit",
      staff_report_view: "Staff Report - View",
      staff_report_generate: "Staff Report - Generate",
      criminal_record_view: "Criminal Record - View",
      criminal_record_generate: "Criminal Record - Generate",
      incident_report_view: "Incident Report - View",
      incident_report_generate: "Incident Report - Generate",
    };
    return map[key] || String(key || "").replaceAll("_", " ");
  }
  </script>
  
  <style scoped>
  /* Figma-like grid borders (vertical separators included) */
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
  