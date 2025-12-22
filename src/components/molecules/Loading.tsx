import LogoLoading from '../atoms/LogoLoading';

const Loading = () => {
  return (
    <div className="loading" role="status" aria-live="polite" aria-label="Cargando contenido">
      <LogoLoading aria-hidden="true" />
      <h3>Cargando</h3>
    </div>
  )
}

export default Loading;
