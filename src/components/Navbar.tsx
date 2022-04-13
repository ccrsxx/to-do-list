import { FiMenu } from 'react-icons/fi';
import { AiOutlineHome } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';

export function Navbar() {
  return (
    <nav className='flex w-full justify-between bg-nav-bg px-10 py-3 text-white children:flex children:gap-2'>
      <div
        className='children:rounded children:p-1 children:text-xl
                   children:transition-colors'
      >
        <button className='hover:bg-white-ish' type='button'>
          <FiMenu />
        </button>
        <button className='hover:bg-white-ish' type='button'>
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
