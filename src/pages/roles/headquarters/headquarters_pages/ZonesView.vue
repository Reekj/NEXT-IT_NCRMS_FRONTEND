<!-- src/pages/roles/headquarters/headquarters_pages/ZonesView.vue -->
<template>
  <HeadquartersLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
      class="space-y-6"
    >
      <h1 class="text-[22px] font-semibold tracking-tight text-black">Zones</h1>

      <Motion
        tag="section"
        class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <div class="border-b border-black/10 px-6 py-5">
          <div class="text-[20px] font-semibold text-black">View Zone</div>

          <div class="mt-3 flex items-center justify-between gap-3">
            <div v-if="zoneId" class="text-[13px] text-black/55">
              Record: <span class="font-semibold text-black/70">{{ zoneId }}</span>
            </div>

            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center justify-center rounded-lg px-4 text-[13px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90"
              @click="goEdit"
              :whileHover="{ scale: 1.02, y: -1 }"
              :whileTap="{ scale: 0.96 }"
              :transition="{ duration: 0.15 }"
            >
              Edit
            </Motion>
          </div>
        </div>

        <div v-if="isLoading" class="px-6 py-6">
          <div class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-4 py-2 text-[13px] text-black/60">
            <span class="h-2 w-2 rounded-full bg-black/30 animate-pulse" />
            Loading zone...
          </div>
        </div>

        <div v-else class="px-6 py-8">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-[14px] font-semibold text-black/80">Zone Name</label>
              <input
                :value="form.zoneName"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px] text-black/70 outline-none"
              />
            </div>

            <div>
              <label class="mb-2 block text-[14px] font-semibold text-black/80">Status</label>
              <div class="relative">
                <input
                  :value="form.status"
                  disabled
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 pr-10 text-[14px] text-black/70 outline-none"
                />
                <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/30" />
              </div>
            </div>

            <div class="md:col-span-2">
              <label class="mb-2 block text-[14px] font-semibold text-black/80">Description</label>
              <input
                :value="form.description"
                disabled
                class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 text-[14px] text-black/70 outline-none"
              />
            </div>

            <div class="md:col-span-2 md:max-w-[420px]">
              <label class="mb-2 block text-[14px] font-semibold text-black/80">Date Created</label>
              <div class="relative">
                <input
                  :value="form.dateCreated"
                  disabled
                  class="h-12 w-full rounded-2xl border border-[#DCE7FF] bg-black/[0.03] px-4 pr-12 text-[14px] text-black/70 outline-none"
                />
                <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/30" />
              </div>
            </div>
          </div>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-12 w-full items-center justify-center rounded-xl border border-black/10 bg-white px-8
                     text-[14px] font-semibold text-black/70 hover:bg-black/5 active:bg-black/10 sm:w-auto"
              @click="goBack"
              :whileHover="{ scale: 1.01 }"
              :whileTap="{ scale: 0.97 }"
              :transition="{ duration: 0.15 }"
            >
              Back
            </Motion>
          </div>

          <div v-if="errorMsg" class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {{ errorMsg }}
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
import { Calendar, ChevronDown } from "lucide-vue-next";

import { getZoneById } from "../../../../services/zone.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const route = useRoute();

const user = {
  name: "Headquarters",
  role: "Headquarters",
  avatarUrl: "",
};

const zoneId = ref(String(route.params.id || ""));

const isLoading = ref(false);
const errorMsg = ref("");

const form = reactive({
  zoneName: "—",
  description: "—",
  status: "—",
  dateCreated: "—",
});

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

async function hydrate() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const data = await getZoneById(zoneId.value);
    const z = data?.data || data?.zone || data;

    if (!z) {
      router.replace("/headquarters/zones");
      return;
    }

    form.zoneName = z?.zoneName || z?.name || "—";
    form.description = z?.description || "—";
    form.status = z?.status || "—";
    form.dateCreated = formatDateLikeFigma(z?.createdAt || z?.dateCreated || z?.created_at || "—");
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(hydrate);

function goBack() {
  router.push("/headquarters/zones");
}
function goEdit() {
  router.push(`/headquarters/zones/${zoneId.value}/edit`);
}
</script>