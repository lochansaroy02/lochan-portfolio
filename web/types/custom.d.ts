// next-env.d.ts or types/custom.d.ts

declare module '*.css' {
    // Use any or a more specific type if you plan to import CSS Modules
    // For plain global.css, an empty module declaration is usually enough.
    const content: any;
    export default content;
}