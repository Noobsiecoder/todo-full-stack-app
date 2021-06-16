import { Link } from "react-router-dom";
import PageTheme from "../Theme/PageTheme";

const Title = () => (
  <Link to="/">
    <h1 className="text-lg text-center dark:text-white text-gray-222 font-roboto sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
      Todo List
    </h1>
  </Link>
);

const PageLink = ({ pageUri, pageName }) => (
  <li>
    <Link
      className="font-light font-roboto text-gray-222 dark:text-gray-50"
      to={`/${pageUri}`}
    >
      {pageName}
    </Link>
  </li>
);

const Header = () => (
  <header className="p-4 bg-gray-100 md:p-5 xl:p-6 dark:bg-gray-444">
    <div className="flex items-center justify-between">
      <Title />
      <ul className="flex items-center gap-x-4">
        <PageLink pageUri="important" pageName="Important" />
        <PageLink pageUri="delete" pageName="Deleted" />
        <PageTheme />
      </ul>
    </div>
  </header>
);

export default Header;
