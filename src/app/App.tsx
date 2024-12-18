import {Providers} from './providers/providers';
import { AppRouter } from './routes/appRouter';

const App = () => {
    return (
        <Providers>
            <AppRouter />
        </Providers>
    );
};

export default App;
