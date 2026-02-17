# TMDB API Setup Guide

## 🔑 Obtener Credenciales de TMDB

### Paso 1: Crear Cuenta en TMDB

1. Ve a [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Completa el formulario de registro
3. Verifica tu email
4. Inicia sesión en tu cuenta

### Paso 2: Solicitar API Key

1. Ve a tu perfil (icono de usuario en la esquina superior derecha)
2. Click en **"Settings"** (Configuración)
3. En el menú lateral, click en **"API"**
4. Click en **"Request an API Key"**
5. Acepta los términos de uso
6. Selecciona **"Developer"** (para uso no comercial) o **"Commercial"** según tu caso
7. Completa el formulario:
   - **Application Name**: FilmFlix
   - **Application URL**: http://localhost:3000 (o tu dominio)
   - **Application Summary**: Aplicación tipo Netflix para streaming de información de películas y series
8. Click en **"Submit"**

### Paso 3: Obtener las Credenciales

Una vez aprobada tu solicitud (es instantáneo), verás:

- **API Key (v3 auth)**: Una cadena de 32 caracteres hexadecimales
- **API Read Access Token (v4 auth)**: Un token JWT más largo

### Paso 4: Configurar Variables de Entorno

1. Abre el archivo `.env` en la carpeta `app/`
2. Copia tu **API Key** y pégala en `TMDB_API_KEY`:
   ```env
   TMDB_API_KEY=tu_api_key_de_32_caracteres
   ```

3. (Opcional) Copia tu **Read Access Token** y pégalo en `TMDB_API_READ_ACCESS_TOKEN`:
   ```env
   TMDB_API_READ_ACCESS_TOKEN=tu_token_jwt_largo
   ```

### Paso 5: Verificar Configuración

Puedes verificar que tu API Key funciona haciendo una petición de prueba:

```bash
curl "https://api.themoviedb.org/3/movie/popular?api_key=TU_API_KEY"
```

O usando el Read Access Token:

```bash
curl -H "Authorization: Bearer TU_READ_ACCESS_TOKEN" "https://api.themoviedb.org/3/movie/popular"
```

## 📊 Límites de la API

TMDB tiene los siguientes límites para cuentas gratuitas:

- **40 peticiones cada 10 segundos**
- **1,000 peticiones por día** (para nuevas cuentas)
- **Sin límite diario** para cuentas verificadas con uso legítimo

Para evitar alcanzar estos límites, la aplicación implementa:
- ✅ Caché de respuestas
- ✅ Debouncing en búsquedas
- ✅ Rate limiting interno
- ✅ Retry logic con exponential backoff

## 🔗 Endpoints Principales

### Películas
- `GET /movie/popular` - Películas populares
- `GET /movie/{movie_id}` - Detalle de película
- `GET /movie/{movie_id}/credits` - Créditos (cast & crew)
- `GET /search/movie` - Búsqueda de películas

### Series de TV
- `GET /tv/popular` - Series populares
- `GET /tv/{tv_id}` - Detalle de serie
- `GET /tv/{tv_id}/credits` - Créditos
- `GET /search/tv` - Búsqueda de series

### Personas
- `GET /person/{person_id}` - Detalle de persona
- `GET /person/{person_id}/movie_credits` - Películas de la persona
- `GET /search/person` - Búsqueda de personas

### Configuración
- `GET /configuration` - Configuración de imágenes y URLs

## 🖼️ Imágenes de TMDB

Las URLs de las imágenes siguen este patrón:

```
https://image.tmdb.org/t/p/{size}/{path}
```

### Tamaños Disponibles

**Posters:**
- `w92`, `w154`, `w185`, `w342`, `w500`, `w780`, `original`

**Backdrops:**
- `w300`, `w780`, `w1280`, `original`

**Profiles (personas):**
- `w45`, `w185`, `h632`, `original`

**Ejemplo:**
```
https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**:

- **NUNCA** subas tu `.env` al repositorio
- El `.gitignore` ya está configurado para ignorar archivos `.env`
- Usa variables de entorno en producción (Vercel, Netlify, etc.)
- No expongas tu API Key en el código del frontend
- Usa el Read Access Token cuando sea posible (más seguro)

## 📚 Recursos

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [TMDB API Reference](https://developer.themoviedb.org/reference/intro/getting-started)
- [TMDB Images Guide](https://developer.themoviedb.org/docs/image-basics)
- [TMDB Forums](https://www.themoviedb.org/talk/category/5047958519c29526b50017d6)

## 🆘 Troubleshooting

### Error 401: Unauthorized
- Verifica que tu API Key esté correctamente copiada
- Asegúrate de no tener espacios extra
- Verifica que la API Key esté activa en tu cuenta TMDB

### Error 429: Too Many Requests
- Has excedido el límite de peticiones
- Espera unos segundos antes de reintentar
- Implementa caché para reducir peticiones

### Error 404: Not Found
- Verifica que el ID del recurso sea correcto
- Algunos recursos pueden no estar disponibles en todos los países

### Imágenes no cargan
- Verifica que `NEXT_PUBLIC_TMDB_IMAGE_URL` esté configurada
- Algunos paths de imagen pueden estar vacíos (usar imagen placeholder)
