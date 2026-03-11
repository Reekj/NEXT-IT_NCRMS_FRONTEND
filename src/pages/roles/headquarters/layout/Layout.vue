<!-- src/pages/roles/headquarters/layout/Layout.vue -->
<template>
  <div class="min-h-screen bg-[#F6F7FB]">
    <div class="flex">
      <!-- Sidebar (DESKTOP ONLY) -->
      <div class="hidden lg:block">
        <HeadquartersSidebar />
      </div>

      <!-- MOBILE DRAWER -->
      <div v-if="mobileNavOpen" class="fixed inset-0 z-50 lg:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40" @click="closeMobileNav" />

        <!-- Drawer -->
        <div
          class="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl"
          @click.stop
        >
          <!-- Drawer header -->
          <div class="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div class="text-[14px] font-semibold text-black">Menu</div>

            <button
              type="button"
              class="grid h-10 w-10 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
              aria-label="Close menu"
              @click="closeMobileNav"
            >
              <X class="h-5 w-5 text-black/70" />
            </button>
          </div>

          <!-- Drawer content -->
          <div class="h-[calc(100%-64px)] overflow-y-auto">
            <HeadquartersSidebar @navigate="closeMobileNav" />

            <div class="px-4 pb-6">
              <button
                type="button"
                class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3
                       text-[13px] font-semibold text-red-600 hover:bg-red-50 active:bg-red-100"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8V6a2 2 0 012-2h5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16v2a2 2 0 002 2h5" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main column -->
      <div class="flex min-h-screen flex-1 flex-col">
        <!-- Topbar -->
        <header class="relative h-[76px] border-b border-[#0A2395]/10 bg-white">
          <div
            class="pointer-events-none absolute inset-0 opacity-100"
            style="
              background:
                radial-gradient(circle at 12% 30%, rgba(10,35,149,0.10), transparent 40%),
                radial-gradient(circle at 88% 0%, rgba(3,11,47,0.06), transparent 45%);
            "
          />

          <div class="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- LEFT -->
            <div class="flex items-center gap-3">
              <!-- Mobile hamburger -->
              <button
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10 lg:hidden"
                aria-label="Open menu"
                @click="openMobileNav"
              >
                <Menu class="h-5 w-5 text-black/70" />
              </button>

              <!-- Desktop logout -->
              <button
                type="button"
                class="hidden lg:inline-flex h-9 items-center gap-2 rounded-lg px-3
                       text-[13px] font-medium text-red-600
                       hover:bg-red-50 active:bg-red-100"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8V6a2 2 0 012-2h5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16v2a2 2 0 002 2h5" />
                </svg>
                Logout
              </button>
            </div>

            <!-- RIGHT: User -->
            <div class="flex items-center gap-3">
              <div class="h-11 w-11 overflow-hidden rounded-full bg-black/10">
                <img
                  v-if="headerUser?.avatarUrl"
                  :src="headerUser.avatarUrl"
                  alt="User avatar"
                  class="h-full w-full object-cover"
                />
                <div v-else class="grid h-full w-full place-items-center text-[12px] font-semibold text-black/60">
                  {{ initials }}
                </div>
              </div>

              <div class="leading-tight">
                <div class="text-[13px] font-semibold text-black">
                  {{ headerUser?.name || "User" }}
                </div>
                <div class="text-[12px] text-black/50">
                  {{ headerUser?.role || "Headquarters" }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main class="relative flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 pb-[92px]">
          <div
            class="pointer-events-none absolute inset-0 -z-10"
            style="
              background:
                radial-gradient(circle at 18% 18%, rgba(10,35,149,0.08), transparent 42%),
                radial-gradient(circle at 82% 10%, rgba(3,11,47,0.06), transparent 45%),
                linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%);
            "
          />
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import HeadquartersSidebar from "./Sidenav.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  user: { type: Object, required: true },
});

/**
 * ✅ Per-user header sync keys
 * - ncrms_hq_current_user_key: stable key for the logged-in HQ user
 * - ncrms_hq_user_cache: map of { [userKey]: { name, role, avatarUrl } }
 */
const HQ_CURRENT_USER_KEY = "ncrms_hq_current_user_key";
const HQ_USER_CACHE_KEY = "ncrms_hq_user_cache";
const HQ_UPDATE_EVENT = "ncrms-hq-user-updated";

const headerUser = ref({
  name: props.user?.name || "User",
  role: props.user?.role || "Headquarters",
  avatarUrl: props.user?.avatarUrl || "",
});

const mobileNavOpen = ref(false);

function openMobileNav() {
  mobileNavOpen.value = true;
}
function closeMobileNav() {
  mobileNavOpen.value = false;
}

watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false;
  }
);

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readCurrentUserKey() {
  return String(localStorage.getItem(HQ_CURRENT_USER_KEY) || "").trim();
}

function readUserCache() {
  const cache = readJson(HQ_USER_CACHE_KEY, {});
  return cache && typeof cache === "object" ? cache : {};
}

function syncHeaderUser() {
  const userKey = readCurrentUserKey();
  const cache = readUserCache();

  if (userKey && cache[userKey]) {
    const u = cache[userKey] || {};
    headerUser.value = {
      name: u.name || "User",
      role: u.role || "Headquarters",
      avatarUrl: u.avatarUrl || "",
    };
    return;
  }

  // fallback to props if cache not ready yet
  headerUser.value = {
    name: props.user?.name || "User",
    role: props.user?.role || "Headquarters",
    avatarUrl: props.user?.avatarUrl || "",
  };
}

function onStorageEvent(e) {
  if (!e?.key) return;
  if (e.key === HQ_CURRENT_USER_KEY || e.key === HQ_USER_CACHE_KEY) {
    syncHeaderUser();
  }
}

onMounted(() => {
  syncHeaderUser();
  window.addEventListener(HQ_UPDATE_EVENT, syncHeaderUser);
  window.addEventListener("storage", onStorageEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener(HQ_UPDATE_EVENT, syncHeaderUser);
  window.removeEventListener("storage", onStorageEvent);
});

const initials = computed(() => {
  const parts = String(headerUser.value?.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const first = parts[0]?.[0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
});

function logout() {
  // ✅ clear HQ auth + current user pointer (keep cache so avatars persist per user)
  localStorage.removeItem("ncrms_token_hq");
  localStorage.removeItem("ncrms_user_hq");
  localStorage.removeItem(HQ_CURRENT_USER_KEY);

  sessionStorage.clear();
  router.replace("/login/headquarters");
}
</script>