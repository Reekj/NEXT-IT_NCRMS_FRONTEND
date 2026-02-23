<template>
  <main class="min-h-screen bg-[#F3F3F3]">
    <div class="min-h-screen w-full">
      <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <!-- LEFT: Form panel -->
        <section class="flex items-center justify-center bg-white px-6 py-12">
          <div class="w-full max-w-[520px]">
            <!-- Logo -->
            <div class="flex flex-col items-center text-center">
              <img
                src="../assets/logo.png"
                alt="NCRMS"
                class="h-[120px] w-[168px] object-contain"
              />

              <h1 class="mt-6 text-[22px] font-semibold text-black">
                Headquarters
              </h1>

              <h2 class="mt-3 text-[22px] font-extrabold text-black">
                Welcome
              </h2>

              <p class="mt-2 text-[13px] text-black/60">
                Enter your details to login
              </p>
            </div>

            <!-- Form -->
            <form class="mt-10 space-y-6" @submit.prevent="onSubmit">
              <!-- Username/Email (UI-only for now) -->
              <div>
                <label class="text-[13px] font-medium text-black/70">
                  Username or Email
                </label>
                <input
                  v-model.trim="form.username"
                  type="text"
                  autocomplete="username"
                  placeholder="Enter your username or email"
                  class="mt-2 h-11 w-full rounded-lg border border-black/15 px-4 text-[13px]
                         outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/5"
                />
              </div>

              <!-- Service Number (mapped from your UI User ID) -->
              <div>
                <label class="text-[13px] font-medium text-black/70">
                  Service Number
                </label>
                <input
                  v-model.trim="form.userId"
                  type="text"
                  placeholder="Enter your service number"
                  class="mt-2 h-11 w-full rounded-lg border border-black/15 px-4 text-[13px]
                         outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/5"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="text-[13px] font-medium text-black/70">
                  Password
                </label>

                <div
                  class="mt-2 flex h-11 w-full items-center rounded-lg border border-black/15 bg-white px-4
                         transition focus-within:border-black/30 focus-within:ring-2 focus-within:ring-black/5"
                >
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    placeholder="Enter your password"
                    class="h-full w-full bg-transparent text-[13px] outline-none"
                  />

                  <button
                    type="button"
                    class="ml-2 grid h-8 w-8 place-items-center rounded-md hover:bg-black/5"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <Eye v-if="!showPassword" class="h-4 w-4 text-black/50" />
                    <EyeOff v-else class="h-4 w-4 text-black/50" />
                  </button>
                </div>
              </div>

              <!-- Remember + Forgot -->
              <div class="flex items-center justify-between">
                <label class="flex items-center gap-2 text-[12px] text-black/70">
                  <input
                    v-model="form.remember"
                    type="checkbox"
                    class="h-4 w-4 rounded border-black/20 text-black focus:ring-black/10"
                  />
                  Remember me
                </label>

                <RouterLink
                  to="/forgot-password"
                  class="text-[12px] font-medium text-black/60 hover:text-black"
                >
                  Forgot password?
                </RouterLink>
              </div>

              <!-- Error -->
              <div
                v-if="errorMsg"
                class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700"
              >
                {{ errorMsg }}
              </div>

              <!-- Login button -->
              <button
                type="submit"
                :disabled="isLoggingIn"
                class="mt-2 h-11 w-full rounded-lg
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       text-[13px] font-semibold text-white
                       shadow-sm transition hover:opacity-95 active:opacity-90
                       disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isLoggingIn ? "Logging in..." : "Login" }}
              </button>

              <!-- Back to role selection -->
              <div class="flex justify-center">
                <RouterLink
                  to="/roles"
                  class="mt-2 inline-flex items-center gap-2 text-[12px] font-medium text-black/60 hover:text-black"
                >
                  <ArrowLeft class="h-4 w-4" />
                  Back to Role Selection
                </RouterLink>
              </div>

              <!-- Security notice -->
              <div
                class="mt-6 rounded-xl border border-black/10 bg-white px-5 py-4 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <div class="mt-[2px] grid h-9 w-9 place-items-center rounded-lg bg-black/5">
                    <ShieldCheck class="h-5 w-5 text-black/70" />
                  </div>

                  <div>
                    <div class="text-[13px] font-semibold text-black">
                      Security Notice :
                    </div>
                    <p class="mt-1 text-[12px] leading-5 text-black/60">
                      This system contains sensitive criminal record information. Unauthorized access is
                      prohibited and monitored. All activities are logged and audited for security
                      compliance.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <!-- RIGHT: Image panel -->
        <aside class="relative hidden lg:block">
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: `url(${rightImage})` }"
            aria-label="NCRMS background"
          />
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-vue-next";

import rightImage from "../assets/login_image.jpg";

import { login } from "../services/auth.service";
import { getApiErrorMessage } from "../services/api";

const router = useRouter();
const showPassword = ref(false);

const isLoggingIn = ref(false);
const errorMsg = ref("");

const form = reactive({
  username: "",
  userId: "", // we will treat as serviceNumber for backend
  password: "",
  remember: false,
});

async function onSubmit() {
  errorMsg.value = "";

  if (!form.userId || !form.password) {
    alert("Please enter your service number and password.");
    return;
  }

  isLoggingIn.value = true;

  try {
    const data = await login({
      serviceNumber: form.userId,
      password: form.password,
    });

    // Token may be returned in different shapes. We'll grab the common ones.
    const token =
      data?.token ||
      data?.accessToken ||
      data?.data?.token ||
      data?.data?.accessToken;

    if (!token) {
      errorMsg.value =
        "Login successful but no token returned. Please check the login response shape in Swagger.";
      return;
    }

    localStorage.setItem("ncrms_token", token);

    // optional user storage
    const userObj = data?.user || data?.data?.user;
    if (userObj) {
      localStorage.setItem("ncrms_user", JSON.stringify(userObj));
    }

    router.push("/headquarters/dashboard");
  } catch (err) {
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoggingIn.value = false;
  }
}
</script>