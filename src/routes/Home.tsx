import { FunctionalComponent, h } from 'preact';

const Home: FunctionalComponent = () => {
    return (
        <div className="text-white border border-gray-800 rounded-md bg-black bg-opacity-50 backdrop-blur-lg flex flex-col px-5 py-2 my-5">
            <h1 class="text-4xl">Home</h1>
            <p>Welcome home. Thank you for using Fluidstream.</p>
        </div>
    );
};

export default Home;
