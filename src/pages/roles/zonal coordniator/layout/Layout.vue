<!-- src/pages/roles/zonalcoordinator/layout/Layout.vue -->
<template>
  <div class="min-h-screen bg-[#F6F7FB]">
    <div class="flex">
      <!-- Sidebar (DESKTOP ONLY) -->
      <div class="hidden lg:block">
        <ZonalCoordinatorSidebar />
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
            <ZonalCoordinatorSidebar @navigate="closeMobileNav" />

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
        <header class="h-[76px] border-b border-black/10 bg-white">
          <div class="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- LEFT: Mobile Hamburger + Desktop Logout -->
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
                class="hidden lg:inline-flex h-9 items-center gap-2 rounded-lg px-2
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
              <!-- Avatar -->
              <div class="h-11 w-11 overflow-hidden rounded-full bg-black/10">
                <img
                  v-if="headerUser?.avatarUrl"
                  :src="headerUser.avatarUrl"
                  alt="User avatar"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="grid h-full w-full place-items-center text-[12px] font-semibold text-black/60"
                >
                  {{ initials }}
                </div>
              </div>

              <!-- Name + role -->
              <div class="leading-tight">
                <div class="text-[13px] font-semibold text-black">
                  {{ headerUser?.name || "User" }}
                </div>
                <div class="text-[12px] text-black/50">
                  {{ headerUser?.role || "Zonal Coordinator" }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page -->
        <main class="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import ZonalCoordinatorSidebar from "./Sidenav.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  user: { type: Object, required: true },
});

/**
 * IMPORTANT:
 * Separate key per role so HQ login/user doesn't override Zonal Coordinator header
 */
const USER_STORAGE_KEY = "ncrms_zonal_coordinator_current_user";

const headerUser = ref({
  name: props.user?.name || "User",
  role: props.user?.role || "Zonal Coordinator",
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

function readCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") return parsed;
    return null;
  } catch {
    return null;
  }
}

function writeCurrentUser(nextUser) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
}

function syncHeaderUserFromStorage() {
  const stored = readCurrentUser();

  if (stored) {
    headerUser.value = {
      name: stored.name || headerUser.value.name,
      role: stored.role || headerUser.value.role,
      avatarUrl: stored.avatarUrl || "",
    };
  } else {
    // seed once so Zonal header always has a source of truth
    writeCurrentUser(headerUser.value);
  }
}

onMounted(() => {
  syncHeaderUserFromStorage();

  // Live sync when Profile updates user (use a role-specific event)
  window.addEventListener("ncrms-zc-user-updated", syncHeaderUserFromStorage);
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
  localStorage.clear();
  sessionStorage.clear();

  // adjust this to your actual login route for zonal coordinator
  router.replace("/login/zonal-coordinator");
}
</script>
