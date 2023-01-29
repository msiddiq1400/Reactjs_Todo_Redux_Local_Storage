import { Toaster } from 'react-hot-toast';
import PageContent from './components/PageContent';
import PageHeader from './components/PageHeader';
import PageTitle from './components/PageTitle'
import "./styles/GlobalStyles.css"
import style from './styles/modules/app.module.scss'

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO LIST</PageTitle>
        <div className={style.app__wrapper}>
          <PageHeader />
          <PageContent />
        </div>
      </div>
      <Toaster 
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '1.4rem'
          }
        }}
      />
    </>
  );
}

export default App;
