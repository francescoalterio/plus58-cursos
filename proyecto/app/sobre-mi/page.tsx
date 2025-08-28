import Image from "next/image";

export const metadata = {
  title: "Sobre mí | Plataforma de Cursos",
  description: "Perfil e información de Francesco Alterio",
};

export default function SobreMiPage() {
  return (
    <div className="space-y-12">
      <header className="flex flex-col items-center text-center gap-6">
        <div className="relative">
          <Image
            src="/images/yo.png"
            alt="Foto de Francesco Alterio"
            width={140}
            height={140}
            className="rounded-full ring-4 ring-brand/30 shadow-lg object-cover"
            priority
          />
        </div>
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Hola, mi nombre es{" "}
            <span className="text-brand">Francesco Alterio</span>
          </h1>
          <p className="text-neutral-300 leading-relaxed">
            Soy un desarrollador Fullstack actualmente radicado en Cumaná,
            Venezuela.
          </p>
        </div>
      </header>

      <section className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-brand">Historia</h2>
        <div className="space-y-4 text-sm leading-relaxed text-neutral-300">
          <p>Cada sueño comienza con una historia.</p>
          <p>
            Mi nombre es Francesco Alterio y soy desarrollador Fullstack.
            Comencé en el mundo de la programación Web a principios de 2021 y
            desde entonces he creado más de 20 proyectos con diferentes
            tecnologías. Cuando descubrí el desarrollo de software encontré mi
            gran pasión, un mundo lleno de maravillosas posibilidades.
          </p>
          <p>
            Mi primer encuentro con la programación fue en el año 2020 cuando
            decidí incursionar en la programación de videojuegos como hobby, un
            año después quise llevar el desarrollo de software de manera
            profesional, eligiendo la programación web como punto de partida.
          </p>
        </div>
      </section>

      <section className="space-y-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-brand">Más sobre mí</h2>
        <p className="text-sm leading-relaxed text-neutral-300">
          A lo largo de estos años he trabajado con tecnologías como Javascript,
          Typescript, Node.js, Express, React, Next.js, React Native / Expo,
          Python, además de herramientas de estilo como TailwindCSS y
          fundamentos sólidos de HTML & CSS. También he creado APIs REST,
          componentes reutilizables, integraciones con Firebase y flujos de
          autenticación, aplicando buenas prácticas de arquitectura, pruebas y
          despliegue continuo cuando el proyecto lo requiere. Actualmente soy
          profesor de programación en la academia{" "}
          <span className="text-brand font-medium">Plus 58</span>, algo que me
          permite compartir lo que aprendo y reforzar mi propio conocimiento.
          Disfruto enseñar, escribir código claro y construir productos que la
          gente realmente use.
        </p>
      </section>

      <section className="space-y-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-brand">Academia Plus 58</h2>
        <p className="text-sm leading-relaxed text-neutral-300">
          Plus 58 es una academia donde formamos nuevas generaciones de
          programadores desde las bases hasta crear proyectos reales. Imparto
          clases guiando a los estudiantes paso a paso, fomentando buenas
          prácticas desde el inicio y creando un ambiente cercano y motivador.
        </p>
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 text-sm text-neutral-300 space-y-2">
          <p>
            <span className="text-neutral-400">Ubicación:</span> Av. Arismendi,
            edificio San Judas, LOCAL 04. Dentro de la E/S Texaco. Cumaná,
            estado Sucre.
          </p>
          <p>
            <span className="text-neutral-400">Teléfono:</span>{" "}
            <a href="tel:+584248931221" className="text-brand hover:underline">
              0424 893 1221
            </a>
          </p>
          <ul className="space-y-1">
            <li>
              <span className="text-neutral-400">Instagram:</span>{" "}
              <a
                className="text-brand hover:underline"
                href="https://instagram.com/plus58md"
                target="_blank"
                rel="noopener noreferrer"
              >
                @plus58md
              </a>
            </li>
            <li>
              <span className="text-neutral-400">Facebook:</span>{" "}
              <a
                className="text-brand hover:underline"
                href="https://facebook.com/plus58md"
                target="_blank"
                rel="noopener noreferrer"
              >
                @plus58md
              </a>
            </li>
            <li>
              <span className="text-neutral-400">Telegram:</span>{" "}
              <a
                className="text-brand hover:underline"
                href="https://t.me/plus58md"
                target="_blank"
                rel="noopener noreferrer"
              >
                @plus58md
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-brand">Enlaces</h2>
        <p className="text-sm leading-relaxed text-neutral-300">
          Puedes ver más de mi trabajo y trayectoria profesional aquí:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://francescoalterio.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-md bg-brand/20 border border-brand/40 hover:bg-brand/30 text-brand font-medium transition"
          >
            Portafolio
          </a>
          <a
            href="https://www.linkedin.com/in/francescoalterio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-md bg-neutral-800 border border-neutral-700 hover:border-brand/60 hover:text-brand transition"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
