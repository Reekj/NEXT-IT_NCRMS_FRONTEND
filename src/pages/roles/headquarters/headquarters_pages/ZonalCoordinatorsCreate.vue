<!-- src/pages/roles/headquarters/headquarters_pages/NewZonalCoordinator.vue -->
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
          <div class="text-[20px] font-semibold text-black">Add Zonal Coordinator</div>
        </div>

        <form class="px-5 py-6 sm:px-7 sm:py-8" @submit.prevent="onSave">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- Full Name -->
            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Full Name</label>
              <input
                v-model.trim="form.fullName"
                type="text"
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                       text-black/80 outline-none
                       focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                placeholder=""
              />
            </div>

            <!-- Email -->
            <div>
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Email Address</label>
              <input
                v-model.trim="form.email"
                type="email"
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 text-[14px]
                       text-black/80 outline-none
                       focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                placeholder=""
              />
            </div>

            <!-- Zone -->
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
                <ChevronDown
                  class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
                />
              </div>
              <!-- <div class="mt-1 text-[12px] text-black/40">
                Zone is sent as a number to the backend (Zone 1 → 0, Zone 2 → 1, …).
              </div> -->
            </div>

            <!-- Status -->
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
                  <!-- Swagger expects lowercase -->
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown
                  class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40"
                />
              </div>
            </div>

            <!-- Date Created (UI-only; API doesn't require) -->
            <div class="md:col-span-1">
              <label class="mb-2 block text-[13px] font-semibold text-black/80">Date Created</label>
              <div class="relative">
                <input
                  v-model="form.dateCreated"
                  type="date"
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-white px-4 pr-11 text-[14px]
                         text-black/80 outline-none
                         focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
              <!-- <div class="mt-1 text-[12px] text-black/40">
                Backend saves the creation time automatically. This field is for UI reference only.
              </div> -->
            </div>
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
              {{ isSaving ? "Saving..." : "Save" }}
            </Motion>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white
                     px-7 text-[14px] font-semibold text-black/70 shadow-sm
                     hover:bg-black/5 active:bg-black/10 sm:w-auto sm:text-[13px]
                     disabled:cursor-not-allowed disabled:opacity-60"
              @click="onCancel"
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import HeadquartersLayout from "../layout/Layout.vue";
import { ChevronDown } from "lucide-vue-next";

import { createZonalCoordinator } from "../../../../services/coordinator.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const isSaving = ref(false);

const user = {
  name: "Helena John",
  role: "Headquarters",
  avatarUrl: "",
};

// Swagger example shows zone: 0 (number). We map Zone 1..9 -> 0..8
// If your backend expects 1..9 instead, change `value` to 1..9.
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
  zone: null,
  status: "",
  dateCreated: "", // UI-only (API doesn't require)
});

async function onSave() {
  // Keep validation clean + obvious
  if (!form.fullName || !form.email || form.zone === null || !form.status) {
    alert("Please fill all fields.");
    return;
  }

  isSaving.value = true;

  try {
    await createZonalCoordinator({
      fullName: form.fullName,
      email: form.email,
      zone: form.zone, // number
      status: form.status === "active" ? "active" : "inactive",
    });

    router.push("/headquarters/zonal-coordinators");
  } catch (err) {
    alert(getApiErrorMessage(err));
  } finally {
    isSaving.value = false;
  }
}

function onCancel() {
  router.push("/headquarters/zonal-coordinators");
}
</script>