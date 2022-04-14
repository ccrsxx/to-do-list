import { FiMenu, AiOutlineHome, VscAdd } from '../common';

interface NavbarProps {
  handleSidebarClick: () => void;
  handleCurrentPage: (page: string) => () => void;
}

export function Navbar({ handleSidebarClick, handleCurrentPage }: NavbarProps) {
  return (
    <nav className='flex w-full justify-between bg-nav-bg px-10 py-3 text-white children:flex children:gap-2'>
      <div
        className='children:rounded children:p-1 children:text-xl
                   children:transition-colors'
      >
        <button
          className='hover:bg-white-ish'
          type='button'
          onClick={handleSidebarClick}
        >
          <FiMenu />
        </button>
        <button
          className='hover:bg-white-ish'
          type='button'
          onClick={handleCurrentPage('today')}
        >
          <AiOutlineHome />
        </button>
      </div>
      <div
        className='children:rounded children:p-1 children:text-xl
                   children:transition-colors'
      >
        <button className='hover:bg-white-ish' type='button'>
          <VscAdd />
        </button>
      </div>
    </nav>
  );
}
