import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // TODO: выпилить @typescript-eslint/ban-ts-comment и @typescript-eslint/no-explicit-any после замены всех any на более конкретные типы
      // Разрешаем использование @ts-ignore
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
