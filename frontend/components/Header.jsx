import Link from 'next/link';
import NavigationButton from "./NavigationButton";

const Header = () => {
  return (
    <header className="shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-20 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img src="/logo.svg" alt="Book Store" className='h-20 auto' />
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <NavigationButton to="/book">
              Add Book
            </NavigationButton>

            <NavigationButton to="/author">
              Add Author
            </NavigationButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
