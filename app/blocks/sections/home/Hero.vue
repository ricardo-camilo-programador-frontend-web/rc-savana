<script setup lang="ts">
import backgroundGradientOrangeMini from '~/assets/images/background-gradient-orange-mini.webp'
import backgroundGradientOrange from '~/assets/images/background-gradient-orange.webp'
import celineSayuriTagami from '~/assets/images/celine-sayuri-tagami-2s6ORaJY6gI-unsplash.webp'
import charlesdeluvio from '~/assets/images/charlesdeluvio-5R5HgLyHMVQ-unsplash.webp'
import greenWingedMacaw from '~/assets/images/green-winged-macaw-ara-chloropterus-flying.webp'
import katherineMcadoo from '~/assets/images/katherine-mcadoo-vSS2_KfzbLY-unsplash.webp'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section
    class="md: relative mx-auto flex h-full min-h-screen w-full min-w-screen flex-col items-center justify-center py-8 pt-[10rem] md:min-h-[44rem] md:overflow-hidden md:py-16 md:pt-0 lg:max-h-[38rem] lg:min-w-full lg:py-24"
    aria-labelledby="hero-heading"
  >
    <Image
      :src="backgroundGradientOrange"
      :aria-hidden="true"
      alt="Background gradient orange"
      class="absolute top-0 -right-[10rem] mt-32 h-[400px] w-[400px] rounded-full object-cover opacity-50 md:-right-40 md:h-[800px] md:w-[800px] md:opacity-100"
      width="400"
      height="400"
    />

    <Image
      :src="backgroundGradientOrangeMini"
      :aria-hidden="true"
      alt="Background gradient orange mini"
      class="absolute -top-14 left-[10%] mr-auto h-[100px] w-[100px] rotate-180 rounded-full md:left-[20%] md:h-[200px] md:w-[200px]"
      title="Background gradient orange mini"
      width="100"
      height="100"
    />

    <Image
      :src="backgroundGradientOrangeMini"
      :aria-hidden="true"
      alt="Background gradient orange mini"
      class="absolute -bottom-14 left-[20%] mr-auto hidden h-[75px] w-[75px] rounded-full md:left-[30%] md:block md:h-[150px] md:w-[150px]"
      title="Background gradient orange mini"
      width="75"
      height="75"
    />

    <div class="md: mx-auto">
      <div class="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
        <div class="relative z-10 max-w-xl md:text-center lg:text-left">
          <span
            class="mb-3 inline-block text-base font-medium text-orange-500 md:mb-4 md:text-lg"
            aria-label="Section category"
          >
            {{ t('hero.category') }}
          </span>

          <h1
            id="hero-heading"
            class="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:mb-6 md:text-4xl lg:text-5xl xl:text-6xl"
          >
            {{ t('hero.title') }}
          </h1>

          <p class="mb-6 text-base text-gray-600 md:mb-8 md:text-lg">
            {{ t('hero.description') }}
          </p>

          <NuxtLink
            :to="localePath({ path: '/shop' })"
            class="flex w-full items-center justify-center rounded-md bg-black px-6 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-orange-500 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none md:w-max md:px-8 md:py-3 md:text-base"
            aria-label="Browse our shop collection"
          >
            {{ t('hero.cta') }}
          </NuxtLink>
        </div>

        <Image
          :src="greenWingedMacaw"
          :aria-hidden="true"
          alt=""
          class="absolute top-[7rem] left-[30%] w-20 scale-150 md:top-24 md:left-[38%] md:w-32"
          width="20"
          height="20"
          loading="eager"
        />

        <div
          class="right-0 -bottom-8 ml-4 h-[20rem] w-[20rem] px-4 md:absolute md:right-0 md:bottom-0 md:mt-auto md:h-[40rem] md:w-[40rem] md:px-0"
        >
          <div
            class="relative bottom-0 mt-auto flex h-full w-full items-center justify-center md:-right-24"
          >
            <Image
              :src="celineSayuriTagami"
              alt="Happy dog with its owner"
              class="absolute -bottom-4 z-[3] -mr-16 w-[25rem] object-cover md:bottom-0"
              width="25"
              height="25"
              loading="eager"
              fetch-priority="high"
            />

            <div class="bottom-0 mt-auto flex items-center justify-center">
              <Image
                :src="charlesdeluvio"
                alt="Happy dog with its owner"
                class="bottom-0 z-[4] mt-auto -ml-[4rem] hidden w-[18rem] object-cover md:-ml-16 md:block"
                width="18"
                height="18"
                loading="eager"
              />
              <Image
                :src="katherineMcadoo"
                alt="Happy dog with its owner"
                class="bottom-0 z-[4] mt-auto hidden w-[7rem] object-cover md:-mr-12 md:block"
                width="7"
                height="7"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
