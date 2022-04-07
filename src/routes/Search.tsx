import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";

interface Result {
    id: string;
    owner: any;
    name: string;
    html_url: string;
    description: string | null;
}

const Search = () => {
    const [query, setQuery] = useState(() => {
        if (location.search) {
            const query = new URLSearchParams(location.search);
            return query.get("q") || "";
        }
        return "";
    });
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const location = useLocation();
    
    // const search = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const res = await axios.get(
    //             `https://api.github.com/search/repositories?q=${query}&sort=stars`
    //         );
    //         setResults(res.data.items);
    //         setLoading(false);
    //     } catch (err) {
    //         setError(err.message);
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        setResults([...results, {
            id: "",
            owner: {
                avatar_url: "https://i.stack.imgur.com/frlIf.png",
                login: "Fluidstream",
            },
            name: "Ukraine: Unexpected dead end in Chernihiv",
            html_url: "/videos/1",
            description: null,
        }]);
    }, []);

    
    return (
        <div className="max-w-md mx-auto">
            {error && <div className="text-red-500">{error}</div>}
            {results.length > 0 && (
                <ul className="list-disc">
                    {results.map((repo) => (
                        <li key={repo.id}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <img

                                        className="h-10 w-10 rounded-full"
                                        src={repo.owner.avatar_url}
                                        alt={repo.owner.login}
                                    />
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm">
                                        <Link
                                            to={repo.html_url}
                                            className="text-blue-500 hover:text-blue-800"
                                        >
                                            {repo.name}
                                        </Link>
                                        <span className="text-gray-500"> by </span>
                                        <a
                                            href={repo.owner.html_url}
                                            className="text-blue-500 hover:text-blue-800"
                                        >
                                            {repo.owner.login}
                                        </a>
                                    </div>
                                    <p className="text-gray-700 text-sm">{repo.description}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;