<script lang="ts" setup>
const { data } = await useAsyncData(() =>
  queryCollection("content").where("tag", "IS NOT NULL").select("tag").all()
);

interface keywords {
  key: string;
  tags: Array<{ tag: string; count: number }>;
}

const tags = computed(() => {
  return (
    data.value
      ?.map((item) => item.tag)
      .flat()
      .filter((t): t is string => typeof t === "string")
      .sort() ?? []
  );
});

const cloud = computed(() => {
  const m = new Map<string, number>();
  tags.value?.forEach((tag) => m.set(tag, (m.get(tag) || 0) + 1));
  return Array.from(m, ([tag, count]) => ({ tag, count }));
});

const grouped = computed(() => {
  const m = new Map<string, { tag: string; count: number }[]>();

  cloud.value.forEach((item) => {
    const trimmed = (item.tag ?? "").trim();
    const first = [...trimmed][0] ?? "#";
    const initial = /[\p{L}\p{N}]/u.test(first)
      ? first.toLocaleUpperCase()
      : first;

    if (!m.has(initial)) m.set(initial, []);
    m.get(initial)!.push(item);
  });

  const entries = Array.from(m.entries());

  entries.sort((a, b) => {
    const isAlnum = (s: string) => /[\p{L}\p{N}]/u.test(s);
    const aAl = isAlnum(a[0]);
    const bAl = isAlnum(b[0]);
    if (aAl && !bAl) return -1;
    if (!aAl && bAl) return 1;
    return a[0].localeCompare(b[0]);
  });

  return entries.map(([initial, tags]) => ({
    initial,
    tags: tags.sort((x, y) => x.tag.localeCompare(y.tag)),
  }));
});
</script>

<template>
  <div>
    <div v-for="group in grouped" :key="group.initial" class="mb-6">
      <h2 class="mb-2 text-lg font-semibold">
        {{ group.initial }}
      </h2>
      <ul
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8"
      >
        <li v-for="t in group.tags" :key="`${group.initial}-${t.tag}`">
          <ULink as="a" :to="{ path: '/tag/list', query: { tag: t.tag } }">
            {{ t.tag }} ({{ t.count }})
          </ULink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
