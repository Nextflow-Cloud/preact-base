import { FunctionalComponent, h } from 'preact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../routes/Home';
import NotFoundPage from '../routes/NotFound';
import Header from './Header';
import Search from '../routes/Search';
import Video from '../routes/Video';

const App: FunctionalComponent = () => {
    return (
        <div id="root">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/videos/:id" element={<Video />} />
                    <Route path="/*" element={<NotFoundPage />} />
                    
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
