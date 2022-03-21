import Link from 'next/link';
import { pathToRegexp } from 'next/dist/shared/lib/router/utils/path-match';

const Navbar = () => {
    pathToRegexp;
    return (
        <nav>
            <div className="logo">
                <h1>Todo list</h1>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/todos/Todolist">
                    <a>Todolist</a>
                </Link>
                <Link href="/todos/Calculator">
                    <a>Calculator</a>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
