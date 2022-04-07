import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PersonAccounts, Navigation, Search } from "styled-icons/fluentui-system-regular";
import useMobileScreenCheck from '../hooks/useMobileScreenCheck';
import useActiveElement from '../hooks/useActiveElement';

const Header: FunctionalComponent = () => {
    const [searchContent, setSearchContent] = useState(() => {
        if (location.search) {
            const query = new URLSearchParams(location.search);
            return query.get("q") || "";
        }
        return "";
    });
    const navigate = useNavigate();
    const isMobileScreen = useMobileScreenCheck();
    if (isMobileScreen) {
        const [isSearchOpen, setIsSearchOpen] = useState(false);
        const [isNavOpen, setIsNavOpen] = useState(false);
        const searchElement = useRef<HTMLInputElement>(null);
        // const activeElement = useActiveElement();
        // useEffect(() => {
        //     console.log(activeElement);
        //     if ((activeElement !== searchElement.current) && isSearchOpen) {
        //         setIsSearchOpen(false);
        //     }
        // }, [activeElement]);
        useEffect(() => {
            const handleClickOutside = (event: Event) => {
                if (searchElement.current && !searchElement.current.contains(event.target as Node)) {
                    setIsSearchOpen(false);
                }
            };
            document.addEventListener("click", handleClickOutside, true);
            return () => {
                document.removeEventListener("click", handleClickOutside, true);
            };
        }, []);
        useEffect(() => {
            if (isSearchOpen) {
                searchElement.current?.focus();
            }
        }, [isSearchOpen]);
        const handleKeyDown = (e: KeyboardEvent) => {
            // console.log(e.key);
            if (e.key === "Escape") {
                setIsSearchOpen(false);
            }
            if (e.key === "Enter") {
                searchContent.trim() && navigate(`/search?q=${encodeURIComponent(searchContent.trim())}`);
            }
        };
        return (
            <>
                <header class="text-white border border-gray-800 rounded-md bg-black bg-opacity-50 backdrop-blur-lg flex justify-between px-5 py-2 items-center">
                    <div class={`flex space-x-4 items-center ${isSearchOpen && "hidden"}`}>
                        <div onClick={() => setIsNavOpen(!isNavOpen)}>
                            <Navigation width="30" height="30" />
                        </div>
                        <h1 className="text-lg" onClick={() => navigate("/")}><b>Fluidstream</b></h1>
                    </div>
                    <input class="w-full p-2 bg-gray-800 rounded-md" type="text" ref={searchElement} hidden={!isSearchOpen} onKeyDown={handleKeyDown} value={searchContent} onChange={e => setSearchContent((e.target as HTMLInputElement).value)} />
                    <div class="search items-center" hidden={isSearchOpen} onClick={() => setIsSearchOpen(true)}>
                        <Search width="30" height="30" />
                    </div>
                </header>
                <div class="h-full text-white absolute w-60 bg-black bg-opacity-50 backdrop-blur-lg z-50 rounded-md my-5 p-4" hidden={!isNavOpen}>
                    <div class="flex space-x-2 items-center border-b py-2">
                        <Home width="30" height="30" />
                        <span>Home</span>
                    </div>
                    <div class="flex space-x-2 items-center border-b py-2">
                        <PersonAccounts width="30" height="30" />
                        <span>Account</span>
                    </div>
                </div>
            </>
        );
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            searchContent.trim() && navigate(`/search?q=${encodeURIComponent(searchContent.trim())}`);
        }
    };

    return (
        <header class="text-white border border-gray-800 rounded-md bg-black bg-opacity-50 backdrop-blur-lg flex justify-between px-5 py-2 items-center">
            <h1 className="text-lg" onClick={() => navigate("/")}><b>Fluidstream</b></h1>
            <div class="search flex items-center">
                <input class="rounded-l-md bg-gray-800 p-2" type="text" placeholder="Search..." value={searchContent} onKeyDown={handleKeyDown} onChange={e => setSearchContent((e.target as HTMLInputElement).value)} />
                <div class="rounded-r-md border p-1 hover:bg-gray-600" onClick={() => searchContent.trim() && navigate(`/search?q=${encodeURIComponent(searchContent.trim())}`)}>
                    <Search width="30" height="30" />
                </div>
            </div>
            <nav>
                <Link activeClassName={"style.active"} to="/">
                    Home
                </Link>
                {/* <Link activeClassName={"style.active"} to="/">
                    Account
                </Link> */}
            </nav>
        </header>
    );
};

export default Header;
