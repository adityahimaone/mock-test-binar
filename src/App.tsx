import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RoutesViews from '@/routes/Main';
import { store, persistor } from '@/store/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoutesViews />
      </PersistGate>
    </Provider>
  );
}

export default App;
