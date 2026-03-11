<!-- src/pages/roles/headquarters/headquarters_pages/ZonalCoordinatorView.vue -->
<template>
  <HeadquartersLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
      class="space-y-6"
    >
      <h1 class="text-[22px] font-semibold tracking-tight text-black">Zonal Coordinators</h1>

      <Motion
        tag="section"
        class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <div class="border-b border-black/10 px-5 py-5 sm:px-7">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div class="text-[20px] font-semibold text-black">View Zonal Coordinator</div>

            <div class="flex items-center gap-3">
              <Motion
                tag="button"
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-white px-4
                       text-[13px] font-semibold text-black/70 shadow-sm hover:bg-black/5 active:bg-black/10
                       disabled:cursor-not-allowed disabled:opacity-60"
                @click="goBack"
                :disabled="isLoading"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Back
              </Motion>

              <Motion
                tag="button"
                type="button"
                class="inline-flex h-10 items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90
                       disabled:cursor-not-allowed disabled:opacity-60"
                @click="goEdit"
                :disabled="isLoading || !!errorMsg"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.15 }"
              >
                Edit
              </Motion>
            </div>
          </div>

          <div v-if="recordId" class="mt-2 text-[13px] text-black/55">
            ID: <span class="font-semibold text-black/70">{{ recordId }}</span>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="px-5 py-6 sm:px-7">
          <div class="rounded-xl border border-black/10 bg-black/[0.02] px-4 py-3 text-[13px] text-black/60">
            Loading coordinator…
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="errorMsg" class="px-5 py-6 sm:px-7">
          <div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {{ errorMsg }}
            <div class="mt-4">
              <button
                type="button"
                class="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white px-4 text-[13px] font-medium text-black/70 hover:bg-black/[0.03]"
                @click="fetchOne"
              >
                Retry
              </button>
            </div>
          </div>
        </div>

        <!-- READ ONLY -->
        <div v-else class="px-5 py-6 sm:px-7 sm:py-8">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Full Name</label>
              <input
                v-model="form.fullName"
                type="text"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px]
                       text-black/75 outline-none opacity-95"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px]
                       text-black/75 outline-none opacity-95"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Zone</label>
              <input
                :value="zoneLabel(form.zone)"
                type="text"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px]
                       text-black/75 outline-none opacity-95"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Status</label>
              <input
                :value="prettyStatus(form.status)"
                type="text"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px]
                       text-black/75 outline-none opacity-95"
              />
            </div>

            <div class="md:col-span-1">
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Date Created</label>
              <div class="relative">
                <input
                  v-model="form.createdAtISO"
                  type="date"
                  disabled
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 pr-11 text-[14px]
                         text-black/75 outline-none opacity-95"
                />
                <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/30" />
              </div>
            </div>
          </div>

          <div class="mt-10 flex justify-end">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white
                     px-7 text-[14px] font-semibold text-black/70 shadow-sm
                     hover:bg-black/5 active:bg-black/10 sm:w-auto sm:text-[13px]"
              @click="goBack"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              Done
            </Motion>
          </div>
        </div>
      </Motion>
    </Motion>
  </HeadquartersLayout>
</template>

<script setup>
import { Motion } from "@motionone/vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeadquartersLayout from "../layout/Layout.vue";
import { Calendar } from "lucide-vue-next";

import { getZonalCoordinatorById } from "../../../../services/coordinator.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const route = useRoute();

const user = {
  name: "Headquarters",
  role: "Headquarters",
  avatarUrl: "",
};

const recordId = ref(String(route.params.id || ""));

const isLoading = ref(false);
const errorMsg = ref("");

const form = reactive({
  fullName: "",
  email: "",
  zone: null, // number (0..8 or 1..9 depending backend)
  status: "", // "active" | "inactive"
  createdAtISO: "", // yyyy-mm-dd for date input
});

function zoneLabel(zone) {
  const n = Number(zone);
  if (!Number.isFinite(n)) return "—";
  if (n >= 1 && n <= 9) return `Zone ${n}`;
  if (n >= 0 && n <= 8) return `Zone ${n + 1}`;
  return `Zone ${n}`;
}

function prettyStatus(s) {
  const v = String(s || "").toLowerCase();
  if (v === "active") return "Active";
  if (v === "inactive") return "Inactive";
  return s || "—";
}

function toISODate(dateValue) {
  if (!dateValue) return "";
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function pickPayload(resData) {
  return resData?.data || resData?.coordinator || resData?.user || resData || null;
}

async function fetchOne() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const data = await getZonalCoordinatorById(recordId.value);
    const payload = pickPayload(data);

    if (!payload || typeof payload !== "object") {
      errorMsg.value = "Coordinator not found.";
      return;
    }

    form.fullName = payload?.fullName || payload?.name || "—";
    form.email = payload?.email || "—";
    form.zone = payload?.zone ?? null;
    form.status = String(payload?.status || "").toLowerCase();
    form.createdAtISO = toISODate(payload?.createdAt || payload?.dateCreated || payload?.created_at);
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchOne);

function goBack() {
  router.push("/headquarters/zonal-coordinators");
}

function goEdit() {
  router.push(`/headquarters/zonal-coordinators/${recordId.value}/edit`);
}
</script>