// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
    rules:{
        'max-len':['off',{code:200}]
    }
})
