import CodeBlock from '@/components/atoms/CodeBlock';
import { buttons } from '../components/manifests/buttonsManifest.json';
import LogoLoading from '../components/atoms/LogoLoading';

const Atoms = () => {
  return (
    <article className="systemContent">
      <div className="systemContent--information">
        <h1>Atomos</h1>
        <hr />
        <p>
          Los atomos son los cimientos que nos permiten crear estructuras mas
          grandes, permitiendonos poco a poco a construir y transmitir los
          fundamentos y principios de <strong>NeoBit</strong>.
        </p>
        <nav>
          <ul>
            <li><a href="/ds/atoms/#headers">Encabezados</a></li>
            <li><a href="/ds/atoms/#buttons">Botones</a></li>
            <li><a href="/ds/atoms/#logoLoading">Logo Loading</a></li>
          </ul>
        </nav>
      </div>

      <section id="headers" className="systemContent--section">
        <h4>Encabezados</h4>
        <hr />
        <p>
          Los encabezados son las etiquetas <code>h1...h6</code> que nos
          permetiran indicar cuando comienza una nueva seccion con nueva
          informacion en ella.
        </p>

        <div className="systemContent--section--components">
          <div className="container-component">
            <h1>Title</h1>
            <p>Código</p>
            <CodeBlock language="html">
              {`<h1>Title<h1/>`}
            </CodeBlock>
            <h2>Title</h2>
            <p>Código</p>
            <CodeBlock language="html">
              {`<h2>Title</h2>`}
            </CodeBlock>
            <h3>Title</h3>
            <p>Código</p>
            <CodeBlock language="html">
              {`<h3>Title</h3>`}
            </CodeBlock>
            <h4>Title</h4>
            <p>Código</p>
            <CodeBlock language="html">
              {`<h4>Title</h4>`}
            </CodeBlock>
            <h5>Title</h5>
            <p>Código</p>
            <CodeBlock language="html">
              {`<h5>Title<h5/>`}
            </CodeBlock>
          </div>
        </div>
      </section>

      <section id="buttons" className="systemContent--section">
        <h4>Botones</h4>
        <hr />
        <p>
          Los botones son una parte fundamental de nuestro sistema de diseño,
          son los elementos que le indicaran al usuario que puede hacer y cuando
          lo puede hacer.
        </p>

        <div className="systemContent--section--components">
          {buttons.map((button, index) => (
            <div key={index} className="container-component">
              <h5>{button.name}</h5>
              <p>Componente</p>
              <button className={button.className}>Type me</button>
              <p>Código</p>
              <CodeBlock language="html">
                {button.code}
              </CodeBlock>
            </div>
          ))}
        </div>
      </section>

      <section id="logoLoading" className="systemContent--section">
        <h4>Logo Loading</h4>
        <hr />
        <p>
          El loading es el componente que nos ayudará a darle una respuesta al usuario cuando alguna acción se esté realizando y esta se demora en completar.
        </p>

        <div className="systemContent--section--components">
          <div className="container-component">
            <p>Componente</p>
            <LogoLoading />
            <p>Código</p>
            <CodeBlock language="html">
              {`<LogoLoading />`}
            </CodeBlock>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Atoms;