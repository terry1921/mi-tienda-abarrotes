# Mi tienda de abarrotes
Tienda de abarrotes  (demostración) React, Typescript y Tailwindcss

# Documentación del Proyecto

## Resumen

Este proyecto es una aplicación web progresiva (PWA) desarrollada utilizando React y TypeScript, estilizada con TailwindCSS. Ofrece una experiencia de usuario fluida y responsiva en una variedad de dispositivos y condiciones de red, apoyándose en principios de diseño moderno y las mejores prácticas de desarrollo web.

## Arquitectura

### Frontend
- **Framework:** React.
- **Lenguaje de Programación:** TypeScript.
- **Estilos:** TailwindCSS.
- **PWA:** Service Worker personalizado y manifiesto web para funcionalidad offline y capacidad de instalación.

### Patrón de Diseño

- **Componentes Funcionales:** Utilizando hooks de React para el manejo de estado y efectos secundarios.
- **Context API:** Para manejo del estado global como el carrito de compras y configuración de PWA.
- **Lazy Loading:** Implementado para optimizar la carga de componentes y mejorar el rendimiento de la aplicación.
- **Responsive Design:** TailwindCSS es utilizado para asegurar que la aplicación sea accesible y ofrezca una buena experiencia de usuario en dispositivos móviles, tablets y desktops.

### Service Worker

- **Precaché de Activos Estáticos:** Configurado para cargar rápidamente los activos más importantes y mejorar la experiencia de usuario en conexiones lentas o ausentes.
- **Estrategias de Caché para API:** Estrategias de red primero para datos dinámicos, permitiendo que la aplicación funcione de manera offline con datos previamente cargados.

## Decisiones de Diseño

### Uso de TypeScript
Se optó por TypeScript para aprovechar sus características de tipado estático, lo que mejora la calidad del código, facilita el mantenimiento y ayuda a prevenir errores en tiempo de desarrollo.

### TailwindCSS para Estilos
TailwindCSS se seleccionó por su enfoque de utilidades primero, permitiendo un diseño rápido y coherente sin alejarse de la hoja de estilos, y facilitando la implementación de un diseño responsivo.

### Service Worker y PWA
La decisión de convertir la aplicación en una PWA se tomó para mejorar la accesibilidad y experiencia del usuario, permitiendo uso offline y la capacidad de instalar la aplicación. El Service Worker se personalizó para satisfacer necesidades específicas del proyecto, incluyendo el precaché de activos y estrategias de caché dinámico.

## Instrucciones de Despliegue

### Requisitos
- Node.js versión 12 o superior.
- npm

### Pasos para el Desarrollo Local

1. Clonar el repositorio.
2. Instalar dependencias con `npm install`.
3. Iniciar el servidor de desarrollo con `npm start`.

### Construcción para Producción

1. Ejecutar `npm run build` para generar una construcción optimizada para producción.
2. Servir el contenido de la carpeta `build` a través de un servidor HTTPS.

### Docker

Para facilitar el despliegue, se incluye un `Dockerfile` que permite contenerizar la aplicación. Usa `docker build -t mi-aplicacion` . para construir la imagen y `docker run -p 80:3000 mi-aplicacion` para ejecutar la aplicación en un contenedor.

### Conclusión

Este proyecto aprovecha las ventajas de React, TypeScript, y TailwindCSS para ofrecer una aplicación web moderna y fácil de usar. La funcionalidad PWA mejora significativamente la experiencia del usuario, especialmente en situaciones de conectividad limitada. La arquitectura y las decisiones de diseño tomadas aseguran una base sólida para la expansión y mantenimiento futuro del proyecto.