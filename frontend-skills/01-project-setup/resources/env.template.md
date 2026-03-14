# Environment Exposure (Variables de Entorno Client-Side)

Al estar en Frontend, las variables viajan literalmente descritas en el archivo `.js` final que el usuario web descarga.

Es OBLIGATORIO que los Frameworks de Frontend posean un mecanismo de "Guard barrera", donde ignoren cualquier variable del `.env` que NO contenga un prefijo prefijado por el motor (así un desarrollador no filtra accidentalmente su `DB_PASSWORD` en el .env al frontend).

## Vite (React, Vue)

- Prefijo Obligatorio: `VITE_`
- Invocación: `import.meta.env.VITE_API_URL`

```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLIC_KEY=pk_test_123

# ESTO SERÁ IGNORADO Y PROTEGIDO POR VITE:
DB_PASSWORD=server-only-value
```

---

## Astro

- Prefijo Obligatorio: `PUBLIC_`
- Invocación: `import.meta.env.PUBLIC_API_URL`

```env
PUBLIC_API_URL=http://localhost:8080/api

# Astro corre en Edge/Server también, lo que NO sea PUBLIC_ lo guardará en Server context:
SECRET_API_KEY=server-only-value
```

---

## Create React App (CRA Vainilla Obsoleto)

- Prefijo Obligatorio: `REACT_APP_`
- Invocación: `process.env.REACT_APP_API_URL`

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## Angular (Environments nativos)

Angular ignora los `.env` tradicionales y usa archivos Typescript intercambiables en tiempo de build mediante reemplazo (File Replacements). Sin embargo, herramientas como `@ngx-env/builder` permiten parsear `.env` usando `NG_APP_`.

Lo estándar en Angular oficial:
Filename: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```
