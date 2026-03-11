<!-- src/pages/roles/system_admin/system_admin_pages/HeadquartersView.vue -->
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
        <div class="flex items-center justify-between border-b border-black/10 px-7 py-5">
          <div>
            <h1 class="text-[20px] font-semibold text-black">Headquarter</h1>
            <div class="mt-1 text-[12px] text-black/50">Registered headquarter details</div>
          </div>

          <div class="flex items-center gap-3">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white px-4 text-[13px]
                     font-medium text-black/70 hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60"
              @click="back"
              :disabled="isLoading"
              :whileHover="isLoading ? {} : { scale: 1.03 }"
              :whileTap="isLoading ? {} : { scale: 0.95 }"
              :transition="{ duration: 0.15 }"
            >
              Back to list
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center rounded-lg px-4 text-[13px] font-medium text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              @click="goEdit"
              :disabled="isLoading || !id"
              :whileHover="isLoading ? {} : { scale: 1.03, y: -1 }"
              :whileTap="isLoading ? {} : { scale: 0.95 }"
              :transition="{ duration: 0.15 }"
            >
              Edit
            </Motion>
          </div>
        </div>

        <div class="px-7 py-10">
          <div class="mx-auto w-full max-w-[980px]">
            <!-- Loading -->
            <div v-if="isLoading" class="rounded-xl border border-black/10 bg-white p-6 text-[13px] text-black/70">
              Loading headquarter details…
            </div>

            <!-- Error -->
            <div
              v-else-if="errorMsg"
              class="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-700"
            >
              {{ errorMsg }}
              <div class="mt-4 flex gap-3">
                <Motion
                  tag="button"
                  type="button"
                  class="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white px-4 text-[13px] font-medium text-black/70 hover:bg-black/[0.03]"
                  @click="fetchDetail"
                  :whileHover="{ scale: 1.03 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Retry
                </Motion>

                <Motion
                  tag="button"
                  type="button"
                  class="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white px-4 text-[13px] font-medium text-black/70 hover:bg-black/[0.03]"
                  @click="back"
                  :whileHover="{ scale: 1.03 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Back to list
                </Motion>
              </div>
            </div>

            <!-- Not found -->
            <Motion
              v-else-if="notFound"
              tag="div"
              class="rounded-xl border border-black/10 bg-white p-6 text-[13px] text-black/70"
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.2, easing: 'ease-out' }"
            >
              Headquarter not found.
              <Motion
                tag="button"
                type="button"
                class="mt-4 inline-flex h-10 items-center rounded-lg border border-black/10 px-4 text-[13px] font-medium hover:bg-black/[0.03]"
                @click="back"
                :whileHover="{ scale: 1.03 }"
                :whileTap="{ scale: 0.95 }"
                :transition="{ duration: 0.15 }"
              >
                Back to list
              </Motion>
            </Motion>

            <!-- Details -->
            <div v-else>
              <Motion
                tag="div"
                class="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ staggerChildren: 0.06 }"
              >
                <!-- Full Name -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Full Name</div>
                  <input class="input" type="text" :value="data.fullName" readonly />
                </Motion>

                <!-- Email -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Email Address</div>
                  <input class="input" type="text" :value="data.email" readonly />
                </Motion>

                <!-- Service Number -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Service Number</div>
                  <input class="input" type="text" :value="data.serviceNumber" readonly />
                </Motion>

                <!-- Assigned Zone -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Assigned Zone</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.assignedZone" readonly />
                    <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Account Status -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Account Status</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.accountStatus" readonly />
                    <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Date Created -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Date Created</div>
                  <div class="relative">
                    <input class="input pr-10" type="text" :value="data.dateCreated" readonly />
                    <Calendar
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    />
                  </div>
                </Motion>

                <!-- Password (display-only placeholder) -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Password</div>
                  <input class="input" type="password" placeholder="••••••••" readonly />
                </Motion>

                <!-- Last Login (not in swagger response; keep safe) -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Last Login</div>
                  <input class="input" type="text" :value="data.lastLogin" readonly />
                </Motion>
              </Motion>

              <div class="mt-12 flex items-center gap-4">
                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg px-8 text-[13px] font-medium text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                  @click="back"
                  :whileHover="{ scale: 1.03, y: -1 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Back
                </Motion>

                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg border border-black/10 bg-white px-8 text-[13px] font-medium text-black/70
                       hover:bg-black/5 active:bg-black/10"
                  @click="goEdit"
                  :whileHover="{ scale: 1.02 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Edit
                </Motion>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter, useRoute } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import { ChevronDown, Calendar } from "lucide-vue-next";

import { api, getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const route = useRoute();

const user = { name: "John Michaelson", role: "System Administrator", avatarUrl: "" };

/**
 * ✅ Swagger says:
 * GET /api/admin/headquarter/{id}
 * NOTE: it's singular `headquarter`, not `headquarters`
 */
const id = computed(() => String(route.params.id || "").trim());

const isLoading = ref(false);
const errorMsg = ref("");
const notFound = ref(false);

const data = reactive({
  id: "",
  fullName: "—",
  firstName: "—",
  lastName: "—",
  email: "—",
  serviceNumber: "—",
  assignedZone: "—",
  accountStatus: "—",
  dateCreated: "—",
  lastLogin: "—", // not in swagger response; keep as optional field
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

  // swagger shows assignedZone: 0 (likely 0-based). Display as Zone 1..9
  return `Zone ${n + 1}`;
}

function normalizeStatus(s) {
  const v = String(s || "").trim();
  if (!v) return "—";
  const low = v.toLowerCase();
  if (low === "active") return "Active";
  if (low === "suspended") return "Suspended";
  return v;
}

async function fetchDetail() {
  errorMsg.value = "";
  notFound.value = false;

  const theId = id.value;
  if (!theId) {
    notFound.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const res = await api.get(`/api/admin/headquarter/${encodeURIComponent(theId)}`);

    // swagger response: { message, admin: {...} }
    const a = res?.data?.admin;

    if (!a || !(a?.id || a?._id)) {
      notFound.value = true;
      return;
    }

    Object.assign(data, {
      id: a.id || a._id || "",
      fullName: a.fullName || `${a.firstName || ""} ${a.lastName || ""}`.trim() || "—",
      firstName: a.firstName || "—",
      lastName: a.lastName || "—",
      email: a.email || "—",
      serviceNumber: a.serviceNumber || "—",
      assignedZone: formatZone(a.assignedZone),
      accountStatus: normalizeStatus(a.accountStatus),
      dateCreated: a.dateCreated ? formatDate(a.dateCreated) : "—",
      // not in swagger, but keep safe if backend later adds it
      lastLogin: a.lastLogin ? formatDate(a.lastLogin) : "—",
    });
  } catch (err) {
    const status = err?.response?.status;
    if (status === 404) {
      notFound.value = true;
    } else {
      errorMsg.value = getApiErrorMessage(err);
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchDetail);

// If component is reused between ids, refetch
watch(
  () => route.params.id,
  () => fetchDetail()
);

function back() {
  router.push("/system-admin/headquarters");
}

function goEdit() {
  const theId = id.value;
  if (!theId) return;
  router.push(`/system-admin/headquarters/${encodeURIComponent(theId)}/edit`);
}
</script>

<style scoped>
.input {
  height: 48px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: #fff;
  padding: 0 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  outline: none;
}
</style>