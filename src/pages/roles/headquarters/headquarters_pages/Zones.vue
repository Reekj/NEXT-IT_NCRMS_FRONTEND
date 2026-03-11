<!-- src/pages/roles/headquarters/headquarters_pages/Zones.vue -->
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
        <h1 class="text-[22px] font-semibold tracking-tight text-black">Zone Management</h1>
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
                     transition hover:bg-black/5 sm:h-10 sm:w-10 sm:rounded-lg
                     disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Refresh"
              @click="onRefresh"
              :disabled="isLoading"
              :whileHover="isLoading ? {} : { scale: 1.03 }"
              :whileTap="isLoading ? {} : { scale: 0.96 }"
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
            <Plus class="h-4 w-4 text-white" />
            New
          </Motion>
        </div>

        <!-- Loading / Error banner -->
        <div v-if="isLoading || errorMsg" class="px-5 py-4 sm:px-7 border-b border-black/10">
          <div
            v-if="isLoading"
            class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-4 py-2 text-[13px] text-black/60"
          >
            <span class="h-2 w-2 rounded-full bg-black/30 animate-pulse" />
            Loading zones...
          </div>

          <div
            v-else
            class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
          >
            {{ errorMsg }}
          </div>
        </div>

        <!-- MOBILE -->
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
                <div class="text-[15px] font-semibold text-black/85">{{ row.zoneName }}</div>
                <div class="mt-1 text-[13px] text-black/60 line-clamp-2">{{ row.description }}</div>
              </div>

              <Motion
                tag="span"
                class="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold"
                :class="statusStyles(row.status)"
                :whileTap="{ scale: 0.98 }"
                :transition="{ duration: 0.12 }"
              >
                <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(row.status)"></span>
                {{ row.status || "—" }}
              </Motion>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-3 text-[13px]">
              <div class="rounded-xl border border-black/10 bg-black/[0.02] p-3">
                <div class="text-black/45 text-[12px] font-medium">Date Created</div>
                <div class="mt-1 font-semibold text-black/80">{{ row.dateCreated }}</div>
              </div>
            </div>

            <div class="mt-4 flex items-center justify-end gap-4">
              <Motion
                tag="button"
                type="button"
                class="text-black/45 hover:text-black/70"
                title="View"
                @click="goView(row.rawId)"
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
                @click="goEdit(row.rawId)"
                :whileHover="{ scale: 1.12 }"
                :whileTap="{ scale: 0.9 }"
                :transition="{ duration: 0.12 }"
              >
                <Pencil class="h-5 w-5" />
              </Motion>

              <Motion
                tag="button"
                type="button"
                class="text-black/45 hover:text-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
                title="Delete"
                @click="removeRow(row.rawId)"
                :disabled="deletingId === String(row.rawId || '')"
                :whileHover="{ scale: 1.12 }"
                :whileTap="{ scale: 0.9 }"
                :transition="{ duration: 0.12 }"
              >
                <Trash2 class="h-5 w-5" />
              </Motion>
            </div>
          </Motion>

          <div v-if="!isLoading && filteredAll.length === 0" class="py-10 text-center">
            <div class="text-[14px] font-semibold text-black">No Zones</div>
            <div class="mt-2 text-[13px] text-black/60">
              Click <span class="font-medium">New</span> to create a Zone.
            </div>
          </div>
        </div>

        <!-- DESKTOP -->
        <div class="hidden sm:block">
          <div class="overflow-x-auto">
            <table class="min-w-[980px] w-full border-collapse">
              <thead>
                <tr class="bg-white">
                  <th class="thCell">Zone Name</th>
                  <th class="thCell">Description</th>
                  <th class="thCell">Status</th>
                  <th class="thCell">Date Created</th>
                  <th class="thCell thCell--last">Actions</th>
                </tr>
              </thead>

              <Motion tag="tbody" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ staggerChildren: 0.04 }">
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
                  <td class="tdCell font-semibold text-black/75">{{ row.zoneName }}</td>
                  <td class="tdCell text-black/65">{{ row.description }}</td>
                  <td class="tdCell">
                    <Motion
                      tag="span"
                      class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold"
                      :class="statusStyles(row.status)"
                      :whileHover="{ scale: 1.03 }"
                      :transition="{ duration: 0.12 }"
                    >
                      <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(row.status)"></span>
                      {{ row.status || "—" }}
                    </Motion>
                  </td>
                  <td class="tdCell">{{ row.dateCreated }}</td>
                  <td class="tdCell tdCell--last">
                    <div class="flex items-center gap-4">
                      <Motion
                        tag="button"
                        type="button"
                        class="text-black/40 hover:text-black/70"
                        title="View"
                        @click="goView(row.rawId)"
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
                        @click="goEdit(row.rawId)"
                        :whileHover="{ scale: 1.12 }"
                        :whileTap="{ scale: 0.9 }"
                        :transition="{ duration: 0.12 }"
                      >
                        <Pencil class="h-4 w-4" />
                      </Motion>

                      <Motion
                        tag="button"
                        type="button"
                        class="text-black/40 hover:text-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
                        title="Delete"
                        @click="removeRow(row.rawId)"
                        :disabled="deletingId === String(row.rawId || '')"
                        :whileHover="{ scale: 1.12 }"
                        :whileTap="{ scale: 0.9 }"
                        :transition="{ duration: 0.12 }"
                      >
                        <Trash2 class="h-4 w-4" />
                      </Motion>
                    </div>
                  </td>
                </Motion>

                <tr v-if="!isLoading && filteredAll.length === 0">
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
import { useRouter } from "vue-router";
import HeadquartersLayout from "../layout/Layout.vue";
import { Search, RotateCw, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-vue-next";

import { listZones, deleteZone } from "../../../../services/zone.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();

const user = {
  name: "Headquarters",
  role: "Headquarters",
  avatarUrl: "",
};

const rows = ref([]);
const search = ref("");

const isLoading = ref(false);
const errorMsg = ref("");

const deletingId = ref("");

const page = ref(1);
const pageSize = 9;

function toStatus(s) {
  const v = String(s || "").toLowerCase();
  if (v === "active") return "active";
  if (v === "inactive") return "inactive";
  return v || "";
}

function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.zones)) return data.zones;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function normalizeRow(item, index) {
  const rawId = item?.id || item?._id || item?.uuid || null;
  const id = rawId || `zone-${index}`;

  return {
    id,
    rawId: rawId || id,
    zoneName: item?.zoneName || item?.name || "—",
    description: item?.description || "—",
    status: toStatus(item?.status),
    dateCreated: item?.createdAt || item?.dateCreated || item?.created_at || "—",
  };
}

function formatDateLikeFigma(dateValue) {
  if (!dateValue || dateValue === "—") return "—";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return String(dateValue);

  const dd = String(d.getDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mmm = months[d.getMonth()];
  const yyyy = d.getFullYear();
  return `${dd} ${mmm} ${yyyy}`;
}

async function fetchRows() {
  isLoading.value = true;
  errorMsg.value = "";

  try {
    const data = await listZones(); // GET /api/admin/zones
    const list = normalizeListResponse(data);
    rows.value = list.map((it, idx) => {
      const r = normalizeRow(it, idx);
      return { ...r, dateCreated: formatDateLikeFigma(r.dateCreated) };
    });
    page.value = 1;
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
    rows.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchRows);

watch(
  () => search.value,
  () => {
    page.value = 1;
  }
);

const filteredAll = computed(() => {
  const q = String(search.value || "").trim().toLowerCase();
  if (!q) return rows.value;

  return rows.value.filter((r) => {
    const hay = `${r.zoneName} ${r.description} ${r.status} ${r.dateCreated}`.toLowerCase();
    return hay.includes(q);
  });
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredAll.value.length / pageSize)));

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredAll.value.slice(start, start + pageSize);
});

const pageButtons = computed(() => {
  const last = totalPages.value;
  const btns = [];

  const addPage = (n) => btns.push({ key: `p-${n}`, type: "page", value: n, label: String(n) });
  const addDots = (key) => btns.push({ key, type: "dots", value: null, label: "..." });

  if (last <= 7) {
    for (let i = 1; i <= last; i++) addPage(i);
    return btns;
  }

  addPage(1);
  addPage(2);

  if (page.value > 4) addDots("dots-l");

  const start = Math.max(3, page.value - 1);
  const end = Math.min(last - 2, page.value + 1);
  for (let i = start; i <= end; i++) addPage(i);

  if (page.value < last - 3) addDots("dots-r");

  addPage(last - 1);
  addPage(last);

  return btns;
});

function prevPage() {
  page.value = Math.max(1, page.value - 1);
}
function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1);
}

function goNew() {
  router.push("/headquarters/zones-create");
}
function goView(id) {
  router.push(`/headquarters/zones/${id}`);
}
function goEdit(id) {
  router.push(`/headquarters/zones/${id}/edit`);
}

async function removeRow(rawId) {
  const id = String(rawId || "").trim();
  if (!id) return;

  const ok = window.confirm("Delete this Zone? This cannot be undone.");
  if (!ok) return;

  deletingId.value = id;

  try {
    await deleteZone(id);
    rows.value = rows.value.filter((r) => String(r.rawId) !== id);
    page.value = Math.min(page.value, totalPages.value);
  } catch (err) {
    alert(getApiErrorMessage(err));
  } finally {
    deletingId.value = "";
  }
}

function onRefresh() {
  fetchRows();
}

function statusStyles(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "border-green-200 bg-green-50 text-green-700";
  if (s === "inactive") return "border-[#98A2B3] bg-[#F2F4F7] text-[#667085]";
  return "border-black/10 bg-black/5 text-black/60";
}
function statusDot(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "bg-green-600";
  if (s === "inactive") return "bg-[#667085]";
  return "bg-black/40";
}
</script>

<style scoped>
.thCell {
  height: 58px;
  text-align: left;
  padding: 0 18px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.55);
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  white-space: nowrap;
}
.thCell--last {
  border-right: none;
}
.tdCell {
  height: 64px;
  padding: 0 18px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.72);
  vertical-align: middle;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.tdCell--last {
  border-right: none;
}
</style>