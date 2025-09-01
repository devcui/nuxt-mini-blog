<script lang="ts" setup>
const router = useRouter()
const { locale } = useLocale()
const { data } = await useAsyncData(() =>
  queryCollection("content").where("path", 'LIKE', `%/${locale.value.code}/%`).select("tag").all()
);

const tags = computed<string[]>(() => {
  const items = data.value ?? [];
  return items
    .flatMap((item) => {
      const t = item?.tag;
      if (!t) return [];
      return Array.isArray(t) ? t : [t];
    })
    .map((t) => (typeof t === "string" ? t.trim() : ""))
    .filter((t): t is string => t.length > 0)
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );
});

const counted = computed(() => {
  const map = new Map<string, number>();
  for (const tag of tags.value) {
    map.set(tag, (map.get(tag) ?? 0) + 1);
  }
  return Array.from(map, ([tag, count]) => ({ tag, count }));
});

const grouped = computed(() => {
  const groups: Record<string, { tag: string; count: number }[]> = {};
  const isAsciiLetter = (ch: string) => /^[A-Za-z]$/.test(ch);
  for (const item of counted.value) {
    const first = (item.tag && item.tag[0]) || "";
    const key = isAsciiLetter(first) ? first.toLocaleUpperCase() : "#";
    (groups[key] ||= []).push(item);
  }
  return groups;
});

const keyCompare = (a: string, b: string) => {
  if (a === b) return 0;
  if (a === "#") return 1;
  if (b === "#") return -1;
  return a.localeCompare(b, undefined, { sensitivity: "base" });
};

const keywords = computed(() => {
  const ks = Object.keys(grouped.value);
  ks.sort(keyCompare);
  return ks;
});

const groupSorted = computed(() => {
  return Object.entries(grouped.value)
    .sort((a, b) => keyCompare(a[0], b[0]))
    .map(([keyword, tags]) => ({
      keyword,
      tags: tags.slice().sort((x, y) =>
        x.tag
          .toLocaleUpperCase()
          .localeCompare(y.tag.toLocaleUpperCase(), undefined, {
            numeric: true,
          })
      ),
    }));
});

const to = (tag: string) => {
  router.push(`/list?tag=${tag}`)
}
</script>

<template>
  <div>
    <Teleport to="body">
      <div class="fixed top-[20vh] right-0 hidden lg:block">
        <div class="hidden grid-cols-2 md:grid">
          <UButton v-for="keyword in keywords" :key="keyword" :href="`#${keyword}`">
            {{ keyword }}
          </UButton>
        </div>
      </div>
    </Teleport>
    <div v-for="group in groupSorted" :id="group.keyword" :key="group.keyword" class="mb-6 scroll-mt-[4rem]">
      <h2 class="mb-2 text-lg font-semibold">
        {{ group.keyword }}
      </h2>
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8">
        <li v-for="t in group.tags" :key="`${group.keyword}-${t.tag}`">
          <ULink class="cursor-pointer" @click="to(t.tag)">
            {{ t.tag }} ({{ t.count }})
          </ULink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
