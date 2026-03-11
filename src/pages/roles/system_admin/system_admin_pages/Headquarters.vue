<!-- src/pages/roles/system_admin/system_admin_pages/Headquarters.vue -->
<template>
  <SystemAdminLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
    >
      <Motion
        tag="div"
        class="rounded-2xl border border-black/10 bg-white shadow-sm"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-black/10 px-7 py-5">
          <h1 class="text-[20px] font-semibold text-black">Headquarters</h1>

          <div class="flex items-center gap-3">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-medium text-white
                   bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                   shadow-sm hover:opacity-95 active:opacity-90
                   disabled:cursor-not-allowed disabled:opacity-60"
              @click="goNew"
              :disabled="isLoading"
              :whileHover="isLoading ? {} : { scale: 1.02, y: -1 }"
              :whileTap="isLoading ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              <Search class="h-4 w-4 text-white" />
              New
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-black/5 px-4
                   text-[13px] font-medium text-black/70 hover:bg-black/10 active:bg-black/15
                   disabled:cursor-not-allowed disabled:opacity-60"
              @click="exportTable"
              :disabled="isLoading || rows.length === 0"
              :whileHover="isLoading ? {} : { scale: 1.02, y: -1 }"
              :whileTap="isLoading ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              <FileDown class="h-4 w-4 text-black/60" />
              Export Table
            </Motion>
          </div>
        </div>

        <!-- Top status row -->
        <div class="px-7 py-4 border-b border-black/10 flex items-center justify-between">
          <div class="text-[12px] text-black/60">
            <span v-if="isLoading">Loading headquarters…</span>
            <span v-else>Showing {{ rows.length }} record{{ rows.length === 1 ? "" : "s" }}</span>
          </div>

          <Motion
            tag="button"
            type="button"
            class="inline-flex h-9 items-center gap-2 rounded-lg border border-black/10 bg-white px-3
                   text-[12px] font-medium text-black/60 hover:bg-black/5 active:bg-black/10
                   disabled:cursor-not-allowed disabled:opacity-60"
            @click="fetchRows"
            :disabled="isLoading"
            :whileHover="isLoading ? {} : { scale: 1.02 }"
            :whileTap="isLoading ? {} : { scale: 0.96 }"
            :transition="{ duration: 0.12 }"
          >
            <span class="inline-block h-2 w-2 rounded-full" :class="isLoading ? 'bg-orange-500' : 'bg-green-500'"></span>
            Refresh
          </Motion>
        </div>

        <!-- Table -->
        <div class="px-0">
          <!-- Header row -->
          <Motion
            tag="div"
            class="grid grid-cols-[1.2fr_1.3fr_.9fr_.7fr_.9fr_.8fr_.7fr] gap-0"
            :initial="{ opacity: 0, y: 6 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.2, easing: 'ease-out' }"
          >
            <div class="cell cell--head">Full Name</div>
            <div class="cell cell--head">Email</div>
            <div class="cell cell--head">Assigned Zone</div>
            <div class="cell cell--head">Status</div>
            <div class="cell cell--head">Last Login</div>
            <div class="cell cell--head">Date Created</div>
            <div class="cell cell--head cell--last">Actions</div>
          </Motion>

          <!-- Body -->
          <div>
            <!-- Error -->
            <Motion
              v-if="errorMsg"
              tag="div"
              class="px-7 py-6"
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.2 }"
            >
              <div class="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-700">
                {{ errorMsg }}
              </div>
            </Motion>

            <!-- Loading skeleton-ish rows -->
            <div v-else-if="isLoading" class="px-7 py-6 space-y-3">
              <div v-for="i in 6" :key="i" class="h-12 rounded-xl bg-black/[0.03] border border-black/5"></div>
            </div>

            <!-- Rows -->
            <Motion
              v-else
              tag="div"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ staggerChildren: 0.03 }"
            >
              <Motion
                v-for="row in pagedRows"
                :key="row.id"
                tag="div"
                class="grid grid-cols-[1.2fr_1.3fr_.9fr_.7fr_.9fr_.8fr_.7fr] gap-0"
                :initial="{ opacity: 0, y: 6 }"
                :animate="{ opacity: 1, y: 0 }"
                :whileHover="{ y: -2 }"
                :transition="{ duration: 0.18, easing: 'ease-out' }"
              >
                <div class="cell">
                  <div class="text-[13px] text-black/70">{{ row.fullName }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.email }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.zone }}</div>
                </div>

                <div class="cell">
                  <Motion
                    tag="span"
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px]"
                    :class="statusStyles(row.status)"
                    :whileHover="{ scale: 1.03 }"
                    :transition="{ duration: 0.15 }"
                  >
                    <span class="h-1.5 w-1.5 rounded-full" :class="statusDot(row.status)"></span>
                    {{ row.status || "—" }}
                  </Motion>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.lastLogin }}</div>
                </div>

                <div class="cell">
                  <div class="text-[13px] text-black/60">{{ row.dateCreated }}</div>
                </div>

                <div class="cell cell--last">
                  <div class="flex items-center gap-4">
                    <!-- View -->
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

                    <!-- Edit -->
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

                    <!-- Delete (UI only for now) -->
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
                </div>
              </Motion>

              <!-- Empty state -->
              <Motion
                v-if="rows.length === 0"
                tag="div"
                class="px-7 py-12 text-center"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.22, easing: 'ease-out' }"
              >
                <div class="text-[14px] font-semibold text-black">No Headquarters</div>
                <div class="mt-2 text-[13px] text-black/60">
                  Click <span class="font-medium">New</span> to create a Headquarters account.
                </div>
              </Motion>
            </Motion>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center px-7 py-6">
          <div class="inline-flex overflow-hidden rounded-lg border border-black/10 bg-white">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 border-r border-black/10 px-4 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
              @click="prevPage"
              :disabled="page === 1 || isLoading"
              :whileHover="page === 1 || isLoading ? {} : { scale: 1.02 }"
              :whileTap="page === 1 || isLoading ? {} : { scale: 0.96 }"
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
              class="h-10 min-w-10 border-r border-black/10 px-3 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
              :class="p.type === 'page' && p.value === page ? 'bg-black/[0.03] text-black' : ''"
              :disabled="p.type === 'dots' || isLoading"
              @click="p.type === 'page' ? (page = p.value) : null"
              :whileHover="p.type === 'dots' || isLoading ? {} : { scale: 1.03 }"
              :whileTap="p.type === 'dots' || isLoading ? {} : { scale: 0.95 }"
              :transition="{ duration: 0.1 }"
            >
              {{ p.label }}
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 px-4 text-[13px] text-black/60 hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
              @click="nextPage"
              :disabled="page === totalPages || isLoading"
              :whileHover="page === totalPages || isLoading ? {} : { scale: 1.02 }"
              :whileTap="page === totalPages || isLoading ? {} : { scale: 0.96 }"
              :transition="{ duration: 0.12 }"
            >
              Next
              <ChevronRight class="h-4 w-4" />
            </Motion>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter, useRoute } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, FileDown, Search } from "lucide-vue-next";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { api, getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const route = useRoute();

const user = {
  name: "John Michaelson",
  role: "System Administrator",
  avatarUrl: "",
};

const rows = ref([]);
const isLoading = ref(false);
const errorMsg = ref("");

const page = ref(1);
const pageSize = 9;

const totalPages = computed(() => Math.max(1, Math.ceil(rows.value.length / pageSize)));

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize;
  return rows.value.slice(start, start + pageSize);
});

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatZone(z) {
  if (z === null || z === undefined || z === "") return "—";
  const n = Number(z);
  if (!Number.isFinite(n)) return String(z);
  return `Zone ${n}`;
}

function normalizeStatus(s) {
  const v = String(s || "").trim();
  if (!v) return "—";
  // Keep as returned, but normalize common variants
  const low = v.toLowerCase();
  if (low === "active") return "Active";
  if (low === "suspended") return "Suspended";
  return v;
}

async function fetchRows() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const res = await api.get("/api/admin/headquarters");
    const admins = res?.data?.admins || [];

    rows.value = admins.map((a) => ({
      id: a?.id || a?._id || String(Math.random()),
      fullName: a?.fullName || "—",
      email: a?.email || "—",
      zone: formatZone(a?.assignedZone),
      status: normalizeStatus(a?.accountStatus),
      lastLogin: a?.lastLogin ? formatDate(a.lastLogin) : "—",
      dateCreated: a?.dateCreated ? formatDate(a.dateCreated) : "—",
    }));

    // reset page if needed
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
  () => route.fullPath,
  () => {
    if (route.path === "/system-admin/headquarters") fetchRows();
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
  router.push("/system-admin/headquarters/new");
}
function goEdit(id) {
  router.push(`/system-admin/headquarters/${id}/edit`);
}
function goView(id) {
  router.push(`/system-admin/headquarters/${id}`);
}

// UI-only for now — until backend delete endpoint is provided
function removeRow(id) {
  rows.value = rows.value.filter((r) => r.id !== id);
  page.value = Math.min(page.value, totalPages.value);
}

function exportTable() {
  const data = Array.isArray(rows.value) ? rows.value : [];
  if (!data.length) {
    alert("No records to export.");
    return;
  }

  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  doc.setFontSize(14);
  doc.text("NCRMS — Headquarters", 40, 40);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString("en-GB")}`, 40, 58);

  autoTable(doc, {
    startY: 80,
    head: [["Full Name", "Email", "Assigned Zone", "Status", "Last Login", "Date Created"]],
    body: data.map((r) => [
      r.fullName ?? "—",
      r.email ?? "—",
      r.zone ?? "—",
      r.status ?? "—",
      r.lastLogin ?? "—",
      r.dateCreated ?? "—",
    ]),
    styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
    headStyles: { fillColor: [3, 11, 47], textColor: 255, fontStyle: "bold" },
  });

  doc.save(`headquarters-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function statusStyles(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "border-green-200 bg-green-50 text-green-700";
  if (s === "suspended") return "border-orange-200 bg-orange-50 text-orange-700";
  return "border-black/10 bg-black/5 text-black/60";
}
function statusDot(status) {
  const s = String(status || "").toLowerCase();
  if (s === "active") return "bg-green-600";
  if (s === "suspended") return "bg-orange-600";
  return "bg-black/40";
}
</script>

<style scoped>
.cell {
  min-height: 60px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}
.cell--head {
  background: rgba(0, 0, 0, 0.02);
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.5);
}
.cell--last {
  border-right: 0;
}
</style>