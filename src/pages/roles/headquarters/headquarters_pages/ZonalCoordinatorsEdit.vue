<!-- src/pages/roles/headquarters/headquarters_pages/ZonalCoordinatorEdit.vue -->
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
            <div class="text-[20px] font-semibold text-black">Edit Zonal Coordinator</div>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center justify-center rounded-lg border border-black/10 bg-white px-4
                     text-[13px] font-semibold text-black/70 shadow-sm hover:bg-black/5 active:bg-black/10
                     disabled:cursor-not-allowed disabled:opacity-60"
              @click="goBack"
              :disabled="isLoading || isSaving"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              Back
            </Motion>
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

        <!-- Form -->
        <form v-else class="px-5 py-6 sm:px-7 sm:py-8" @submit.prevent="onUpdate">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Full Name</label>
              <input
                v-model.trim="form.fullName"
                type="text"
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                       text-black/80 outline-none
                       focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Email Address</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                       text-black/80 outline-none
                       focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Assigned Zone</label>
              <div class="relative">
                <select
                  v-model.number="form.zone"
                  class="h-12 w-full appearance-none rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                         text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option :value="null" disabled>Select zone</option>
                  <option v-for="z in zones" :key="z.value" :value="z.value">
                    {{ z.label }}
                  </option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
              </div>
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Account Status</label>
              <div class="relative">
                <select
                  v-model="form.status"
                  class="h-12 w-full appearance-none rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                         text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                >
                  <option value="" disabled>Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40" />
              </div>
            </div>

            <!-- Date Created (read-only from backend) -->
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
              <div class="mt-1 text-[12px] text-black/45">Backend controlled (read-only).</div>
            </div>
          </div>

          <div v-if="saveErr" class="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-700">
            {{ saveErr }}
          </div>

          <div v-if="saveMsg" class="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-[13px] text-green-700">
            {{ saveMsg }}
          </div>

          <div class="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Motion
              tag="button"
              type="submit"
              class="inline-flex h-11 w-full items-center justify-center rounded-xl
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     px-7 text-[14px] font-semibold text-white shadow-sm
                     hover:opacity-95 active:opacity-90 sm:w-auto sm:text-[13px]
                     disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSaving"
              :whileHover="isSaving ? undefined : { scale: 1.02, y: -1 }"
              :whileTap="isSaving ? undefined : { scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              {{ isSaving ? "Updating..." : "Update" }}
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white
                     px-7 text-[14px] font-semibold text-black/70 shadow-sm
                     hover:bg-black/5 active:bg-black/10 sm:w-auto sm:text-[13px]
                     disabled:cursor-not-allowed disabled:opacity-60"
              @click="goBack"
              :disabled="isSaving"
              :whileHover="isSaving ? undefined : { scale: 1.02, y: -1 }"
              :whileTap="isSaving ? undefined : { scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              Cancel
            </Motion>
          </div>
        </form>
      </Motion>
    </Motion>
  </HeadquartersLayout>
</template>

<script setup>
import { Motion } from "@motionone/vue";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeadquartersLayout from "../layout/Layout.vue";
import { Calendar, ChevronDown } from "lucide-vue-next";

import { getZonalCoordinatorById, updateZonalCoordinator } from "../../../../services/coordinator.service";
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

const isSaving = ref(false);
const saveErr = ref("");
const saveMsg = ref("");

// Zone mapping consistent with your CREATE page (Zone 1 -> 0 ... Zone 9 -> 8)
const zones = [
  { label: "Zone 1", value: 0 },
  { label: "Zone 2", value: 1 },
  { label: "Zone 3", value: 2 },
  { label: "Zone 4", value: 3 },
  { label: "Zone 5", value: 4 },
  { label: "Zone 6", value: 5 },
  { label: "Zone 7", value: 6 },
  { label: "Zone 8", value: 7 },
  { label: "Zone 9", value: 8 },
];

const form = reactive({
  fullName: "",
  email: "",
  zone: null,       // number
  status: "",       // "active" | "inactive"
  createdAtISO: "", // yyyy-mm-dd (read-only)
});

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
  return resData?.data || resData?.coordinator || resData || null;
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

    form.fullName = payload?.fullName || payload?.name || "";
    form.email = payload?.email || "";
    form.zone = payload?.zone ?? null;
    form.status = String(payload?.status || "").toLowerCase();
    form.createdAtISO = toISODate(payload?.createdAt || payload?.created_at || payload?.dateCreated);
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchOne);

async function onUpdate() {
  saveErr.value = "";
  saveMsg.value = "";

  if (!form.fullName || !form.email || form.zone === null || !form.status) {
    saveErr.value = "Please fill all required fields.";
    return;
  }

  isSaving.value = true;

  try {
    const res = await updateZonalCoordinator(recordId.value, {
      fullName: form.fullName,
      email: form.email,
      zone: form.zone,
      status: form.status, // lowercase
    });

    saveMsg.value = res?.message || "Coordinator updated successfully.";
    router.push("/headquarters/zonal-coordinators");
  } catch (err) {
    saveErr.value = getApiErrorMessage(err);
  } finally {
    isSaving.value = false;
  }
}

function goBack() {
  router.push("/headquarters/zonal-coordinators");
}
</script>