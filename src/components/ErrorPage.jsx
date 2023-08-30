import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <span className='text-3xl text-slate-100'> OOPS</span>
    </div>
  );
}
