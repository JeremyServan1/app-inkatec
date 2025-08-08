function QuienesSomos() {
  return (
    <main className="about-us">
      <section class="about-intro">
        <h2>Sobre nosotros</h2>
        <p>
          Nacimos con la idea de hacer las cosas diferentes. No solo vendemos,
          conectamos. Somos un equipo apasionado por crear valor real, inspirar
          confianza y construir relaciones que duren más allá de una simple
          compra. A lo largo del camino, hemos aprendido que lo importante no es
          solo crecer, sino crecer con propósito.
        </p>
      </section>

      <section className="about-image-text">
        <div class="about-text">
          <h3>Nuestra misión</h3>
          <p>
            En InkaTec, creemos que cada pequeño detalle puede transformar una
            experiencia en algo significativo. Nuestra misión es acercar
            productos cuidadosamente seleccionados a las personas, combinando
            calidad, diseño y funcionalidad. Queremos que cada cliente sienta
            que está llevando algo más que un producto: está llevando parte de
            una historia, de un propósito, y de una comunidad que valora lo
            auténtico.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/01/ces-2022-2582123.jpg?tf=3840x"
            alt="Our Mission"
          />
        </div>
      </section>

      <section className="about-values">
        <h3>Nuestros valores</h3>
        <ul>
          <li>🌿 Apoyamos las tecnologías biodegradables</li>
          <li>🛠️ Calidad de los productos</li>
          <li>🙌 Comunidad satisfecha</li>
          <li>💡 Objetivos claros</li>
        </ul>
      </section>

      <section className="team">
        <h3>Conoce al equipo</h3>
        <div className="grid-equipo">
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 1" />
            <h4>Juan Diego Bastidas Santivañez</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 2" />
            <h4>Jeremy Guillermo Servan Gonzales</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 3" />
            <h4>Victor Aroon Ordinola Cano</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 3" />
            <h4>Fernando Baldeon Quilca</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 3" />
            <h4>Dante Guillermo Palomino Correa</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
          <div className="miembro">
            <img src="./public/perfil.jpeg" alt="Team Member 3" />
            <h4>Elyud Edgar</h4>
            <p className="cargo">CEO & Founder</p>
            <p>Desarrollador FULL-STACK - PUCP</p>
          </div>
        </div>
      </section>
    </main>
  );
}
export default QuienesSomos;
