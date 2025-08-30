export default defineAppConfig({
  ui: {
    header: {
      slots: {
        root: 'bg-transparent border-none',
      },
    },
    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height))] mt-16',
    },
  },
})
