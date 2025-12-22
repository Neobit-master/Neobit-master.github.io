import React from 'react';
import CodeBlock from '@/components/atoms/CodeBlock';

const Home = () => {
  return (
    <section>
      <div className="systemContent--information">
        <h1>Bienvenido</h1>
        <hr />
        <p>
          Aquí encontraras los recursos necesarios para usar el sistema de diseño de <strong>NeoBit</strong>. Tanto Headers como cards. Este sistema de diseño fue hecho con atomic design por lo tanto están segmentados por atomos, moléculas y organismos.
        </p>
        <p>
          No olvides que para usar los componentes al principio del archivo debes importarlos así:
        </p>
        <CodeBlock language="javascript">
          {"import <Nombre del componente> from '@/components/<(atoms|molecules|organisms)>/<componente>';"}
        </CodeBlock>
      </div>
    </section>
  );
};

export default Home;
